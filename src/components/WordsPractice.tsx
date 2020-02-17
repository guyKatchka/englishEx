import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { WordsListByDates} from './WordsList';
import { WordsTest, TestResults } from './WordsTest';
import { TestQuestion } from './TestQuestion';
import { WeeklyWordsObject, PracticeWord } from '../Interfaces/words-interfaces';
import { ProgressDisplay } from './ProgressDisplay';
import { findIndex, remove, flatMap, shuffle } from 'lodash';

export interface WordsPracticeState{
    weeklyWords: Array<WeeklyWordsObject>;
    availableDates: Array<Date>;
    isTesting: boolean;
    testResultsHistory: Array<TestResults>;
    questions: Array<TestQuestion>;
    showPreviousWords: boolean;
    showProgress: boolean;
    wordsToPracticeIndex: number;
    selectedDates: Date[];
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
            showProgress: false,
            wordsToPracticeIndex: 0,
            selectedDates: []
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
                    selectedDates: [weeklyWords[0].weekDate]
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
                <WordsListByDates 
                    weeklyWords={this.state.weeklyWords} 
                    showPreviousWords={this.state.showPreviousWords}
                    onWordsPracticeSelection={this.onWordsPracticeSelection}
                    selectedDates={this.state.selectedDates}></WordsListByDates>                
                <div>
                    <Button variant="outline-primary" onClick={() => this.startTest()}>
                        !התחל מבחן
                    </Button>
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
        const questions = this.buildQuestions(this.getSelectedWordsToPractice());
        this.setState({isTesting: true, questions});
    }

    endTest = (testResults:TestResults) => {
        const testResultsHistory2 = this.state.testResultsHistory.slice() || [];
        testResultsHistory2.push(testResults);
        this.setState(
            { 
                isTesting: false, 
                testResultsHistory: testResultsHistory2,
                showProgress: true
            }, 
            () => console.log(this.state));
        window.localStorage.setItem(testHistoryLocalStorageKey, JSON.stringify(testResultsHistory2));
    }

    onWordsPracticeSelection = (selectedWordsDate: Date) => {
        const indexOfSelectedWordsDate = findIndex(this.state.weeklyWords, (words: WeeklyWordsObject) => words.weekDate === selectedWordsDate);
        const newSelectedDates = this.state.selectedDates;
        newSelectedDates.includes(selectedWordsDate) ? remove(newSelectedDates, (date:Date) => date === selectedWordsDate) : newSelectedDates.push(selectedWordsDate);
        this.setState(
            {
                wordsToPracticeIndex: indexOfSelectedWordsDate,
                selectedDates: newSelectedDates
            });
    }

    private getSelectedWordsToPractice = ():PracticeWord[] => 
            flatMap( 
                this.state.weeklyWords.filter((wordObj:WeeklyWordsObject) => this.state.selectedDates.includes(wordObj.weekDate)),
                (wordObj:WeeklyWordsObject) => wordObj.words);

    private buildQuestions(words: Array<PracticeWord>){
        let questions :Array<TestQuestion> = [];

        // build english to hebrew questions
        for (let i=0; i < words.length; i++){
            const englishWordToTranslate = words[i].eng;
            const correctHebrewTranslation = words[i].heb;


            let otherOptions : Array<string> = words.map((w :PracticeWord) => w.heb); // get all hebrew words                                
            otherOptions.splice(i, 1); // remove the correct translation
            otherOptions = shuffle(otherOptions);
            otherOptions.splice(3); // take only 3 options
            questions.push(new TestQuestion(englishWordToTranslate, correctHebrewTranslation, otherOptions));
        }

        return shuffle(questions);
    }    
}
