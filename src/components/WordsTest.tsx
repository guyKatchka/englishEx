import React from 'react';
import { shuffleArray } from '../utils/utils';

export class WordsTest extends React.Component<any,any> {
    constructor(props: any){
        super(props);    
        this.state = {
            currentQuestionIndex: 0
        }      
    }

    render(){
        console.log(this.props);
        if (!this.props || !this.props.questions || !this.state){
            return(
                <div>
                    Loading...
                </div>
            );
        }

        let currentQuestion = this.props.questions[this.state.currentQuestionIndex];
        return(
            <div>
                {currentQuestion.renderQuestion((word :string) => this.answerQuestion(word))}
            </div>
        )
    }
    
    answerQuestion(word: string){
        this.setState({currentQuestionIndex: this.state.currentQuestionIndex + 1});
    }
}

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
                {this.answerOptions.map(word => <button key={word} onClick={(e: any) => answerQuestionFunc(word)}>{word}</button>)}
            </div>
        )
    }    
}