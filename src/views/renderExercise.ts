import { alexa as ax, AlexaDialogContext, AlexaEvent } from "@chitchatjs/alexa";
import { display } from "@chitchatjs/plugin-ax-display";

import { bbs } from "../bbs";
import {
  ASK_ABOUT_EXERCISE_OR_STOP_EN,
  BACKGROUND_IMAGE,
  EXERCISE_INTRO_EN,
  EXERCISE_NOT_FOUND_EN,
  LARGE_LOGO_URL,
  YES_NO_OR_OTHER_EXERCISE_EN,
} from "../const";
import { ExerciseDao } from "../dao/ExerciseDao";
import { Exercise, ExerciseFilter } from "../types";

/**
 * Presentation building block that shows/speaks about an exercise
 */
export default (exerciseName?: string, filter?: ExerciseFilter) => {
  return ax
    .compound()
    .add(
      ax
        .custom()
        .executor(async (c: AlexaDialogContext, e: AlexaEvent) => {
          const exerciseDao = new ExerciseDao();
          let exercise: Exercise | undefined;
          if (!exerciseName) {
            exercise = await exerciseDao.getRandomExerciseAboveRating(filter, 0.5);
          } else {
            exercise = await exerciseDao.getExerciseByName(exerciseName);
          }

          if (!exercise) {
            return bbs.repeatable(
              ax
                .ask(EXERCISE_NOT_FOUND_EN)
                .reprompt(ASK_ABOUT_EXERCISE_OR_STOP_EN)
                .build()
            );
          }

          return ax
            .compound()
            .add(ax.setStateVar("exercise", exercise))
            .add(
              bbs.repeatable(
                ax.ask(EXERCISE_INTRO_EN).reprompt(YES_NO_OR_OTHER_EXERCISE_EN).build()
              )
            )
            .add(
              display.conditionals
                .whenScreenDisplay()
                .then(
                  display.samples.imageLeftDetail({
                    title: "Exercise Result",
                    leftImageUrl: exercise.imgs.length > 1 ? exercise.imgs[1] : undefined,
                    leftImageCaption: "Picture 1",
                    primaryText: exercise.name,
                    secondaryText: exercise.description.join("\n"),
                    rating: exercise.rating,
                    logoUrl: LARGE_LOGO_URL,
                    backgroundImageUrl: BACKGROUND_IMAGE,
                  })
                )
                .build()
            )
            .build();
        })
        .build()
    )
    .build();
};
