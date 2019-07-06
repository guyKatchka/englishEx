import React from 'react';
import axios from 'axios';
export class WordsPractice extends React.Component<any,any> {

    constructor(props: any){
        super(props);
        axios.get(`./weeklyWords.json`)
        .then(res => {
            console.log(res);
            const weeklyWords = res.data;

            this.setState({ weeklyWords, availableDates: weeklyWords.map((w: any) => w.weekDate) });
        })
    }

    render() {        
        if (!this.state || !this.state.weeklyWords){
            return (<div>
                Loading...
            </div>);            
        }

        const firstWords = this.state.weeklyWords[0].words;

        return (
            <div>
                <ul style={{listStyleType: 'none'}}>
                    {firstWords.map((w: any) => this.presentWord(w))}
                </ul>
                <div>
                    <button>Start Test!</button>
                </div>
            </div>            
        );        
    }

    presentWord(wordObject: any){
        return (
            <li key={wordObject.eng}>
                {wordObject.eng} - {wordObject.heb}
            </li>
        )
    }
}
