import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'
import { TestResults } from './WordsTest';
import './ProgressDisplay.css';

export interface ProgressDisplayProps{
    onBackClick: () => void;
    previousTestResults: Array<TestResults>;
}

export class ProgressDisplay extends React.Component<ProgressDisplayProps,any> {
    constructor(props: any){
        super(props);
        this.state = {};
    }

    render(){
        const testResultsRendered = 
            this.props && 
            this.props.previousTestResults &&
            this.props.previousTestResults.map((testResult, index) => this.getRenderedTestResult(testResult, index));
        return (
            <div>
                <h2>
                    תרגולים קודמים
                </h2>
                <div>
                    {testResultsRendered}
                </div>                
                <Button 
                    variant="outline-primary"
                    onClick={() => this.props.onBackClick()}>
                        חזור
                </Button>
            </div>
        )
    }    

    getRenderedTestResult = (testResult: TestResults, index: number) => {
        const dateFormatOptions = {
            hour12 : true,
            hour:  "2-digit",
            minute: "2-digit",
        };
        return(
        <div key={testResult.practiceDate.toString()}>
            <Accordion>
                <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
                    {new Date(testResult.practiceDate).toLocaleDateString("en-us", dateFormatOptions)}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index.toString()}>
                    <div className="progress-display-details-container">
                        <div>
                            <span className="progress-display-correct-words-title">
                                תשובות נכונות:  
                            </span>
                            <span className="progress-display-correct-words-list">
                                {testResult.wordsWithCorrectAnswers.join(",")}
                            </span>
                        </div>
                        <div>
                            <span className="progress-display-correct-words-title">
                                מילים לא נכונות: 
                            </span>
                            <span className="progress-display-wrong-words-list">
                                {testResult.wordsWithWrongAnswer.join(",")}
                            </span>
                        </div>
                    </div>                            
                </Accordion.Collapse>  
            </Accordion>                      
        </div>
        )
    }
}