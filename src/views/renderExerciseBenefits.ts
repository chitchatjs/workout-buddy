import { AlexaDialogContext, AlexaEvent, ax } from "@chitchatjs/alexa";
import { display } from "@chitchatjs/plugin-ax-display";

import {
  ASK_ABOUT_EXERCISE_OR_STOP_EN,
  BACKGROUND_IMAGE,
  EXERCISE_BENEFITS_EN,
  LARGE_LOGO_URL,
} from "../const";
import { Exercise } from "../types";
import { bbs } from "../bbs";

/**
 * Presentation building block that shows/speaks about an exercise benefits
 */
export default ax
  .compound()
  .add(
    bbs.repeatable(
      ax.ask(EXERCISE_BENEFITS_EN).reprompt(ASK_ABOUT_EXERCISE_OR_STOP_EN).build()
    )
  )
  .add(
    ax
      .custom()
      .executor((c: AlexaDialogContext, e: AlexaEvent) => {
        let exercise: Exercise = c.platformState.globalState["exercise"];

        return display.conditionals
          .whenScreenDisplay()
          .then(
            display.samples.imageLeftDetail({
              title: "Exercise Result",
              leftImageUrl: exercise.imgs.length > 0 ? exercise.imgs[0] : undefined,
              leftImageCaption: "Picture 2",
              primaryText: exercise.name,
              secondaryText: exercise.benefits.join("\n"),
              rating: exercise.rating,
              logoUrl: LARGE_LOGO_URL,
              backgroundImageUrl: BACKGROUND_IMAGE,
            })
          )
          .build();
      })
      .build()
  )
  .build();
