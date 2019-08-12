import React from 'react';
import Button from 'react-bootstrap/Button';
import { shuffleArray } from '../utils/utils';

export interface TestQuestionProps{
    wordToTranslate: string,
    answerQuestionFunc: (word :string) => void,
    answerOptions: Array<string>,
    correctTranslation: string
}

export class AnswerOption{
    word: string;
    isCorrectTranslation: boolean;
    isClicked: boolean;

    constructor(word: string, isCorrectTranslation: boolean){
        this.word = word;
        this.isCorrectTranslation = isCorrectTranslation;
        this.isClicked = false;
    }
}

export interface TestQuestionState{
    testQuestionOptions:Array<AnswerOption>
}

export class TestQuestion2 extends React.Component<TestQuestionProps,TestQuestionState>{

    constructor(props:any){
        super(props);

        this.state = {
            testQuestionOptions : this.props.answerOptions.map((word:string) => 
                 new AnswerOption(word, this.props.correctTranslation === word)
            ),
        }
    }

    render(){

        return (
            <div>
                <h2>{this.props.wordToTranslate}</h2>
                <div>
                    {this.state.testQuestionOptions.map(answerOption => 
                        <Button 
                            variant="outline-secondary" 
                            key={answerOption.word}
                            bsPrefix={answerOption.isClicked && !answerOption.isCorrectTranslation ? "word-answer-background" : ""} 
                            onClick={(e: any) => this.props.answerQuestionFunc(answerOption.word)}>
                                {answerOption.word}
                        </Button>)
                    }
                </div>                
            </div>
        )
    }
}