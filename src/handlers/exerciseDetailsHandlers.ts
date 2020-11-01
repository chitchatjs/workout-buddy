import { ax, INITIAL_STATE_NAME } from "@chitchatjs/alexa";

import { bbs } from "../bbs";
import { COMMON_HANDLERS, EXERCISE_BENEFITS_STATE, REPEAT_FALLBACK } from "../const";
import renderExerciseDescription from "../views/renderExerciseDescription";
import renderNo from "../views/renderNo";
import { exerciseLookupIntentHandler, feelingLuckyIntentHandler } from "./commonHandlers";

/**
 * Handles "yes" specific to the exercise-details state
 */
const yesHandler = ax
  .whenIntentName("AMAZON.YesIntent")
  .then(
    ax
      .compound()
      .add(renderExerciseDescription)
      .add(ax.goto(EXERCISE_BENEFITS_STATE))
      .build()
  )
  .build();

/**
 * Handles "no" specific to the exercise-details state
 */
const noHandler = ax
  .whenIntentName("AMAZON.NoIntent")
  .then(ax.compound().add(renderNo).add(ax.goto(INITIAL_STATE_NAME)).build())
  .build();

/**
 * All the building blocks for exercise-details state
 */
export default ax
  .compound()
  .add(yesHandler)
  .add(noHandler)
  .add(feelingLuckyIntentHandler)
  .add(exerciseLookupIntentHandler)
  .add(COMMON_HANDLERS)
  .add(bbs.enableRepeat(REPEAT_FALLBACK))
  .build();
