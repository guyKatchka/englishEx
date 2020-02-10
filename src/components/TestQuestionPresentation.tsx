import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
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
    testQuestionOptions:Array<AnswerOption>,
    answerFeedbackText:string,
    isCorrectAnswerClicked:boolean
}

export class TestQuestionPresentation extends React.Component<TestQuestionProps,TestQuestionState>{

    constructor(props:any){
        super(props);

        this.state = {
            testQuestionOptions : this.props.testQuestion.answerOptions.map((word:string) => 
                 new AnswerOption(word, this.props.testQuestion.correctTranslation === word)
            ),
            answerFeedbackText: '',
            isCorrectAnswerClicked: false
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
                            bsPrefix={this.getAnswerOptionBackground(answerOption)} 
                            onClick={(e: any) => this.clickOnWordOption(answerOption, answerOptionIndex)}
                            disabled={this.state.isCorrectAnswerClicked}>
                                {answerOption.word}
                        </Button>)
                    }
                    <div className={"words-test-answer-feedback"}>
                        {this.state.answerFeedbackText}
                        {this.state.isCorrectAnswerClicked ? <Spinner animation="border" variant="success" /> : null}
                    </div>
                </div>                
            </div>
        )
    }

    getAnswerOptionBackground(answerOption: AnswerOption){
        if (!answerOption.isClicked) return '';        
        return answerOption.isCorrectTranslation ? 'word-correct-answer-background' : 'word-wrong-answer-background';        
    }

    clickOnWordOption = (answerOption: AnswerOption, answerOptionIndex: number) => {
        let testQuestionOptions = this.state.testQuestionOptions;
        testQuestionOptions[answerOptionIndex].isClicked = true;
        this.setState({testQuestionOptions});

        this.setState({
            answerFeedbackText: answerOption.isCorrectTranslation ? "נכון!" : "נסה שוב",
            isCorrectAnswerClicked: answerOption.isCorrectTranslation ? true : false
        })
        
        setTimeout(
            () => this.props.answerQuestionFunc(answerOption.word),
            answerOption.isCorrectTranslation ? 1200 : 0);
    }

    resetClicks = () => {
        let testQuestionOptions = this.state.testQuestionOptions;
        testQuestionOptions.forEach((answerOption:AnswerOption) => {
            answerOption.isClicked = false;
        });
        this.setState({testQuestionOptions});
    }
}