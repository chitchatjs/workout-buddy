import { ax, INITIAL_STATE_NAME } from "@chitchatjs/alexa";

import { bbs } from "../bbs";
import {
  ASK_ABOUT_EXERCISE_OR_STOP_EN,
  COMMON_HANDLERS,
  REPEAT_FALLBACK,
} from "../const";
import renderExerciseBenefits from "../views/renderExerciseBenefits";
import { exerciseLookupIntentHandler, feelingLuckyIntentHandler } from "./commonHandlers";

/**
 * Handles "yes" specific to the exercise-benefits state
 */
const yesHandler = ax
  .whenIntentName("AMAZON.YesIntent")
  .then(
    ax.compound().add(renderExerciseBenefits).add(ax.goto(INITIAL_STATE_NAME)).build()
  )
  .build();

/**
 * Handles "no" specific to the exercise-benefits state
 */
const noHandler = ax
  .whenIntentName("AMAZON.NoIntent")
  .then(ax.ask(ASK_ABOUT_EXERCISE_OR_STOP_EN).build())
  .build();

/**
 * All the building blocks for exercise-benefits state
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
