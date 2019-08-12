import React from 'react';
import Button from 'react-bootstrap/Button';
import { shuffleArray } from '../utils/utils';
import './TestQuestion.css';

export class TestQuestion{
    wordToTranslate: string;
    correctTranslation: string;
    answerOptions: Array<string>;
    wrongClick: boolean;

    constructor(wordToTranslate: string, correctTranslation: string, otherOptions: Array<string>){
        this.wordToTranslate = wordToTranslate;
        this.correctTranslation = correctTranslation;
        
        otherOptions.push(correctTranslation);
        this.answerOptions = shuffleArray(otherOptions);
        this.wrongClick = false;
    }

    renderQuestion(answerQuestionFunc: (word :string) => void){
        return (
            <div>
                <h2>{this.wordToTranslate}</h2>
                <div>
                    {this.answerOptions.map(word => 
                        <Button 
                            variant="outline-secondary" 
                            key={word}
                            bsPrefix={this.wrongClick ? "word-answer-background" : ""} 
                            onClick={(e: any) => this.answerQuestion(answerQuestionFunc, word)}>
                                {word}
                        </Button>)
                    }
                </div>                
            </div>
        )
    }

    answerQuestion = (answerQuestionFunc: (word :string) => void, word: string) => {
        this.wrongClick = !this.isCorrectAnswer(word);
        console.log(`answered question, clicked ${word}. wrongClickValue: ${this.wrongClick}`);
        answerQuestionFunc(word);
    }
    
    isCorrectAnswer = (wordChosen: string) => wordChosen === this.correctTranslation;
}