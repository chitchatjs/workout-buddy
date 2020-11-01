import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  ax,
  Locale,
} from "@chitchatjs/alexa";
import { CompoundBlock } from "@chitchatjs/core";
import { common } from "@chitchatjs/plugin-ax-common";

import { bbs } from "./bbs";

/**
 * List of constants
 */
export const HELP_TEXT_EN = bbs.speech(
  "You can ask me about specific exercises.. by level such as beginner, advanced.. by muscles.. by type such as strength, cardio.. or even by equipment." +
    " Now, tell me what do you want to know about? "
);

export const FALLBACK_TEXT_EN = bbs.speech("I didn't understand, please try again.");

export const WELCOME_EN = bbs.speech(
  "Welcome! I'll be your workout buddy. Ask me about exercises. Or just say I'm feeling lucky or say help."
);

export const WELCOME_REPROMPT_EN = bbs.speech("What would you like to do?");

export const EXERCISE_INTRO_EN = bbs.speech(
  "I found {exercise.name}. It is rated {exercise.rating} on bodybuilding.com. Wanna know more?"
);

export const EXERCISE_BENEFITS_EN = bbs.speech(
  "Some benefits are.. {#exercise.benefits} {.}. {/exercise.benefits}" +
    " You can ask me about any other exercise or just say stop."
);

export const YES_NO_OR_OTHER_EXERCISE_EN = bbs.speech(
  "You can say yes or no or can ask me about any other exercise or say help."
);

export const ASK_ABOUT_EXERCISE_OR_STOP_EN = bbs.speech(
  "You can ask me about an exercise or say stop."
);

export const EXERCISE_NOT_FOUND_EN = bbs.speech(
  "I could not find that exercise, try some other exercise or say help."
);

export const EXERCISE_FOUND_EN = bbs.speech(
  "I found {#resolvedExerciseNames} {.}, {/resolvedExerciseNames} and more. Which one do you want to know about?"
);
export const EXERCISE_FOUND_REPROMPT_EN = bbs.speech(
  "You can say an exercise name or try another exercise."
);
export const COMMON_HANDLERS: CompoundBlock<
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent
> = common.defaultHandlers({
  help: bbs.repeatable(
    ax.ask(HELP_TEXT_EN).reprompt(ASK_ABOUT_EXERCISE_OR_STOP_EN).build()
  ),
  fallback: ax
    .ask(bbs.speech("Sorry I didn't understand, please try again."))
    .reprompt(bbs.speech("Please try again."))
    .build(),
  stop: ax.say(bbs.speech("Good bye!")),
});

export const REPEAT_FALLBACK = ax
  .ask(
    bbs.speech("Sorry I don't know how to repeat last phrase. Please try something else.")
  )
  .reprompt(ASK_ABOUT_EXERCISE_OR_STOP_EN)
  .build();

export const EXERCISE_DETAILS_STATE = "excercise-details-state";
export const EXERCISE_BENEFITS_STATE = "excercise-benefits-state";

export const SUPPORTED_LOCALES = [
  Locale.en_US,
  Locale.en_AU,
  Locale.en_CA,
  Locale.en_GB,
  Locale.en_IN,
];

export const SMALL_LOGO_URL =
  "https://workoutbuddy-logo.s3.amazonaws.com/dumbbell-108.png";
export const LARGE_LOGO_URL =
  "https://workoutbuddy-logo.s3.amazonaws.com/dumbbell-512.png";

export const BACKGROUND_IMAGE =
  "https://workoutbuddy-logo.s3.amazonaws.com/background.jpg";
