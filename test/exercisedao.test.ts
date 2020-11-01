import {
  AlexaTest,
  IntentRequestBuilder,
  LaunchRequestBuilder,
  SkillSettings,
} from "ask-sdk-test";
import skill from "../src/index";
import { expect } from "chai";
import "mocha";
import { ExerciseDao } from "../src/dao/ExerciseDao";

describe("ExerciseDao", () => {
  let dao: ExerciseDao;

  beforeEach(() => {
    dao = new ExerciseDao();
  });

  it("should filter muscle", async () => {
    let e = await dao.getRandomExerciseAboveRating({
      muscle: "neck",
    });

    expect(e).to.be.undefined;
  });

  it("should filter legs", async () => {
    let e = await dao.getRandomExerciseAboveRating({
      muscle: "legs",
    });

    expect(e).to.not.be.undefined;
    expect(e.targetMuscle).equals("Quadriceps");
  });

  it("should filter muscle+rating", async () => {
    let e = await dao.getRandomExerciseAboveRating({
      muscle: "legs",
      rating: "top",
    });

    expect(e).to.not.be.undefined;
    expect(e.targetMuscle).equals("Quadriceps");
    expect(e.rating).greaterThan((8 / 10) * 5);
  });

  it("should filter equipment", async () => {
    let e = await dao.getRandomExerciseAboveRating({
      equipment: "barbell",
    });

    expect(e).to.not.be.undefined;
    expect(e.equipment).equals("Barbell");
  });

  it("should filter level", async () => {
    let e = await dao.getRandomExerciseAboveRating({
      level: "beginner",
    });

    expect(e).to.not.be.undefined;
    expect(e.level).equals("Beginner");
  });

  it("should filter exerciseType", async () => {
    let e = await dao.getRandomExerciseAboveRating({
      exerciseType: "strength",
    });

    expect(e).to.not.be.undefined;
    expect(e.type).equals("Strength");
  });
});
