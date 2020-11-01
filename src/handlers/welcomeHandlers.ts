import {
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  ax,
} from "@chitchatjs/alexa";
import { WhenBlock } from "@chitchatjs/core";
import { bbs } from "../bbs";

import { COMMON_HANDLERS, REPEAT_FALLBACK } from "../const";
import renderWelcome from "../views/renderWelcome";
import { exerciseLookupIntentHandler, feelingLuckyIntentHandler } from "./commonHandlers";

/**
 * Welcome building block
 */
export const launchHandler: WhenBlock<
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent
> = ax.whenLaunch().then(ax.compound().add(renderWelcome).build()).build();

/**
 * All the building blocks for welcome state
 */
export default ax
  .compound()
  .add(launchHandler)
  .add(exerciseLookupIntentHandler)
  .add(feelingLuckyIntentHandler)
  .add(COMMON_HANDLERS)
  .add(bbs.enableRepeat(REPEAT_FALLBACK))
  .build();
