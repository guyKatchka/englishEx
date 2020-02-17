import React from 'react';
import Moment from 'react-moment';
import { WeeklyWordsObject } from '../Interfaces/words-interfaces';
import { Checkbox, CheckboxChangeEvent } from '@progress/kendo-react-inputs';
import './WordsList.css';

interface WordsListProps{
    weeklyWords: Array<WeeklyWordsObject>;
    showPreviousWords:boolean;
    onWordsPracticeSelection: (wordsDate: Date) => void;
    selectedDates: Date[];
}

export class WordsListByDates extends React.Component<WordsListProps,any> {
    constructor(props: any){
        super(props);
        console.log(props);                  
    }

    render(){
        if (!this.props || 
            !this.props.weeklyWords ||
            !this.props.weeklyWords[0] ||
            !this.props.weeklyWords[0].words ||
            !this.props.weeklyWords[0].weekDate){
            return(
                <div></div>
            )
        }

        const weeklyWordsToPresent = this.props.showPreviousWords ? this.props.weeklyWords : this.props.weeklyWords.slice(0, 1);
        const wordsPracticeListWithDates = 
            weeklyWordsToPresent.map((weeklyWordsObject: WeeklyWordsObject, index:number) => {
                const wordsListPresentation = renderWordsList(weeklyWordsObject);
                return(
                    <div key={index}>
                        <Moment format="DD/MM/YYYY" date={weeklyWordsObject.weekDate}></Moment>
                        <div className="words-list-select-words-container">
                            <span className="words-list-select-words-title">תרגל מילים אלו</span>
                            <Checkbox 
                                value={this.isDateSelected(weeklyWordsObject.weekDate)}
                                onChange={(event: CheckboxChangeEvent) => this.onDateSelection(event, weeklyWordsObject.weekDate)}></Checkbox>    
                        </div>
                        {wordsListPresentation}
                    </div>
                );
            });

        return(
        <div>
            <h2>מילים לתרגול</h2>
                {wordsPracticeListWithDates}                
        </div>);
    }

    isDateSelected(dateToCheck:Date){
        return this.props.selectedDates.includes(dateToCheck);
    }

    onDateSelection = (event: CheckboxChangeEvent, selectedDate: Date) =>{
        if (!this.props.selectedDates.includes(selectedDate) || this.props.selectedDates.length > 1){
            // avoid removing selection if this is the only checkbox selected (min of 1 date)
            this.props.onWordsPracticeSelection(selectedDate);
        }        
    }
}


export function renderWordsList(weeklyWordsObject: WeeklyWordsObject){
    const words = weeklyWordsObject.words;
    
    return (
        <ul style={{listStyleType: 'none'}} className="words-list-map">
            {words.map((wordObject, index:number) => 
                <li key={wordObject.eng + "_" + index}>
                    <span>{wordObject.eng} - {wordObject.heb}</span>
                </li>
                )}
        </ul>
    );        
}
