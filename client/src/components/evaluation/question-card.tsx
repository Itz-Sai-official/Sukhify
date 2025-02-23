import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuestionCardProps {
  question: string;
  onAnswer: (score: number) => void;
  progress: number;
}

export function QuestionCard({ question, onAnswer, progress }: QuestionCardProps) {
  const options = [
    { label: "Not at all", score: 1 },
    { label: "Sometimes", score: 2 },
    { label: "Often", score: 3 },
    { label: "Very often", score: 4 },
    { label: "Always", score: 5 },
  ];

  return (
    <div className="space-y-6">
      <Progress value={progress} className="w-full" />
      
      <div className="py-4">
        <h3 className="text-lg font-semibold mb-6">{question}</h3>
        
        <div className="grid grid-cols-1 gap-3">
          {options.map((option) => (
            <Button
              key={option.score}
              variant="outline"
              className="w-full justify-start h-auto py-4 px-6"
              onClick={() => onAnswer(option.score)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
