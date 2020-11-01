import { AlexaBuilderContext, ax, SkillManifestEnvelope } from "@chitchatjs/alexa";
import { v1 } from "ask-smapi-model";

export type PrivacyAndCompliance = v1.skill.Manifest.SkillManifestPrivacyAndCompliance;
export type PublishingInformation = v1.skill.Manifest.SkillManifestPublishingInformation;
export type LocalizedPublishingInformation = v1.skill.Manifest.SkillManifestLocalizedPublishingInformation;
export type DistributionMode = v1.skill.Manifest.DistributionMode;
export type ManifestGadgetSupport = v1.skill.Manifest.ManifestGadgetSupport;
export type DistributionCountries = v1.skill.Manifest.DistributionCountries;

/**
 * Some manifest related locally developed building blocks.
 */
export namespace publish {
  export const privacyAndCompliance = (privacyAndCompliance: PrivacyAndCompliance) => {
    return ax
      .custom()
      .builder((c: AlexaBuilderContext) => {
        let manifestEnvelopeStr = c.resources.resourceMap["/skill.json"];
        let manifestEnvelope: SkillManifestEnvelope = JSON.parse(manifestEnvelopeStr);

        if (!manifestEnvelope.manifest) manifestEnvelope.manifest = {};
        manifestEnvelope.manifest.privacyAndCompliance = privacyAndCompliance;

        c.resources.resourceMap["/skill.json"] = JSON.stringify(manifestEnvelope);
      })
      .build();
  };

  export const publishingInfo = (input: {
    isAvailableWorldwide?: boolean;
    distributionMode?: DistributionMode;
    gadgetSupport?: ManifestGadgetSupport;
    testingInstructions?: string;
    category?: string;
    distributionCountries?: DistributionCountries[];
  }) => {
    return ax
      .custom()
      .builder((c: AlexaBuilderContext) => {
        let manifestEnvelopeStr = c.resources.resourceMap["/skill.json"];
        let manifestEnvelope: SkillManifestEnvelope = JSON.parse(manifestEnvelopeStr);

        if (!manifestEnvelope.manifest) manifestEnvelope.manifest = {};
        if (!manifestEnvelope.manifest.publishingInformation)
          manifestEnvelope.manifest.publishingInformation = {};

        let publishInfo = manifestEnvelope.manifest.publishingInformation;

        publishInfo.isAvailableWorldwide = input.isAvailableWorldwide;
        publishInfo.distributionMode = input.distributionMode;
        publishInfo.gadgetSupport = input.gadgetSupport;
        publishInfo.testingInstructions = input.testingInstructions;
        publishInfo.distributionCountries = input.distributionCountries;

        c.resources.resourceMap["/skill.json"] = JSON.stringify(manifestEnvelope);
      })
      .build();
  };
}
