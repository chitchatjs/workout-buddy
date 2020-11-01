import { ax } from "@chitchatjs/alexa";
import { display } from "@chitchatjs/plugin-ax-display";

import { SUPPORTED_LOCALES } from "../../const";
import intents from "./intents";
import publishInfo from "./publishInfo";
import { slotTypes } from "./slot-types";

/**
 * Main entry point for all the artifacts defined in the skill
 */
const artifacts = ax
  .compound()
  .add(publishInfo)
  .add(intents)
  .add(slotTypes)
  .add(display.core.enableAPLInterface())
  .build();

export default ax.localize(SUPPORTED_LOCALES).block(artifacts).build();
