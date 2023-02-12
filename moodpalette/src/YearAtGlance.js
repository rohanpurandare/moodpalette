import React from 'react';
import './index.css'
// Import the calendarheatmap
import CalendarHeatmap from 'react-calendar-heatmap';

export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            // Some dates to render in the heatmap
            values: [
                { date: '2023-01-01' },
                { date: '2023-01-15' },
                { date: '2023-01-04' },
                { date: '2023-01-21' },
                { date: '2023-01-30' },
                { date: '2023-01-06' },
                { date: '2023-01-08' }
            ],
            // How many days should be shown
            numDays: 366,
            weekdayLabels: true
        }

        this.onClick = this.onClick.bind(this);
        this.state.values[3].style = {fill: 'blue'};
    }
 
    onClick(value) {
        console.log(value);
    }

    render() {
        return (
            <div style={{width: 800}}>
                <CalendarHeatmap
                    startDate={new Date('2022-12-31')}
                    endDate={new Date('2024-01-01')}
                    numDays={this.state.numDays}
                    values={this.state.values}
                    weekdayLabels={this.state.weekdayLabels}
                    classForValue={(value) => ''}
                    onClick={this.onClick}
                />
            </div>
        );
    }
}