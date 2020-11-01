/**
 * Type definitions
 */
export interface BestMatch {
  name: string;
  img: string;
  url: string;
  targetMuscle: string;
  equipment: string;
  rating: number;
  score: number;
}

export interface Exercise {
  name: string;
  img: string;
  url: string;
  targetMuscle: Muscle;
  equipment?: Equipment;
  rating: number;
  imgs: string[];
  type: ExerciseType;
  level: Level;
  description: string[];
  benefits: string[];
}

export type Muscle =
  | "Abdominals"
  | "Forearms"
  | "Lats"
  | "Lower Back"
  | "Glutes"
  | "Shoulders"
  | "Hamstrings"
  | "Quadriceps"
  | "Biceps"
  | "Triceps"
  | "Neck"
  | "Chest"
  | "Traps"
  | "Calves"
  | "Back"
  | "Abductors"
  | "Adductors";

export type Equipment =
  | "Other"
  | "Machine"
  | "Medicine Ball"
  | "Dumbbell"
  | "Dumbbells"
  | "Barbell"
  | "Landmine"
  | "Body Only"
  | "Kettlebells"
  | "Cable"
  | "Cables"
  | "E-Z Curl Bar"
  | "Bands"
  | "Foam Roll"
  | "Exercise Ball"
  | "Bosu Ball"
  | "Bench"
  | "Mat"
  | "None";

export type Level = "Beginner" | "Intermediate" | "Expert";
export type ExerciseType =
  | "Strength"
  | "Strongman"
  | "Powerlifting"
  | "Olympic Weightlifting"
  | "Cardio"
  | "Stretching"
  | "Plyometrics";

export interface ExerciseFilter {
  muscle?: string;
  rating?: string;
  equipment?: string;
  level?: string;
  exerciseType?: string;
}
