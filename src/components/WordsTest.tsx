import React from 'react';

export class WordsTest extends React.Component<any,any> {
    constructor(props: any){
        super(props);    
        this.state = {
            currentQuestionIndex: 0,
            testResults: new TestResults(this.props.questions.length)
        }      
    }

    render(){
        if (!this.props || !this.props.questions || !this.state){
            return(
                <div>
                    Loading...
                </div>
            );
        }
        if (this.state.currentQuestionIndex >= this.props.questions.length){
            this.props.onTestEnd(this.state.testResults);
            return(<div>Done!</div>);
        }

        let currentQuestion = this.props.questions[this.state.currentQuestionIndex];
        return(
            <div>
                <div className="test-question">
                    {currentQuestion.renderQuestion((word :string) => this.answerQuestion(word))}
                </div>
                <button onClick={() => this.props.onTestEnd(this.state.testResults)}>End test</button>
            </div>
        )
    }
    
    answerQuestion(word: string){
        const isCorrectAnswer = this.props.questions[this.state.currentQuestionIndex].isCorrectAnswer(word);
        isCorrectAnswer ? console.log("Correct!") : console.log("wrong!");
        this.state.testResults.addAnswerStats(isCorrectAnswer, word);

        if (isCorrectAnswer){
            this.setState({currentQuestionIndex: this.state.currentQuestionIndex + 1}); // advance to next question      
        }        
    }
}

export class TestResults{
    wordsWithCorrectAnswers: Array<string>;
    wordsWithWrongAnswer: Array<string>;
    totalNumberOfQuestions: number;
    practiceDate: Date;

    constructor(totalNumberOfQuestions: number){
        this.wordsWithCorrectAnswers = [];
        this.wordsWithWrongAnswer = [];
        this.totalNumberOfQuestions = totalNumberOfQuestions;
        this.practiceDate = new Date();
    }

    addAnswerStats = (isCorrectAnswer :boolean, word: string) => 
    {
        isCorrectAnswer ?
            this.wordsWithCorrectAnswers.push(word) :
            this.wordsWithWrongAnswer.push(word);        
    }
        
    
}