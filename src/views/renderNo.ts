import { ax } from "@chitchatjs/alexa";
import { bbs } from "../bbs";
import { ASK_ABOUT_EXERCISE_OR_STOP_EN } from "../const";

/**
 * Presentation building block that renders a "no" response
 */
export default bbs.repeatable(
  ax
    .ask(bbs.speech("Okay! You can ask me about any other exercise or say stop."))
    .reprompt(ASK_ABOUT_EXERCISE_OR_STOP_EN)
    .build()
);
