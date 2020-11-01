import { ax } from "@chitchatjs/alexa";
import { common } from "@chitchatjs/plugin-ax-common";

/**
 * Intent building blocks
 */
const feelingLuckyIntent = ax
  .intent("FeelingLuckyIntent")
  .samples([
    "i am feeling lucky",
    "i'm feeling lucky",
    "feeling lucky",
    "lucky",
    "another exercise",
    "give me another one",
    "give me another exercise",
    "new exercise",
    "different exercise",
    "tell me exercises for {muscle}",
    "show me exercises for {muscle}",
    "exercises for {muscle}",
    "exercise for {muscle}",
    "{muscle} exercises",
    "give me a {muscle} exercise",
    "give me a {rating} rated {muscle} exercise",
    "for a {muscle} exercise",
    "show me {muscle} exercises",
    "tell me {muscle} exercises",
    "give me exercises for {muscle}",
    "give me {rating} rating exercises",
    "show me {rating} rated exercises",
    "tell me {rating} rated exercises",
    "tell me exercises for {equipment}",
    "show me exercises for {equipment}",
    "tell me {equipment} exercises",
    "tell me {level} exercises",
    "tell me exercises for {level}",
    "tell me {exerciseType} based exercises",
    "tell me {exerciseType} exercises",
    "tell me a {exerciseType} exercise",
    "a {exerciseType} exercise",
    "tell me exercises for {exerciseType}",
    "tell me execise for {exerciseType} for {level} using {equipment} and {rating} rated",
  ])
  .slot("muscle", "Muscle")
  .slot("rating", "Rating")
  .slot("equipment", "Equipment")
  .slot("level", "Level")
  .slot("exerciseType", "ExerciseType")
  .build();

const exerciseLookupIntent = ax
  .intent("ExerciseLookupIntent", [
    "{exerciseName}",
    "about {exerciseName}",
    "what is {exerciseName}",
    "tell me about {exerciseName}",
    "what about {exerciseName}",
    "what is {exerciseName}",
    "i want to know about {exerciseName}",
    "teach me {exerciseName}",
    "teach me how to {exerciseName}",
    "show me {exerciseName}",
    "show me how to perform {exerciseName}",
    "tell me how to perform {exerciseName}",
    "what is rating of exercise {exerciseName}",
    "rating of {exerciseName}",
    "find {exerciseName}",
  ])
  .slot("exerciseName", "ExerciseName")
  .build();

export default ax
  .compound()
  .add(exerciseLookupIntent)
  .add(feelingLuckyIntent)
  .add(ax.intent("AMAZON.YesIntent").build())
  .add(ax.intent("AMAZON.NoIntent").build())
  .add(ax.intent("AMAZON.RepeatIntent").build())
  .add(common.defaultHandlers())
  .build();
