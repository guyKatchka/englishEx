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
        return (
            <div>
                <h2>
                    Hello progress
                </h2>
                <div>
                    {stringifiedTestResults}
                </div>                
                <Button 
                    variant="outline-primary"
                    onClick={() => this.props.onBackClick()}>
                        חזור
                </Button>
            </div>
        )
    }
}