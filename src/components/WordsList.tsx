import React from 'react';
import Moment from 'react-moment';
import { WeeklyWordsObject } from '../Interfaces/words-interfaces';

interface WordsListProps{
    weeklyWords: Array<WeeklyWordsObject>;
    showPreviousWords:boolean;
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
                        {wordsListPresentation}
                    </div>
                );
            });

        return(
        <div>
            <h2>Words to practice</h2>
                {wordsPracticeListWithDates}                
        </div>        
    );
    }
}


export function renderWordsList(weeklyWordsObject: WeeklyWordsObject){
    const words = weeklyWordsObject.words;
    
    return (
        <ul style={{listStyleType: 'none'}}>
            {words.map((wordObject, index:number) => 
                <li key={wordObject.eng + "_" + index}>
                    <span>{wordObject.eng} - {wordObject.heb}</span>
                </li>
                )}
        </ul>
    );        
}
