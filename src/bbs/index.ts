import { IntentRequest } from "ask-sdk-model";

import {
  alexa as ax,
  AlexaBlock,
  AlexaBuilderContext,
  AlexaDialogContext,
  AlexaEvent,
  ssml,
} from "@chitchatjs/alexa";
import { ui } from "ask-sdk-model";
import { session } from "@chitchatjs/plugin-ax-session";

/**
 * Some locally developed building blocks.
 */
export namespace bbs {
  export const speech = (text: string) => {
    return ax.ssml(text).voice(ssml.Voice.Matthew).build();
  };
  export namespace slots {
    export const value = (
      slotName: string,
      callback: (value: string | undefined) => AlexaBlock
    ) => {
      return ax
        .custom()
        .executor((c: AlexaDialogContext, e: AlexaEvent) => {
          let requestType = e.currentRequest.request.type;
          if (requestType === "IntentRequest") {
            let request = <IntentRequest>e.currentRequest.request;
            let slots = request.intent.slots;
            console.log("SLOTS: " + JSON.stringify(slots, null, 2));
            let value = slots && slots[slotName] ? slots[slotName].value : undefined;
            return callback(value);
          }
          return callback(undefined);
        })
        .build();
    };

    export const values = (
      slotNames: string[],
      callback: (values: { [name: string]: string }) => AlexaBlock
    ) => {
      return ax
        .custom()
        .executor((c: AlexaDialogContext, e: AlexaEvent) => {
          let requestType = e.currentRequest.request.type;
          if (requestType === "IntentRequest") {
            let _values: { [name: string]: string } = {};

            let request = <IntentRequest>e.currentRequest.request;
            let slots = request.intent.slots;
            console.log("SLOTS: " + JSON.stringify(slots, null, 2));
            for (let slotName of slotNames) {
              let value = slots && slots[slotName] ? slots[slotName].value : undefined;
              if (value) {
                _values[slotName] = value;
              }
            }
            return callback(_values);
          }
          return callback({});
        })
        .build();
    };

    export const resolvedValues = (
      slotName: string,
      callback: (resolvedValues: string[]) => AlexaBlock
    ) => {
      return ax
        .custom()
        .executor((c: AlexaDialogContext, e: AlexaEvent) => {
          let requestType = e.currentRequest.request.type;
          if (requestType === "IntentRequest") {
            let request = <IntentRequest>e.currentRequest.request;
            let slots = request.intent.slots;

            console.log("SLOTS: " + JSON.stringify(slots, null, 2));
            let resolutions =
              slots && slots[slotName] && slots[slotName].resolutions
                ? slots[slotName].resolutions
                : {};
            let authority =
              resolutions && resolutions.resolutionsPerAuthority
                ? resolutions.resolutionsPerAuthority[0]
                : undefined;

            if (authority && authority.status.code === "ER_SUCCESS_MATCH") {
              let values = authority ? authority.values : [];
              let resolvedValues = values.map((v) => v.value.name);
              return callback(resolvedValues);
            }
          }
          return callback([]);
        })
        .build();
    };
  }

  /**
   * Enables block to be repeatable when user says repeat
   *
   * @param blockToRepeat Block
   */
  export const REPEATABLE_PHRASE_KEY = "__repeatPhrase__";

  export const repeatable = (blockToRepeat: AlexaBlock): AlexaBlock => {
    return ax
      .compound()
      .add(blockToRepeat)
      .add(
        ax
          .custom()
          .executor((c: AlexaDialogContext, e: AlexaEvent) => {
            if (c.currentResponse.response.outputSpeech?.type === "SSML") {
              let ssml: ui.SsmlOutputSpeech = c.currentResponse.response.outputSpeech;
              return session.set(REPEATABLE_PHRASE_KEY, ssml.ssml);
            } else if (c.currentResponse.response.outputSpeech?.type === "PlainText") {
              let plain: ui.PlainTextOutputSpeech =
                c.currentResponse.response.outputSpeech;
              return session.set(REPEATABLE_PHRASE_KEY, plain.text);
            }
            return ax.empty();
          })
          .build()
      )
      .build();
  };

  export const enableRepeat = (fallback: AlexaBlock) => {
    return ax
      .whenIntentName("AMAZON.RepeatIntent")
      .then(
        ax
          .custom()
          .executor((c: AlexaDialogContext, e: AlexaEvent) => {
            let attr = e.currentRequest.session?.attributes;
            if (attr && attr[REPEATABLE_PHRASE_KEY]) {
              return bbs.repeatable(ax.ask(attr[REPEATABLE_PHRASE_KEY]).build());
            }
            return fallback;
          })
          .build()
      )
      .build();
  };
}
