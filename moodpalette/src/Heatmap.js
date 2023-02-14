// import React from 'react';
// import './index.css'
// import CalHeatmap from 'cal-heatmap';

// export default class App extends CalHeatmap{
//     const cal: CalHeatmap = new CalHeatmap();
//     cal.paint(
//     {
//         data: {
//         source: '../fixtures/seattle-weather.csv',
//         type: 'csv',
//         x: 'date',
//         y: 'wind',
//         groupY: 'max',
//         },
//         date: { start: new Date('2012-01-01') },
//         range: 8,
//         scale: { type: 'linear', scheme: 'Oranges', domain: [0, 8] },
//         domain: {
//         type: 'month',
//         },
//         subDomain: { type: 'day', radius: 2 },
//         itemSelector: '#ex-wind',
//     },
//     [
//         [
//         Tooltip,
//         {
//             text: function (date, value, dayjsDate) {
//             return (
//                 (value ? value + 'km/h' : 'No data') +
//                 ' on ' +
//                 dayjsDate.format('LL')
//             );
//             },
//         },
//         ],
//     ]
//     );

//     render(
//     <div>
//         <div id="ex-wind"></div>
//         <a
//         className="button button--sm button--secondary"
//         href="#"
//         onClick={e => {
//             e.preventDefault();
//             cal.previous();
//         }}
//         >
//         ← Previous
//         </a>
//         <a
//         className="button button--sm button--secondary margin-left--xs"
//         href="#"
//         onClick={e => {
//             e.preventDefault();
//             cal.next();
//         }}
//         >
//         Next →
//         </a>
//     </div>
//     );
// }

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
            <div style={{width: 730}}>
                <CalendarHeatmap
                    startDate={new Date('2022-12-31')}
                    endDate={new Date('2024-01-01')}
                    numDays={this.state.numDays}
                    values={this.state.values}
                    classForValue={(value) => {
                        if (!value) {
                          return 'color-empty';
                        }
                        return `color-scale-${value.count}`;
                      }}
                    onClick={this.onClick}
                />
            </div>
        );
    }
}