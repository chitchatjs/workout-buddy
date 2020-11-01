import { ax } from "@chitchatjs/alexa";
import { bbs } from "../bbs";
import { YES_NO_OR_OTHER_EXERCISE_EN } from "../const";

/**
 * Presentation building block that shows/speaks about an exercise description
 */
export default bbs.repeatable(
  ax
    .ask(
      bbs.speech("{exercise.description}. Do you want to know benefits of this exercise?")
    )
    .reprompt(YES_NO_OR_OTHER_EXERCISE_EN)
    .build()
);
