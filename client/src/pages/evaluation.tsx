import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { QuestionCard } from "@/components/evaluation/question-card";
import { userTypes } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const questions = {
  student: [
    "How often do you feel overwhelmed by academic work?",
    "Do you have trouble balancing study and personal life?",
    "How often do you experience test anxiety?",
    "Do you feel pressure from academic expectations?",
    "How well do you manage your study schedule?",
  ],
  parent: [
    "How often do you feel stressed about parenting responsibilities?",
    "Do you have enough support in raising your children?",
    "How well do you balance work and family life?",
    "Do you worry about your children's future?",
    "How often do you get time for self-care?",
  ],
  employee: [
    "How stressed do you feel about work deadlines?",
    "Do you maintain a healthy work-life balance?",
    "How often do you feel burnout from work?",
    "Do you feel valued in your workplace?",
    "How well do you handle workplace pressure?",
  ],
  teenager: [
    "How often do you feel peer pressure?",
    "Do you feel comfortable talking about your feelings?",
    "How well do you handle social media stress?",
    "Do you feel understood by others?",
    "How do you cope with academic and social pressures?",
  ],
  psychiatrist: [
    "How well do you manage professional boundaries?",
    "Do you experience vicarious trauma?",
    "How effectively do you practice self-care?",
    "Do you feel emotionally drained after sessions?",
    "How well do you handle difficult cases?",
  ],
};

export default function Evaluation() {
  const [userType, setUserType] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions[userType as keyof typeof questions].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitEvaluation(newAnswers);
    }
  };

  const submitEvaluation = async (finalAnswers: number[]) => {
    try {
      const averageScore = Math.round(
        finalAnswers.reduce((a, b) => a + b, 0) / finalAnswers.length
      );

      await apiRequest("POST", "/api/evaluation", {
        userId: 1, // For demo
        responses: finalAnswers,
        score: averageScore,
      });

      setCompleted(true);
      toast({
        title: "Evaluation Complete",
        description: "Your stress assessment has been recorded.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit evaluation",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Stress Evaluation</CardTitle>
            <CardDescription>
              Let's understand your stress levels better
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!userType ? (
              <div className="space-y-4">
                <p>Please select your user type:</p>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : completed ? (
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Thank you for completing the evaluation!</h3>
                <p>Based on your responses, we'll provide personalized recommendations.</p>
                <Link href="/relaxation">
                  <Button>View Relaxation Techniques</Button>
                </Link>
              </div>
            ) : (
              <QuestionCard
                question={questions[userType as keyof typeof questions][currentQuestion]}
                onAnswer={handleAnswer}
                progress={(currentQuestion + 1) / questions[userType as keyof typeof questions].length * 100}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
