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
            !this.props.weeklyWords[0].words){
            return(
                <div></div>
            )
        }
        const latestWordsListPresentation = renderWordsList(this.props.weeklyWords[0].words);

        const weeklyWordsToPresent = this.props.showPreviousWords ? this.props.weeklyWords : this.props.weeklyWords.slice(0, 1);
        const wordsPracticeListWithDates = 
            weeklyWordsToPresent.map((weeklyWordsObject: WeeklyWordsObject) => {
                const wordsListPresentation = renderWordsList(weeklyWordsObject.words);
                return(
                    <div>
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


export function renderWordsList(words: any){
    return (
        <ul style={{listStyleType: 'none'}}>
            {words.map((wordObject: any) => 
                <li key={wordObject.eng}>
                    {wordObject.eng} - {wordObject.heb}
                </li>
                )}
        </ul>
    );        
}
