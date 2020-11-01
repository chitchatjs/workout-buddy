import * as _ from "lodash";

import { Exercise, ExerciseFilter } from "../types";
import { exercises } from "./exercises";
import ss from "string-similarity";

const STRING_SIMILARITY_THRESHOLD = 0.8;
const HIGH_RATING_THRESHOLD = 8; // based on 10 rating scale

export class ExerciseDao {
  constructor() {}

  async getRandomExerciseAboveRating(filter?: ExerciseFilter, minimumRating?: number) {
    console.log("Finding a random exercise of rating above or equal to:", minimumRating);
    console.log("Additional filter:", JSON.stringify(filter, null, 2));

    console.log("Exercises count before filtering:", exercises.length);
    let filteredExercises = exercises.filter((d) => {
      let include = d.description.length > 0 && d.benefits.length > 0;

      if (filter) {
        if (filter.muscle) {
          filter.muscle =
            filter.muscle.toLowerCase() === "legs" ||
            filter.muscle.toLowerCase() === "leg"
              ? "quadriceps"
              : filter.muscle.toLowerCase();

          include =
            include &&
            ss.compareTwoStrings(
              filter.muscle.toLowerCase(),
              d.targetMuscle.toLowerCase()
            ) > STRING_SIMILARITY_THRESHOLD;
        }
        if (filter.rating) {
          include = include && d.rating > HIGH_RATING_THRESHOLD;
        }
        if (filter.equipment) {
          include =
            include &&
            ss.compareTwoStrings(
              filter.equipment.toLowerCase(),
              d.equipment ? d.equipment.toLowerCase() : ""
            ) > STRING_SIMILARITY_THRESHOLD;
        }
        if (filter.level) {
          include =
            include &&
            ss.compareTwoStrings(filter.level.toLowerCase(), d.level.toLowerCase()) >
              STRING_SIMILARITY_THRESHOLD;
        }
        if (filter.exerciseType) {
          include =
            include &&
            ss.compareTwoStrings(
              filter.exerciseType.toLowerCase(),
              d.type.toLowerCase()
            ) > STRING_SIMILARITY_THRESHOLD;
        }
        if (minimumRating) {
          include = include && (minimumRating ? d.rating > minimumRating : true);
        }
        return include;
      } else {
        include = include && (minimumRating ? d.rating > minimumRating : true);
      }
    });

    filteredExercises = _.cloneDeep(filteredExercises);
    filteredExercises = filteredExercises.map((e) => {
      e.rating = parseFloat(((e.rating / 10) * 5.0).toFixed(2));
      return e;
    });

    console.log("Exercises count after filtering:", filteredExercises.length);

    var randomIndex = Math.floor(Math.random() * (filteredExercises.length - 1));
    return filteredExercises[randomIndex];
  }

  async getExerciseByName(name: string) {
    console.log("Finding a exercise by name:", name);

    let filteredExercises: Exercise[];
    let perfectMatch = exercises.filter((e) => e.name.toLowerCase() === name);
    if (perfectMatch && perfectMatch.length > 0) {
      filteredExercises = perfectMatch;
    } else {
      filteredExercises = exercises
        .filter((e) => e.name.toLowerCase().includes(name))
        .sort((a, b) => b.rating - a.rating);
    }
    filteredExercises = filteredExercises.filter(
      (d) => d.description.length > 0 && d.benefits.length > 0
    );

    filteredExercises = _.cloneDeep(filteredExercises);
    filteredExercises = filteredExercises.map((e) => {
      e.rating = (e.rating / 10) * 5.0;
      return e;
    });

    console.log(
      "Top exercises matching the query: " + JSON.stringify(filteredExercises, null, 2)
    );

    if (filteredExercises.length === 0) {
      return undefined;
    }
    // pick the top rated exercise
    return filteredExercises[0];
  }
}
