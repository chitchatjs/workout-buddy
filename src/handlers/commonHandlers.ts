import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  ax,
} from "@chitchatjs/alexa";
import { WhenBlock } from "@chitchatjs/core";

import { bbs } from "../bbs";
import {
  ASK_ABOUT_EXERCISE_OR_STOP_EN,
  EXERCISE_DETAILS_STATE,
  EXERCISE_NOT_FOUND_EN,
} from "../const";
import renderExercise from "../views/renderExercise";

/**
 * COMMON HANDLERS.
 */

/**
 * Exercise Lookup logic
 * It renders the experience after user requests an exercise by name.
 */
export const exerciseLookupIntentHandler: WhenBlock<
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent
> = ax
  .whenIntentName("ExerciseLookupIntent")
  .then(
    bbs.slots.value("exerciseName", (exerciseName: string | undefined) => {
      if (!exerciseName) {
        return ax
          .ask(EXERCISE_NOT_FOUND_EN)
          .reprompt(ASK_ABOUT_EXERCISE_OR_STOP_EN)
          .build();
      }
      return ax
        .compound()
        .add(renderExercise(exerciseName))
        .add(ax.goto(EXERCISE_DETAILS_STATE))
        .build();
    })
  )
  .build();

/**
 * This building blocks renders experience where user requested
 * a random exercise or by a filter such as muscle, equipment etc.
 */
export const feelingLuckyIntentHandler: WhenBlock<
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent
> = ax
  .whenIntentName("FeelingLuckyIntent")
  .then(
    bbs.slots.values(
      ["muscle", "rating", "equipment", "level", "exerciseType"],
      (values: { [name: string]: string }) => {
        return ax
          .compound()
          .add(renderExercise(undefined, values))
          .add(ax.goto(EXERCISE_DETAILS_STATE))
          .build();
      }
    )
  )
  .build();
