import { ax } from "@chitchatjs/alexa";
import { display } from "@chitchatjs/plugin-ax-display";

import {
  BACKGROUND_IMAGE,
  LARGE_LOGO_URL,
  WELCOME_EN,
  WELCOME_REPROMPT_EN,
} from "../const";
import { bbs } from "../bbs";

/**
 * Presentation building block that renders welcome experience
 */
export default ax
  .compound()
  .add(bbs.repeatable(ax.ask(WELCOME_EN).reprompt(WELCOME_REPROMPT_EN).build()))
  .add(
    display.conditionals
      .whenScreenDisplay()
      .then(
        display.samples.shortText({
          primaryText: "Welcome to Workout Buddy",
          secondaryText:
            "You can ask me about an exercise or just say I'm feeling lucky.",
          hintText: 'Try, "Alexa, give me a top rated chest exercise"',
          logoUrl: LARGE_LOGO_URL,
          backgroundImageUrl: BACKGROUND_IMAGE,
        })
      )
      .build()
  )
  .build();
