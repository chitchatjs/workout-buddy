import { ax } from "@chitchatjs/alexa";

import { exercises } from "../../dao/exercises";

/**
 * Slot types
 */
const exerciseNames: string[] = exercises
  .filter((e) => e.description && e.description.length > 0 && !e.name.startsWith("UP "))
  .map((e) => e.name);
const exerciseName = ax.slotType("ExerciseName").values(exerciseNames).build();

const muscle = ax
  .slotType("Muscle")
  .values([
    "Abdominals",
    "Forearms",
    "Lats",
    "Lower Back",
    "Glutes",
    "Shoulders",
    "Hamstrings",
    "Quadriceps",
    "Biceps",
    "Triceps",
    "Neck",
    "Chest",
    "Traps",
    "Calves",
    "Middle Back",
    "Abductors",
    "Adductors",
  ])
  .build();

const rating = ax
  .slotType("Rating")
  .values(["high", "top", "highly", "good", "best"])
  .build();

const equipment = ax
  .slotType("Equipment")
  .values([
    "Other",
    "Machine",
    "Medicine Ball",
    "Dumbbell",
    "Dumbbells",
    "Barbell",
    "Landmine",
    "Body Only",
    "Kettlebells",
    "Cable",
    "Cables",
    "E-Z Curl Bar",
    "Bands",
    "Foam Roll",
    "Exercise Ball",
    "Bosu Ball",
    "Bench",
    "Mat",
    "None",
  ])
  .build();

const level = ax.slotType("Level").values(["Beginner", "Intermediate", "Expert"]).build();
const exerciseType = ax
  .slotType("ExerciseType")
  .values([
    "Strength",
    "Strongman",
    "Powerlifting",
    "Olympic Weightlifting",
    "Cardio",
    "Stretching",
    "Plyometrics",
  ])
  .build();

export const slotTypes = ax
  .compound()
  .add(exerciseName)
  .add(muscle)
  .add(rating)
  .add(equipment)
  .add(level)
  .add(exerciseType)
  .build();
