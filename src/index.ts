import { alexa as ax } from "@chitchatjs/alexa";

import exerciseBenefitsHandlers from "./handlers/exerciseBenefitsHandlers";
import exerciseDetailsHandlers from "./handlers/exerciseDetailsHandlers";
import welcomeHandlers from "./handlers/welcomeHandlers";
import { EXERCISE_BENEFITS_STATE, EXERCISE_DETAILS_STATE } from "./const";
import artifacts from "./handlers/artifacts";

/**
 * State that handles the welcome
 */
let welcomeState = ax.start().block(welcomeHandlers).build();

/**
 * State that handles all events during exercise details rendering.
 */
const exerciseDetailsState = ax
  .state(EXERCISE_DETAILS_STATE)
  .block(exerciseDetailsHandlers)
  .build();

/**
 * State that handles all events during exercise benefits rendering.
 */
const exerciseBenefitsState = ax
  .state(EXERCISE_BENEFITS_STATE)
  .block(exerciseBenefitsHandlers)
  .build();

/**
 * State that defines all the artifacts
 */
const artifactsState = ax.state("ARTIFACTS").block(artifacts).build();

/**
 * Skill object that wires everything together
 */
let skill = ax
  .skill()
  .addState(artifactsState)
  .addState(welcomeState)
  .addState(exerciseDetailsState)
  .addState(exerciseBenefitsState)
  .build();

export = ax.dialogManager(skill).exports();
