import { string } from "prop-types";

export interface PracticeWord {
    eng: string; // word in english
    heb: string; // word in hebrew
};

export interface WeeklyWordsObject{
    weekDate: Date; // date when the words were given
    words: Array<PracticeWord>; // words to practice
}