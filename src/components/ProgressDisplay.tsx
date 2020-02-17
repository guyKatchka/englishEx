import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'
import { TestResults } from './WordsTest';
import './ProgressDisplay.css';
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartArea,
    ChartSeriesLabels,
  } from '@progress/kendo-react-charts';

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
                
                <Button 
                    variant="outline-primary"
                    onClick={() => this.props.onBackClick()}>
                        חזור
                </Button>
                
                <div className="test-results-list">
                    {testResultsRendered}
                </div>                
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
        <div key={testResult.practiceDate.toString()} >
            <Accordion>
                <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
                    <div className="progress-item">
                        {this.ChartContainer(testResult)}
                        {new Date(testResult.practiceDate).toLocaleDateString("en-us", dateFormatOptions)}                        
                    </div>                    
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index.toString()}>
                    <div className="progress-display-details-container">
                        <div>
                            <span className="progress-display-correct-words-list">
                                {testResult.wordsWithCorrectAnswers.join(", ")}
                            </span>
                            <span className="progress-display-correct-words-title">
                                :תשובות נכונות
                            </span>                            
                        </div>
                        <div>
                            <span className="progress-display-wrong-words-list">
                                {testResult.wordsWithWrongAnswer.join(", ")}
                            </span>
                            <span className="progress-display-correct-words-title">
                                :מילים לא נכונות 
                            </span>                            
                        </div>
                    </div>                            
                </Accordion.Collapse>  
            </Accordion>                      
        </div>
        )
    }

    ChartContainer = (testResult: TestResults) => {

        let data = [
            { category: 'נכונות', value: testResult.wordsWithCorrectAnswers.length },
            { category: 'לא נכונות', value: testResult.wordsWithWrongAnswer.length },
            { category: 'לא נענו', value: testResult.totalNumberOfQuestions - (testResult.wordsWithWrongAnswer.length + testResult.wordsWithCorrectAnswers.length)}
        ]
        return (
        <Chart seriesColors={['green', 'red', 'gray']} style={
            { 
                width: 180, 
                height: 150,
                position: 'inherit'
            }}>
          <ChartArea background="transparent" />
          <ChartLegend position="left" />
          <ChartSeries>
            <ChartSeriesItem type="donut" data={data} field="value" categoryField="category" >
                <ChartSeriesLabels color="#fff" background="none" content={(d) => d.value} />
            </ChartSeriesItem>
          </ChartSeries>
        </Chart>
      );
    }
}
