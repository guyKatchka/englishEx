import React from 'react';
import Button from 'react-bootstrap/Button';
import { shuffleArray } from '../utils/utils';

export class TestQuestion{
    wordToTranslate: string;
    correctTranslation: string;
    answerOptions: Array<string>;

    constructor(wordToTranslate: string, correctTranslation: string, otherOptions: Array<string>){
        this.wordToTranslate = wordToTranslate;
        this.correctTranslation = correctTranslation;
        
        otherOptions.push(correctTranslation);
        this.answerOptions = shuffleArray(otherOptions);
    }

    renderQuestion(answerQuestionFunc: (word :string) => void){
        return (
            <div>
                <h2>{this.wordToTranslate}</h2>
                {this.answerOptions.map(word => 
                    <Button variant="outline-secondary" key={word} onClick={(e: any) => answerQuestionFunc(word)}>{word}</Button>)
                }
            </div>
        )
    }
    
    isCorrectAnswer = (wordChosen: string) => wordChosen === this.correctTranslation;
}