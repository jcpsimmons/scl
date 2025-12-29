"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Progress,
  Separator,
  Skeleton,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@drjoshcsimmons/scl";
import {
  Check,
  Code,
  Copy,
  ExternalLink,
  Github,
  Package,
  Terminal,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [progress, setProgress] = useState(45);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("");

  const installCmd = "npm install @drjoshcsimmons/scl";
  const fullText = "> SIMSIES COMPONENT LIBRARY";

  const codeSnippets = {
    install: "npm install @drjoshcsimmons/scl",
    css: `// In your global CSS file
@import '@drjoshcsimmons/scl/globals.css';`,
    usage: `import { Button, Card } from '@drjoshcsimmons/scl'

export default function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}`,
  };

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-primary">{typedText}</span>
            <span className="animate-blink">_</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The most based UI library on the web. Fuck multimedia, fuck
            gradients, fuck "user experience", fuck "design", and above all fuck
            subtlety.
          </p>

          {/* Install Command */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <code className="bg-card border-2 border-primary px-4 py-2 text-sm font-mono">
              {installCmd}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(installCmd, "hero")}
            >
              {copiedId === "hero" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 w-full">
            <Button asChild className="w-full sm:w-auto">
              <a
                href="https://simsies-component-library.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Docs
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a
                href="https://github.com/jcpsimmons/scl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a
                href="https://www.npmjs.com/package/@drjoshcsimmons/scl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Package className="w-4 h-4 mr-2" />
                npm
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Color Palette */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-2xl font-bold text-center mb-8">
          <span className="text-primary">&gt;</span> PALETTE
        </h2>
        <div className="flex flex-wrap justify-center">
          {[
            { name: 'GREEN', color: 'hsl(120 100% 50%)', textDark: true },
            { name: 'HOTPINK', color: 'hsl(300 100% 50%)', textDark: true },
            { name: 'YELLOW', color: 'hsl(60 100% 50%)', textDark: true },
            { name: 'CYAN', color: 'hsl(180 100% 50%)', textDark: true },
            { name: 'BLUE', color: 'hsl(240 100% 50%)', textDark: false },
            { name: 'AMBER', color: 'hsl(45 100% 50%)', textDark: true },
            { name: 'RED', color: 'hsl(0 100% 50%)', textDark: true },
            { name: 'WHITE', color: 'hsl(0 0% 100%)', textDark: true },
          ].map((c) => (
            <div key={c.name} className="group relative">
              <div
                className="w-10 h-6 sm:w-16 sm:h-8 transition-transform hover:scale-110 hover:z-10"
                style={{ backgroundColor: c.color }}
              />
              <span
                className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}
              >
                {c.name}
              </span>
            </div>
          ))}
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
                Buttons, Cards, Dialogs, Forms, Tables, and more. Everything you
                need for a complete terminal UI.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Radix Primitives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built on accessible Radix UI primitives. Full keyboard
                navigation and screen reader support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tailwind CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Styled with Tailwind CSS and CSS variables. Easy to customize
                and theme to your needs.
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
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                  />
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
              <div className="relative">
                <code className="block bg-background p-4 pr-12 border border-primary text-sm overflow-x-auto">
                  {codeSnippets.install}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() =>
                    copyToClipboard(codeSnippets.install, "install")
                  }
                >
                  {copiedId === "install" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Import CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <code className="block bg-background p-4 pr-12 border border-primary text-sm whitespace-pre overflow-x-auto">
                  {codeSnippets.css}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(codeSnippets.css, "css")}
                >
                  {copiedId === "css" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Use Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <code className="block bg-background p-4 pr-12 border border-primary text-sm whitespace-pre overflow-x-auto">
                  {codeSnippets.usage}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(codeSnippets.usage, "usage")}
                >
                  {copiedId === "usage" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
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
              <a
                href="https://github.com/jcpsimmons/scl"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@drjoshcsimmons/scl"
                className="hover:text-primary transition-colors"
              >
                npm
              </a>
              <a
                href="https://simsies-component-library.vercel.app"
                className="hover:text-primary transition-colors"
              >
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
  );
}
