import React from 'react';
import axios from 'axios';
export class WordsPractice extends React.Component<any,any> {

    constructor(props: any){
        super(props);
        axios.get(`./weeklyWords.json`)
        .then(res => {
            console.log(res);
            const words = res.data;
            this.setState({ words });
        })
    }

    render() {

        return (<div>
                <ul>
                    {this.state && this.state.words && this.state.words.map((w: any) => this.presentWord(w))}
                </ul>
            </div>);
    }

    presentWord(wordObject: any){
        return (
            <li key={wordObject.eng}>
                {wordObject.eng} - {wordObject.heb}
            </li>
        )
    }
}
