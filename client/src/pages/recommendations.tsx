import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Music, Film } from "lucide-react";

const moodRecommendations = {
  happy: {
    songs: [
      { title: "Happy", artist: "Pharrell Williams" },
      { title: "Walking on Sunshine", artist: "Katrina & The Waves" },
      { title: "Good Vibrations", artist: "The Beach Boys" },
      { title: "Three Little Birds", artist: "Bob Marley" },
      { title: "I Got You (I Feel Good)", artist: "James Brown" }
    ],
    movies: [
      { title: "The Secret Life of Walter Mitty", year: 2013 },
      { title: "Sing Street", year: 2016 },
      { title: "Big", year: 1988 },
      { title: "La La Land", year: 2016 },
      { title: "The Intouchables", year: 2011 }
    ]
  },
  calm: {
    songs: [
      { title: "Weightless", artist: "Marconi Union" },
      { title: "Claire de Lune", artist: "Claude Debussy" },
      { title: "Gymnopédie No.1", artist: "Erik Satie" },
      { title: "River Flows in You", artist: "Yiruma" },
      { title: "Experience", artist: "Ludovico Einaudi" }
    ],
    movies: [
      { title: "The Secret Garden", year: 1993 },
      { title: "My Neighbor Totoro", year: 1988 },
      { title: "The Life of Pi", year: 2012 },
      { title: "The Hundred-Foot Journey", year: 2014 },
      { title: "Chef", year: 2014 }
    ]
  },
  motivated: {
    songs: [
      { title: "Eye of the Tiger", artist: "Survivor" },
      { title: "Hall of Fame", artist: "The Script ft. will.i.am" },
      { title: "Stronger", artist: "Kelly Clarkson" },
      { title: "Fight Song", artist: "Rachel Platten" },
      { title: "The Greatest", artist: "Sia ft. Kendrick Lamar" }
    ],
    movies: [
      { title: "Rocky", year: 1976 },
      { title: "The Pursuit of Happyness", year: 2006 },
      { title: "The Theory of Everything", year: 2014 },
      { title: "Hidden Figures", year: 2016 },
      { title: "Soul", year: 2020 }
    ]
  },
  reflective: {
    songs: [
      { title: "The Sound of Silence", artist: "Simon & Garfunkel" },
      { title: "Mad World", artist: "Gary Jules" },
      { title: "Hallelujah", artist: "Jeff Buckley" },
      { title: "Yesterday", artist: "The Beatles" },
      { title: "Bridge Over Troubled Water", artist: "Simon & Garfunkel" }
    ],
    movies: [
      { title: "Dead Poets Society", year: 1989 },
      { title: "The Shawshank Redemption", year: 1994 },
      { title: "Good Will Hunting", year: 1997 },
      { title: "A Beautiful Mind", year: 2001 },
      { title: "Into the Wild", year: 2007 }
    ]
  }
};

type Mood = keyof typeof moodRecommendations;

export default function Recommendations() {
  const [selectedMood, setSelectedMood] = useState<Mood | ''>('');

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
            <CardTitle>Mood-Based Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">How are you feeling?</label>
                <Select value={selectedMood} onValueChange={(value) => setSelectedMood(value as Mood)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="happy">Happy</SelectItem>
                    <SelectItem value="calm">Calm</SelectItem>
                    <SelectItem value="motivated">Motivated</SelectItem>
                    <SelectItem value="reflective">Reflective</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedMood && (
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Music className="h-5 w-5" />
                        Recommended Songs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {moodRecommendations[selectedMood].songs.map((song, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">{song.title}</span>
                            <span className="text-muted-foreground"> by {song.artist}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Film className="h-5 w-5" />
                        Recommended Movies
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {moodRecommendations[selectedMood].movies.map((movie, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">{movie.title}</span>
                            <span className="text-muted-foreground"> ({movie.year})</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
