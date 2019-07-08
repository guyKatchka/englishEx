import React from 'react';
import axios from 'axios';
import {renderWordsList} from './WordsList';
import { WordsTest } from './WordsTest';
export class WordsPractice extends React.Component<any,any> {

    constructor(props: any){
        super(props);
        axios.get(`./weeklyWords.json`)
        .then(res => {
            console.log(res);
            const weeklyWords = res.data;

            this.setState(
                { 
                    weeklyWords, 
                    availableDates: weeklyWords.map((w: any) => w.weekDate),
                    isTesting: false
                });
        })
    }

    render() {        
        if (!this.state || !this.state.weeklyWords){
            return (<div>
                Loading...
            </div>);            
        }

        if (this.state.isTesting){
            return(
                <WordsTest words={this.state.weeklyWords[0]}></WordsTest>
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
        console.log(" setting test to true");
        this.setState({isTesting: true});
    }
}
