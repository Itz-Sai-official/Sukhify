import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, MessageSquare, Timer, Leaf, Waves, Music } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          <path
            d="M 0 200 C 200 100, 800 100, 1000 200 C 1200 300, -200 400, 0 500 C 200 600, 800 600, 1000 500 C 1200 400, -200 300, 0 200"
            fill="url(#wave)"
          >
            <animate
              attributeName="d"
              dur="20s"
              repeatCount="indefinite"
              values="
                M 0 200 C 200 100, 800 100, 1000 200 C 1200 300, -200 400, 0 500 C 200 600, 800 600, 1000 500 C 1200 400, -200 300, 0 200;
                M 0 200 C 200 300, 800 300, 1000 200 C 1200 100, -200 400, 0 500 C 200 400, 800 400, 1000 500 C 1200 600, -200 300, 0 200;
                M 0 200 C 200 100, 800 100, 1000 200 C 1200 300, -200 400, 0 500 C 200 600, 800 600, 1000 500 C 1200 400, -200 300, 0 200
              "
            />
          </path>
        </svg>
      </div>

      <header className="container mx-auto px-4 py-16 text-center relative">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome to Sukhify, {user?.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your AI-powered mental wellness companion. Take a moment to breathe, reflect, and find your inner peace. We're here to support your journey towards better mental health.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link href="/evaluation">
            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Stress Evaluation</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Take our comprehensive assessment to understand your stress levels
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Chat Support</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Talk to our AI assistant about your mental health concerns
              </CardContent>
            </Card>
          </Link>

          <Link href="/relaxation">
            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Relaxation Guide</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Access guided meditation and relaxation techniques
              </CardContent>
            </Card>
          </Link>

          <Link href="/break-timer">
            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Timer className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Break Timer</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Set reminders to take regular breaks during work
              </CardContent>
            </Card>
          </Link>
          <Link href="/recommendations">
            <Card className="cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mood Media</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Get personalized movie and music recommendations based on your mood
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}