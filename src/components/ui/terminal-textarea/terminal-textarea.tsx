import * as React from 'react'
import { cn } from '@/lib/utils'
import { EditorView, keymap, lineNumbers, Decoration, DecorationSet, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { EditorState, Extension, Range } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { markdown } from '@codemirror/lang-markdown'
import { vim } from '@replit/codemirror-vim'
import { defaultKeymap, historyKeymap } from '@codemirror/commands'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

// Vim-style empty line marker
const emptyLineMarker = Decoration.line({
  attributes: { class: 'cm-vim-empty-line' },
})

const emptyLinePlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet

    constructor(view: EditorView) {
      this.decorations = this.buildDecorations(view)
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.buildDecorations(update.view)
      }
    }

    buildDecorations(view: EditorView): DecorationSet {
      const decorations: Range<Decoration>[] = []
      const lastLine = view.state.doc.lines

      for (let i = lastLine + 1; i <= lastLine + 20; i++) {
        // Show tildes for ~20 lines after the document end
        const pos = view.state.doc.length
        decorations.push(emptyLineMarker.range(pos))
      }

      return Decoration.set(decorations, true)
    }
  },
  {
    decorations: (v) => v.decorations,
  }
)

export type SyntaxLanguage = 'javascript' | 'typescript' | 'html' | 'css' | 'json' | 'markdown' | 'none'

export interface TerminalTextareaProps {
  /** Number of visible lines (rows) */
  visibleLines?: number
  /** Show line numbers */
  showLineNumbers?: boolean
  /** Value of the textarea */
  value?: string
  /** Change handler */
  onChange?: (value: string) => void
  /** Callback when cursor position changes */
  onCursorChange?: (line: number, column: number) => void
  /** Enable Vim mode */
  vimMode?: boolean
  /** Syntax highlighting language */
  language?: SyntaxLanguage
  /** Placeholder text */
  placeholder?: string
  /** Read-only mode */
  readOnly?: boolean
  /** Additional CSS classes */
  className?: string
}

