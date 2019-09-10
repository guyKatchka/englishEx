import { shuffleArray } from '../utils/utils';
import './TestQuestion.css';

export class TestQuestion{
    wordToTranslate: string;
    correctTranslation: string;
    answerOptions: Array<string>;
    isClicked: boolean;

    constructor(wordToTranslate: string, correctTranslation: string, otherOptions: Array<string>){
        this.wordToTranslate = wordToTranslate;
        this.correctTranslation = correctTranslation;
        
        otherOptions.push(correctTranslation);
        this.answerOptions = shuffleArray(otherOptions);
        this.isClicked = false;
    }   
    
    isCorrectAnswer = (wordChosen: string) => wordChosen === this.correctTranslation;

    showWrongBackground = () => this.isClicked && !this.correctTranslation;
}