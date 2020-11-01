import { ax, Locale } from "@chitchatjs/alexa";

import { publish } from "../../bbs/manifest";
import { LARGE_LOGO_URL, SMALL_LOGO_URL } from "../../const";

/**
 * Publishing related information
 */
const skillInfo = ax
  .info()
  .invocationName("sample workout buddy")
  .name("Sample Workout Buddy")
  .icons(SMALL_LOGO_URL, LARGE_LOGO_URL)
  .summary(
    "I am here to help you know more about exercises and how to perform them. You can ask me about exercises by name, muscle, equipments and more!"
  )
  .description(
    "I am here to help you know more about exercises and how to perform them. You can ask me about exercises by name, muscle, equipments and more!"
  )
  .examplePhrases([
    "Alexa open my workout buddy",
    "Alexa ask my workout buddy for beginner exercises",
    "Alexa ask my workout buddy for a top rated chest exercise",
  ])
  .keywords([
    "health",
    "fitness",
    "exercise",
    "guide",
    "database",
    "workout",
    "planner",
    "trainer",
  ])
  .updatesDescription(
    "New updates include search by muscle, equipment, type, level and more. Enhanced new experience with better screens."
  )
  .build();

const privacyCompliance = publish.privacyAndCompliance({
  locales: {
    [Locale.en_US]: {
      privacyPolicyUrl: "https://www.alexa.com/help/privacy",
      termsOfUseUrl: "https://www.alexa.com/help/terms",
    },
  },
  allowsPurchases: false,
  usesPersonalInfo: false,
  isChildDirected: false,
  isExportCompliant: true,
  containsAds: false,
});

const publishInfo = publish.publishingInfo({
  isAvailableWorldwide: true,
  testingInstructions: "Try Open my workout buddy. or test sample phrases.",
  category: "HEALTH_AND_FITNESS",
  distributionCountries: [],
});

export default ax
  .compound()
  .add(skillInfo)
  .add(privacyCompliance)
  .add(publishInfo)
  .build();
