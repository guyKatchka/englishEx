import React from 'react';

export class WordsTest extends React.Component<any,any> {
    constructor(props: any){
        super(props);        
    }

    render(){
        const questions = this.buildQuestions(this.props.words);
        this.setState({questions, questionIndex: 0});
        
        if (!this.state || !this.state.questions){
            return(
                <div>
                    Loading...
                </div>
            );
        }

        let currentQuestion = this.state.questions[this.state.questionIndex];
        return(
            <div>
                {currentQuestion.renderQuestion()}
            </div>
        )
    }


    buildQuestions(words: any){
        let questions :Array<TestQuestion> = [];

        // build english to hebrew questions
        for (let i=0; i < words.length; i++){
            const englishWordToTranslate = words[i].eng;
            const correctHebrewTranslation = words[i].heb;

            let otherOptions : Array<string> = new Array<string>();
            while (otherOptions.length < 3){
                const rnd = Math.floor(Math.random() * words.length);  
                const otherWord = words[rnd].heb;
                if (otherWord !== correctHebrewTranslation){
                    otherOptions.push(otherWord);
                }
            }

            questions.push(new TestQuestion(englishWordToTranslate, correctHebrewTranslation, otherOptions));
        }
    }    
}

export class TestQuestion{
    wordToTranslate: string;
    correctTranslation: string;
    otherOptions: Array<string>;

    constructor(wordToTranslate: string, correctTranslation: string, otherOptions: Array<string>){
        this.wordToTranslate = wordToTranslate;
        this.correctTranslation = correctTranslation;
        this.otherOptions = otherOptions;
    }

    renderQuestion(){
        let allOptions = this.otherOptions.slice();
        allOptions.push(this.correctTranslation);
        const shuffledOptions = this.shuffleArray(allOptions);
        return (
            <div>
                <h2>this.wordToTranslate</h2>
                {shuffledOptions.map(word => <button>{word}</button>)}
            </div>
        )
    }

    shuffleArray(a : Array<string>) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}