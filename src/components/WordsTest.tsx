import React from 'react';
import Button from 'react-bootstrap/Button';
import { TestQuestion } from './TestQuestion';
import { TestQuestionPresentation } from './TestQuestion2';

export interface WordsTestsProps{
    questions: Array<TestQuestion>;
    onTestEnd: (testResults: TestResults) => void
}

export interface WordsTestState{
    currentQuestionIndex: number,
    testResults: TestResults
    currentQuestion: TestQuestion
}

export class WordsTest extends React.Component<WordsTestsProps,WordsTestState> {
    constructor(props: any){
        super(props);
        this.state = {
            currentQuestionIndex: 0,
            testResults: new TestResults(this.props.questions.length),
            currentQuestion: this.props.questions[0]
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

        return(
            <div className="words-test">
                <div className="words-test-question">
                   <TestQuestionPresentation 
                        answerQuestionFunc={(word :string) => this.answerQuestion(word)}
                        testQuestion={this.state.currentQuestion}>
                    </TestQuestionPresentation> 
                </div>
                <Button variant="outline-primary" onClick={() => this.props.onTestEnd(this.state.testResults)}>End test</Button>
            </div>
        )
    }
    
    answerQuestion(word: string){
        const isCorrectAnswer = this.props.questions[this.state.currentQuestionIndex].isCorrectAnswer(word);
        isCorrectAnswer ? console.log("Correct!") : console.log("wrong!");
        this.state.testResults.addAnswerStats(isCorrectAnswer, word);

        if (isCorrectAnswer){
            const currentQuestionIndex = this.state.currentQuestionIndex + 1
            const currentQuestion = this.props.questions[currentQuestionIndex];
            this.setState({
                currentQuestionIndex,
                currentQuestion
            }); // advance to next question      
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