import React from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {renderWordsList, WordsListByDates} from './WordsList';
import { WordsTest, TestResults } from './WordsTest';
import { shuffleArray } from '../utils/utils';
import { TestQuestion } from './TestQuestion';
import { WeeklyWordsObject, PracticeWord } from '../Interfaces/words-interfaces';
import { ProgressDisplay } from './progressDisplay';

export interface WordsPracticeState{
    weeklyWords: Array<WeeklyWordsObject>;
    availableDates: Array<Date>;
    isTesting: boolean;
    testResultsHistory: Array<TestResults>;
    questions: Array<TestQuestion>;
    showPreviousWords: boolean;
    showProgress: boolean;
}

const testHistoryLocalStorageKey = "TestResultsHistory";


export class WordsPractice extends React.Component<any,WordsPracticeState> {

    constructor(props: any){
        super(props);
        const testHistory = JSON.parse(window.localStorage.getItem(testHistoryLocalStorageKey) || "[]");
        this.state = {
            weeklyWords: [],
            availableDates: [],
            isTesting: false,
            testResultsHistory: testHistory,
            questions: [],
            showPreviousWords: false,
            showProgress: false
        };
        axios.get(`./weeklyWords.json`)
        .then(res => {
            const weeklyWords : Array<WeeklyWordsObject> = res.data;

            this.setState(
                { 
                    weeklyWords, 
                    availableDates: weeklyWords.map((w: WeeklyWordsObject) => w.weekDate),
                    isTesting: false,
                    testResultsHistory: testHistory,
                });
        });
    }

    render() {        
        let contentDisplay = this.getShowWordsContent();
        
        if (!this.state || !this.state.weeklyWords){
            contentDisplay = (<div>
                Loading...
            </div>);            
        }
        
        if (this.state.isTesting && this.state.questions){
            contentDisplay = (
                <WordsTest questions={this.state.questions} onTestEnd={(testResults:TestResults) => this.endTest(testResults)}></WordsTest>
            )
        }

        if (this.state.showProgress){
            contentDisplay = 
                <ProgressDisplay 
                    onBackClick={() => this.hideResults()}
                    previousTestResults={this.state.testResultsHistory}>
                </ProgressDisplay>
        }

        return (
            <div className="app-main-box">
                {contentDisplay}                
            </div>
        );                
    }

    getShowWordsContent(){
        let showPreviousWordsButton = 
            this.state.showPreviousWords ?
            <Button variant="outline-secondary" onClick={() => this.hidePreviousWords()}>הסתר מילים קודמות</Button> :
            <Button variant="outline-secondary" onClick={() => this.showPreviousWords()}>הצג מילים קודמות</Button>;

        const showProgressButton = 
            this.state.testResultsHistory && this.state.testResultsHistory.length ?    
                <Button variant="outline-secondary" onClick={() => this.showResults()}>הצג תוצאות קודמות</Button> :
                null;
        return (
            <div>
                <WordsListByDates weeklyWords={this.state.weeklyWords} showPreviousWords={this.state.showPreviousWords}></WordsListByDates>                
                <div>
                    <Button variant="outline-primary" onClick={() => this.startTest()}>התחל מבחן!</Button>
                    {showPreviousWordsButton}
                    {showProgressButton}
                </div>                
            </div>            
        ); 
    }

    showPreviousWords = () => this.setState({showPreviousWords: true})
    

    hidePreviousWords = () => this.setState({showPreviousWords: false})

    showResults = () => this.setState({showPreviousWords: false, showProgress: true})

    hideResults = () => this.setState({showPreviousWords: false, showProgress: false})
    
    startTest = () => {
        const questions = this.buildQuestions(this.state.weeklyWords[0].words);
        this.setState({isTesting: true, questions});
    }

    endTest = (testResults:TestResults) => {
        const testResultsHistory2 = this.state.testResultsHistory.slice() || [];
        testResultsHistory2.push(testResults);
        this.setState({ isTesting: false, testResultsHistory: testResultsHistory2}, () => console.log(this.state));
        window.localStorage.setItem(testHistoryLocalStorageKey, JSON.stringify(testResultsHistory2));
    }

    buildQuestions(words: Array<PracticeWord>){
        let questions :Array<TestQuestion> = [];

        // build english to hebrew questions
        for (let i=0; i < words.length; i++){
            const englishWordToTranslate = words[i].eng;
            const correctHebrewTranslation = words[i].heb;


            let otherOptions : Array<string> = words.map((w :PracticeWord) => w.heb); // get all hebrew words                                
            otherOptions.splice(i, 1); // remove the correct translation
            otherOptions = shuffleArray(otherOptions);
            otherOptions.splice(3); // take only 3 options
            questions.push(new TestQuestion(englishWordToTranslate, correctHebrewTranslation, otherOptions));
        }

        return questions;
    }
}
