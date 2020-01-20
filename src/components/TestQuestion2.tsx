import React from 'react';
import Button from 'react-bootstrap/Button';
import { shuffleArray } from '../utils/utils';
import { TestQuestion } from './TestQuestion';

export interface TestQuestionProps{
    answerQuestionFunc: (word :string) => void,
    testQuestion:TestQuestion
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

export class TestQuestionPresentation extends React.Component<TestQuestionProps,TestQuestionState>{

    constructor(props:any){
        super(props);

        this.state = {
            testQuestionOptions : this.props.testQuestion.answerOptions.map((word:string) => 
                 new AnswerOption(word, this.props.testQuestion.correctTranslation === word)
            ),
        }
    }

    render(){
        return (
            <div>
                <h2>{this.props.testQuestion.wordToTranslate}</h2>
                <div>
                    {this.state.testQuestionOptions.map((answerOption: AnswerOption, answerOptionIndex: number) => 
                        <Button 
                            variant="outline-secondary" 
                            key={answerOption.word + "_" + answerOptionIndex}
                            bsPrefix={answerOption.isClicked && !answerOption.isCorrectTranslation ? "word-answer-background" : ""} 
                            onClick={(e: any) => this.clickOnWordOption(answerOption, answerOptionIndex)}>
                                {answerOption.word}
                        </Button>)
                    }
                </div>                
            </div>
        )
    }

    clickOnWordOption = (answerOption: AnswerOption, answerOptionIndex: number) => {
        if (answerOption.isCorrectTranslation){
            this.resetClicks()
        }
        else{
            let testQuestionOptions = this.state.testQuestionOptions;
            testQuestionOptions[answerOptionIndex].isClicked = true;
            this.setState({testQuestionOptions});
        }        
        
        this.props.answerQuestionFunc(answerOption.word);
    }

    resetClicks = () => {
        let testQuestionOptions = this.state.testQuestionOptions;
        testQuestionOptions.forEach((answerOption:AnswerOption) => {
            answerOption.isClicked = false;
        });
        this.setState({testQuestionOptions});
    }
}