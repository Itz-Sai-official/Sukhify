import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, Pause, Volume2 } from "lucide-react";
import { EmergencyContacts } from "@/components/emergency-contacts";

const techniques = [
  {
    id: "breathing",
    title: "Deep Breathing",
    description: "A simple but effective technique to reduce stress instantly",
    steps: [
      "Find a comfortable position",
      "Breathe in slowly through your nose for 4 counts",
      "Hold your breath for 4 counts",
      "Exhale slowly through your mouth for 4 counts",
      "Repeat for 5-10 cycles"
    ]
  },
  {
    id: "meditation",
    title: "Guided Meditation",
    description: "Follow along with this simple meditation exercise",
    audioScript: [
      "Find a quiet, comfortable place to sit or lie down",
      "Close your eyes and take a deep breath",
      "Feel the weight of your body sinking into the surface beneath you",
      "Notice any tension in your body and let it melt away",
      "Focus on your breath, feeling it flow in and out",
      "If your mind wanders, gently bring it back to your breath",
      "Continue breathing slowly and mindfully"
    ]
  },
  {
    id: "progressive",
    title: "Progressive Relaxation",
    description: "Systematically relax your entire body",
    steps: [
      "Start with your toes, tense them for 5 seconds",
      "Release and feel the tension flow away",
      "Move up to your feet, then calves",
      "Continue up through your entire body",
      "End with your facial muscles"
    ]
  },
  {
    id: "mindfulness",
    title: "Mindfulness Practice",
    description: "Stay present and grounded with these mindfulness exercises",
    exercises: [
      {
        name: "5-4-3-2-1 Grounding",
        steps: [
          "Name 5 things you can see",
          "Name 4 things you can touch",
          "Name 3 things you can hear",
          "Name 2 things you can smell",
          "Name 1 thing you can taste"
        ]
      },
      {
        name: "Body Scan",
        steps: [
          "Start at your toes",
          "Slowly move your attention up through your body",
          "Notice any sensations without judgment",
          "Release any tension you find",
          "End at the top of your head"
        ]
      }
    ]
  }
];

export default function Relaxation() {
  const [activeTab, setActiveTab] = useState("breathing");
  const [isPlaying, setIsPlaying] = useState(false);

  const renderMeditationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <Volume2 className="h-6 w-6 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {techniques.find(t => t.id === "meditation")?.audioScript.map((line, index) => (
          <p key={index} className="text-muted-foreground">
            {line}
          </p>
        ))}
      </div>
    </div>
  );

  const renderMindfulnessContent = () => {
    const mindfulness = techniques.find(t => t.id === "mindfulness");
    return (
      <div className="space-y-8">
        {mindfulness?.exercises.map((exercise, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-semibold">{exercise.name}</h3>
            <ol className="space-y-2">
              {exercise.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="flex gap-2">
                  <span className="font-bold">{stepIndex + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Relaxation Techniques</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-4">
                {techniques.map((tech) => (
                  <TabsTrigger key={tech.id} value={tech.id}>
                    {tech.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {techniques.map((tech) => (
                <TabsContent key={tech.id} value={tech.id}>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{tech.description}</p>
                    {tech.id === "meditation" ? (
                      renderMeditationContent()
                    ) : tech.id === "mindfulness" ? (
                      renderMindfulnessContent()
                    ) : (
                      <ol className="space-y-2">
                        {tech.steps?.map((step, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="font-bold">{index + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6">
          <EmergencyContacts />
        </div>
      </div>
    </div>
  );
}