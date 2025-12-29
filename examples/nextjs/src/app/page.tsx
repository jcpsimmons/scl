'use client'

import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Label,
  Checkbox,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Progress,
  Skeleton,
  Separator,
} from '@drjoshcsimmons/scl'
import { Terminal, Zap, Code, Package, Github, ExternalLink, Copy, Check } from 'lucide-react'

export default function Home() {
  const [checked, setChecked] = useState(false)
  const [switchOn, setSwitchOn] = useState(false)
  const [progress, setProgress] = useState(45)
  const [copied, setCopied] = useState(false)
  const [typedText, setTypedText] = useState('')

  const installCmd = 'npm install @drjoshcsimmons/scl'
  const fullText = '> SIMSIES COMPONENT LIBRARY'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-primary">{typedText}</span>
            <span className="animate-blink">_</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A retro terminal-themed React component library built on shadcn/ui,
            Radix primitives, and Tailwind CSS. No rounded corners. No shadows.
            Pure terminal aesthetics.
          </p>

          {/* Install Command */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <code className="bg-card border-2 border-primary px-4 py-2 text-sm font-mono">
              {installCmd}
            </code>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button asChild>
              <a href="https://simsies-component-library.vercel.app" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Storybook Docs
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/jcpsimmons/scl" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://www.npmjs.com/package/@drjoshcsimmons/scl" target="_blank" rel="noopener noreferrer">
                <Package className="w-4 h-4 mr-2" />
                npm
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Features */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-2xl font-bold text-center mb-8">
          <span className="text-primary">&gt;</span> FEATURES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>49+ Components</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Buttons, Cards, Dialogs, Forms, Tables, and more. Everything you need for a complete terminal UI.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Radix Primitives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built on accessible Radix UI primitives. Full keyboard navigation and screen reader support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tailwind CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Styled with Tailwind CSS and CSS variables. Easy to customize and theme to your needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Interactive Demo */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-2xl font-bold text-center mb-8">
          <span className="text-primary">&gt;</span> INTERACTIVE DEMO
        </h2>

        <Tabs defaultValue="components">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="components" className="flex-1">
              <Zap className="w-4 h-4 mr-2" />
              Components
            </TabsTrigger>
            <TabsTrigger value="form" className="flex-1">
              <Code className="w-4 h-4 mr-2" />
              Form
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Various button styles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Status indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Error</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                  <CardDescription>Loading indicator</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={progress} />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                    >
                      -10
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                    >
                      +10
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skeleton</CardTitle>
                  <CardDescription>Loading placeholder</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="form" className="mt-6">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Login Terminal</CardTitle>
                <CardDescription>Enter your credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={checked}
                    onCheckedChange={(c) => setChecked(c === true)}
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    checked={switchOn}
                    onCheckedChange={setSwitchOn}
                  />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Sign In</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Quick Start */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-2xl font-bold text-center mb-8">
          <span className="text-primary">&gt;</span> QUICK START
        </h2>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>1. Install</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="block bg-background p-4 border border-primary text-sm">
                npm install @drjoshcsimmons/scl
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Import CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="block bg-background p-4 border border-primary text-sm whitespace-pre">
{`// In your global CSS file
@import '@drjoshcsimmons/scl/globals.css';`}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Use Components</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="block bg-background p-4 border border-primary text-sm whitespace-pre">
{`import { Button, Card } from '@drjoshcsimmons/scl'

export default function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}`}
              </code>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-primary mt-16">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm">SCL v0.1.8</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="https://github.com/jcpsimmons/scl" className="hover:text-primary transition-colors">
                GitHub
              </a>
              <a href="https://www.npmjs.com/package/@drjoshcsimmons/scl" className="hover:text-primary transition-colors">
                npm
              </a>
              <a href="https://simsies-component-library.vercel.app" className="hover:text-primary transition-colors">
                Docs
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              MIT License. Free forever.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
