// import React from 'react';
// import './index.css'
// // Import the calendarheatmap
// import CalendarHeatmap from 'react-calendar-heatmap';
// import onHover from './Hover';
// import { useRef } from 'react';

// export default class App extends React.Component {

//     constructor(props, context) {
//         super(props, context);
        
//         this.state = {
//             // Some dates to render in the heatmap
//             // Things to do:
//             //  - Only have 5 colors
//             //  - Take percentage of tasks completed
//             //  - 81-100% --> 5
//             //  - 61-80% --> 4
//             //  - 41-60% --> 3
//             //  - 21-40% --> 2
//             //  - 1-20% --> 1
//             values: [
//                 { date: '2023-01-01', count: 2 },
//                 { date: '2023-01-15', count: 1 },
//                 { date: '2023-01-04', count: 4 },
//                 { date: '2023-01-21', count: 3 },
//                 { date: '2023-01-30', count: 5 },
//                 { date: '2023-01-06', count: 1 },
//                 { date: '2023-01-08', count: 4 },
//                 { date: '2023-04-11', count: 4 },
//                 { date: '2023-08-21', count: 4 }
//             ],
//             // How many days should be shown
//             numDays: 366
//         }

//         this.onClick = this.onClick.bind(this);
//     }

//     onClick(value) {
//         console.log(value);
//     }

//     render() {
//         return (
//             <div style={{width: 1000}}>
//                 <CalendarHeatmap
//                     startDate={new Date('2022-12-31')}
//                     endDate={new Date('2024-01-01')}
//                     numDays={this.state.numDays}
//                     values={this.state.values}
//                     onClick={this.onClick}
//                     onMouseOver={(event, value) => {
//                         if (!value) {
//                             onHover(0)
//                             console.log('0% of habits completed');
//                         }
//                         else {
//                             onHover(value.count);
//                             console.log(((value.count - 1)*20 + 1) + "-" + value.count*20 + "% of habits completed")}
//                         }}
//                     classForValue={(value) => {
//                         if (!value) {
//                           return 'color-empty';
//                         }
//                         return `color-scale-${value.count}`;
//                       }}
                    
//                 />
//             </div>
//         );
//     }
// }

import * as React from "react";
import { HeatMapComponent, Legend, Tooltip, Inject } from '@syncfusion/ej2-react-heatmap';
import data from './calendar-data-source.json';
import { Internationalization } from "@syncfusion/ej2-base";
import './index.css';
/**
 * Calender HeatMap sample
 */
function CalendarHeatmap() {
    function tooltipTemplate(args) {
        console.log(args);
        var totals = data.calendarDataSource.totalData;
        let intl = new Internationalization();
        let format = intl.getDateFormat({ format: 'EEE MMM dd, yyyy' });
        let newDate = new Date(args.xValue);
        let date = new Date(newDate.getTime());
        let axisLabel = args.heatmap.axisCollections[1].axisLabels;
        let index = axisLabel.indexOf(args.yLabel);
        (date).setDate((date).getDate() + index);
        let value = format(date);
        console.log(date.getFullYear());
        const monthTab = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let month = date.getMonth();
        let day = date.getDate() - 1;
        let totalDay = 0;
        for (let i = 0; i < month; i++) {
            totalDay += monthTab[i];
        }
        totalDay += day;
        let week = (totalDay / 7).toFixed(0);
        args.content = [(args.value === 0 ? 'No' : (args.value*totals[week][index]).toFixed(0)) + ' ' + ' habits completed' + '<br>' + value];
    }
    ;
    function load(args) {
        let selectedTheme = window.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    }
    ;
    return (
        <div className='control-pane'>
            <div className='control-section'>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
            </style>
                <HeatMapComponent id='heatmap-container' titleSettings={{
            text: '',
            textStyle: {
                size: '15px',
                fontWeight: '500',
            }
        }} height={'270px'} width={'1350px'}xAxis={{
            opposedPosition: true,
            valueType: 'DateTime',
            minimum: new Date(2022, 12, 1),
            maximum: new Date(2023, 11, 31),
            intervalType: 'Days',
            showLabelOn: 'Months',
            labelFormat: 'MMM',
            increment: 7,
            labelIntersectAction: 'Rotate45',
        }} yAxis={{
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            isInversed: true,
        }} dataSource={data.calendarDataSource.percentData} cellSettings={{
            showLabel: false,
            border: { color: 'white' }
        }} tooltipRender={tooltipTemplate} paletteSettings={{
            palette: [{ value: 0, color: 'rgb(238,238,238)', label: '0% of habits completed' },
                { value: 0.01, color: 'rgb(150, 255, 150)', label: '1-20% of habits completed' },
                { value: 0.21, color: 'rgb(105, 216, 105)', label: '21-40% of habits completed' },
                { value: 0.41, color: 'rgb(75, 195, 75)', label: '41-60% of habits completed' },
                { value: 0.61, color: 'rgb(37, 156, 37)', label: '61-80% of habits completed' },
                { value: 0.81, color: 'rgb(0, 117, 0)', label: '81-100% of habits completed' },
            ],
            type: 'Fixed',
            emptyPointColor: 'white'
        }} load={load.bind(this)} legendSettings={{
            position: 'Bottom',
            width: '20%',
            alignment: 'Near',
            showLabel: true,
            labelDisplayType: 'None',
            enableSmartLegend: true
        }}>
                    <Inject services={[Legend, Tooltip]}/>
                </HeatMapComponent>
            </div>
        </div>);
}
export default CalendarHeatmap;