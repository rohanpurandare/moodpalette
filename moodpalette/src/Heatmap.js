import React from 'react';
import './index.css'
// Import the calendarheatmap
import CalendarHeatmap from 'react-calendar-heatmap';

export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            // Some dates to render in the heatmap
            // Things to do:
            //  - Only have 5 colors
            //  - Take percentage of tasks completed
            //  - 81-100% --> 5
            //  - 61-80% --> 4
            //  - 41-60% --> 3
            //  - 21-40% --> 2
            //  - 1-20% --> 1
            values: [
                { date: '2023-01-01', count: 2 },
                { date: '2023-01-15', count: 1 },
                { date: '2023-01-04', count: 4 },
                { date: '2023-01-21', count: 3 },
                { date: '2023-01-30', count: 5 },
                { date: '2023-01-06', count: 1 },
                { date: '2023-01-08', count: 4 },
                { date: '2023-04-11', count: 4 },
                { date: '2023-08-21', count: 4 }
            ],
            // How many days should be shown
            numDays: 366
        }

        this.onClick = this.onClick.bind(this);
    }
 
    onClick(value) {
        console.log(value);
    }

    render() {
        return (
            <div style={{width: 1000}}>
                <CalendarHeatmap
                    startDate={new Date('2022-12-31')}
                    endDate={new Date('2024-01-01')}
                    numDays={this.state.numDays}
                    values={this.state.values}
                    onClick={this.onClick}
                    onMouseOver={(event, value) => {
                        if (!value) {
                            console.log('0% of habits completed');
                        }
                        else {
                            console.log(((value.count - 1)*20 + 1) + "-" + value.count*20 + "% of habits completed")}
                        }}
                    classForValue={(value) => {
                        if (!value) {
                          return 'color-empty';
                        }
                        return `color-scale-${value.count}`;
                      }}
                    
                />
            </div>
        );
    }
}