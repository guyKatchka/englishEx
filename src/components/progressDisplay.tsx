import React from 'react';
import Button from 'react-bootstrap/Button';
import { TestResults } from './WordsTest';

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
        const stringifiedTestResults = JSON.stringify(this.props.previousTestResults);

        const testResultsRendered = 
            this.props && 
            this.props.previousTestResults &&
            this.props.previousTestResults.map(testResult => this.getRenderedTestResult(testResult));
        return (
            <div>
                <h2>
                    Hello progress
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

    getRenderedTestResult = (testResult: TestResults) => {
        return(
        <div key={testResult.practiceDate.toString()}>
            <h2>{testResult.practiceDate}</h2>
            <h3>מילים ללא טעות</h3>
            <span>
                {testResult.wordsWithCorrectAnswers.join(",")}
            </span>
            <h3>מילים שטעית בהן</h3>
            <ul>
                TODO
            </ul>
        </div>
        )
    }
}