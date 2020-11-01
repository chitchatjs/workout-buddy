import {
  AlexaTest,
  IntentRequestBuilder,
  LaunchRequestBuilder,
  SkillSettings,
} from "ask-sdk-test";
import skill from "../src/index";
import { expect } from "chai";
import "mocha";

let skillHandler = skill.handler;

// initialize the testing framework
// const skillSettings: SkillSettings = {
//   appId: "amzn1.ask.skill.00000000-0000-0000-0000-000000000000",
//   userId: "amzn1.ask.account.VOID",
//   deviceId: "amzn1.ask.device.VOID",
//   locale: "en-US",
// };

// const alexaTest = new AlexaTest(skillHandler, skillSettings);

// describe("LaunchRequest", () => {
//   alexaTest.test([
//     {
//       request: new LaunchRequestBuilder(skillSettings).build(),
//       says:
//         "<voice name=\"Matthew\">Welcome, I'll be your workout buddy. You can ask me about an exercise or just say I'm feeling lucky?</voice>",
//       repromptsNothing: false,
//       shouldEndSession: false,
//     },
//   ]);
// });