const TerminalTextarea = React.forwardRef<HTMLDivElement, TerminalTextareaProps>(
  (
    {
      className,
      visibleLines = 10,
      showLineNumbers = true,
      value = '',
      onChange,
      onCursorChange,
      vimMode = false,
      language = 'none',
      placeholder,
      readOnly = false,
    },
    ref
  ) => {
    const editorRef = React.useRef<HTMLDivElement>(null)
    const viewRef = React.useRef<EditorView | null>(null)

    // Get language extension
    const getLanguageExtension = React.useCallback((): Extension | null => {
      switch (language) {
        case 'javascript':
        case 'typescript':
          return javascript({ typescript: language === 'typescript' })
        case 'html':
          return html()
        case 'css':
          return css()
        case 'json':
          return json()
        case 'markdown':
          return markdown()
        default:
          return null
      }
    }, [language])

    // Create terminal theme
    const terminalTheme = EditorView.theme({
      '&': {
        backgroundColor: '#000000',
        color: '#00ff00',
        fontSize: '14px',
        fontFamily: 'BigBlueTerm437, monospace !important',
        height: `${visibleLines * 1.5}rem`,
      },
      '.cm-scroller': {
        fontFamily: 'BigBlueTerm437, monospace !important',
      },
      '.cm-content': {
        caretColor: '#00ff00',
        padding: '0.5rem',
        fontFamily: 'BigBlueTerm437, monospace !important',
      },
      '.cm-line': {
        fontFamily: 'BigBlueTerm437, monospace !important',
      },
      '.cm-cursor': {
        borderLeftColor: '#00ff00',
        borderLeftWidth: '2px',
      },
      '.cm-activeLine': {
        backgroundColor: 'rgba(0, 255, 0, 0.05)',
      },
      '.cm-selectionBackground': {
        backgroundColor: 'rgba(0, 255, 0, 0.2) !important',
      },
      '&.cm-focused .cm-selectionBackground': {
        backgroundColor: 'rgba(0, 255, 0, 0.3) !important',
      },
      '.cm-gutters': {
        backgroundColor: '#000000',
        color: '#ffff00',
        border: 'none',
        borderRight: '1px solid #00ff00',
        fontFamily: 'BigBlueTerm437, monospace !important',
      },
      '.cm-lineNumbers .cm-gutterElement': {
        padding: '0 0.5rem',
        minWidth: '3rem',
        textAlign: 'right',
        fontFamily: 'BigBlueTerm437, monospace !important',
      },
      '.cm-vim-empty-line::before': {
        content: '"~"',
        color: '#ff00ff',
        position: 'absolute',
        left: '0.5rem',
        fontFamily: 'BigBlueTerm437, monospace !important',
      },
      // Syntax highlighting colors (terminal palette)
      '.cm-keyword': { color: '#ff00ff', fontFamily: 'BigBlueTerm437, monospace !important' }, // magenta
      '.cm-string': { color: '#ffff00', fontFamily: 'BigBlueTerm437, monospace !important' }, // yellow
      '.cm-comment': { color: '#00ff00', opacity: '0.6', fontFamily: 'BigBlueTerm437, monospace !important' }, // dim green
      '.cm-number': { color: '#ff00ff', fontFamily: 'BigBlueTerm437, monospace !important' }, // magenta
      '.cm-variable': { color: '#00ff00', fontFamily: 'BigBlueTerm437, monospace !important' }, // green
      '.cm-operator': { color: '#ff0000', fontFamily: 'BigBlueTerm437, monospace !important' }, // red
      '.cm-propertyName': { color: '#00ffff', fontFamily: 'BigBlueTerm437, monospace !important' }, // cyan
      '.cm-typeName': { color: '#0000ff', fontFamily: 'BigBlueTerm437, monospace !important' }, // blue
      '.cm-function': { color: '#ffff00', fontFamily: 'BigBlueTerm437, monospace !important' }, // yellow
      '.cm-bracket': { color: '#00ff00', fontFamily: 'BigBlueTerm437, monospace !important' }, // green
    })

    // Terminal syntax highlighting style
    const terminalHighlightStyle = HighlightStyle.define([
      { tag: tags.keyword, color: '#ff00ff' },
      { tag: tags.string, color: '#ffff00' },
      { tag: tags.comment, color: '#00ff00', opacity: '0.6' },
      { tag: tags.number, color: '#ff00ff' },
      { tag: tags.variableName, color: '#00ff00' },
      { tag: tags.operator, color: '#ff0000' },
      { tag: tags.propertyName, color: '#00ffff' },
      { tag: tags.typeName, color: '#0000ff' },
      { tag: tags.function(tags.variableName), color: '#ffff00' },
      { tag: tags.bracket, color: '#00ff00' },
      { tag: tags.tagName, color: '#ff00ff' },
      { tag: tags.attributeName, color: '#00ffff' },
      { tag: tags.attributeValue, color: '#ffff00' },
    ])

    // Initialize CodeMirror
    React.useEffect(() => {
      if (!editorRef.current) return

      const extensions: Extension[] = [
        terminalTheme,
        syntaxHighlighting(terminalHighlightStyle),
        emptyLinePlugin,
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString()
            onChange?.(newValue)
          }

          if (update.selectionSet && onCursorChange) {
            const selection = update.state.selection.main
            const line = update.state.doc.lineAt(selection.head)
            const lineNumber = line.number
            const column = selection.head - line.from + 1
            onCursorChange(lineNumber, column)
          }
        }),
        EditorState.readOnly.of(readOnly),
      ]

      if (showLineNumbers) {
        extensions.push(lineNumbers())
      }

      if (vimMode) {
        extensions.push(vim())
      }

      const langExtension = getLanguageExtension()
      if (langExtension) {
        extensions.push(langExtension)
      }

      if (placeholder) {
        extensions.push(
          EditorView.contentAttributes.of({ 'data-placeholder': placeholder })
        )
      }

      const startState = EditorState.create({
        doc: value,
        extensions,
      })

      const view = new EditorView({
        state: startState,
        parent: editorRef.current,
      })

      viewRef.current = view

      return () => {
        view.destroy()
        viewRef.current = null
      }
    }, [
      vimMode,
      language,
      showLineNumbers,
      placeholder,
      readOnly,
      visibleLines,
      getLanguageExtension,
      terminalTheme,
      onChange,
      onCursorChange,
    ])

    // Update editor value when prop changes
    React.useEffect(() => {
      if (viewRef.current) {
        const currentValue = viewRef.current.state.doc.toString()
        if (currentValue !== value) {
          viewRef.current.dispatch({
            changes: {
              from: 0,
              to: currentValue.length,
              insert: value,
            },
          })
        }
      }
    }, [value])

    return (
      <div
        ref={ref}
        className={cn(
          'font-mono text-sm bg-black border-2 border-primary overflow-hidden',
          vimMode && 'vim-mode',
          className
        )}
      >
        <div ref={editorRef} />
        {vimMode && (
          <div className="text-xs text-secondary px-2 py-1 border-t border-primary bg-black">
            VIM MODE ENABLED
          </div>
        )}
      </div>
    )
  }
)
TerminalTextarea.displayName = 'TerminalTextarea'

export { TerminalTextarea }
