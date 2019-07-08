import React from 'react';
import axios from 'axios';
import {renderWordsList} from './WordsList';
import { WordsTest, TestQuestion } from './WordsTest';
import { shuffleArray } from '../utils/utils';
export class WordsPractice extends React.Component<any,any> {

    constructor(props: any){
        super(props);
        this.state = {};
        axios.get(`./weeklyWords.json`)
        .then(res => {
            const weeklyWords = res.data;

            this.setState(
                { 
                    weeklyWords, 
                    availableDates: weeklyWords.map((w: any) => w.weekDate),
                    isTesting: false,
                    testResultsHistory: []
                });
        })
    }

    render() {        
        if (!this.state || !this.state.weeklyWords){
            return (<div>
                Loading...
            </div>);            
        }

        if (this.state.isTesting && this.state.questions){
            return(
                <WordsTest questions={this.state.questions} onTestEnd={(testResults:any) => this.endTest(testResults)}></WordsTest>
            )
        }

        const latestWordsListPresentation = renderWordsList(this.state.weeklyWords[0].words);
        const previousWords = renderWordsList(this.state.weeklyWords[1].words);
        return (
            <div>
                <h2>This week words:</h2>
                <p>{this.state.weeklyWords[0].weekDate}</p>
                {latestWordsListPresentation}
                <div>
                    <button onClick={() => this.startTest()}>Start Test!</button>
                </div>
                <h3>Previous words:</h3>
                <p>{this.state.weeklyWords[1].weekDate}</p>
                {previousWords}
            </div>            
        );        
    }
    
    startTest = () => {
        const questions = this.buildQuestions(this.state.weeklyWords[0].words);
        this.setState({isTesting: true, questions});
    }

    endTest = (testResults:any) => {
        let testResultsHistory = this.state.testResultsHistory.splice();
        testResultsHistory.push(testResults);
        this.setState({ isTesting: false, testResultsHistory});
        console.log(this.state);
    }

    buildQuestions(words: any){
        let questions :Array<TestQuestion> = [];

        // build english to hebrew questions
        for (let i=0; i < words.length; i++){
            const englishWordToTranslate = words[i].eng;
            const correctHebrewTranslation = words[i].heb;


            let otherOptions : Array<string> = words.map((w :any) => w.heb); // get all hebrew words                                
            otherOptions.splice(i, 1); // remove the correct translation
            otherOptions = shuffleArray(otherOptions);
            otherOptions.splice(3); // take only 3 options
            questions.push(new TestQuestion(englishWordToTranslate, correctHebrewTranslation, otherOptions));
        }

        return questions;
    }
}
