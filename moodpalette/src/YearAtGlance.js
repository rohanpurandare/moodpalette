import { useEffect, useRef } from "react";
import data from './calendar-data-source.json'

function App() {
    const canvasRef = useRef();
  
    const drawRectangle = () => {
        const context = canvasRef.current.getContext("2d");
        const validDays = data.calendarDataSource.percentData;
        let count = 0
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 53; j++) {
                var n = (Math.random() * 0xfffff * 1000000).toString(16);
                if (validDays[j][i] === null) {
                    n = (0xffffff).toString(16);
                    count--;
                }
                count++;
                context.fillStyle = "#" + n.slice(0, 6);
                context.fillRect(j*24.46+42, i*25.07+20, 24.67, 25.07);
                context.strokeStyle = '#ffffff';
                context.lineWidth = 1.2;
                context.strokeRect(j*24.46+42, i*25.07+20, 24.67, 25.07);
            }
        }
        console.log(count);
    };

    // write a text
    const writeText = (info, style = {}) => {
        const context = canvasRef.current.getContext("2d");
        const { text, x, y } = info;
        const { fontSize = 12, fontFamily = 'Times', color = 'black', textAlign = 'right', textBaseline = 'top' } = style;        
    
        context.beginPath();
        context.font = fontSize + 'px ' + fontFamily;
        context.textAlign = textAlign;
        context.textBaseline = textBaseline;
        context.fillStyle = color;
        context.fillText(text, x, y);
        context.stroke();
    };
  
    useEffect(() => {
        writeText({ text: 'Sun', x: 30, y: 25 });
        writeText({ text: 'Mon', x: 30, y: 51 });
        writeText({ text: 'Tue', x: 30, y: 75 });
        writeText({ text: 'Wed', x: 30, y: 99 });
        writeText({ text: 'Thu', x: 30, y: 123 });
        writeText({ text: 'Fri', x: 30, y: 147 });
        writeText({ text: 'Sat', x: 30, y: 171 });
        const monthTab = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 0; i < 12; i++) {
            var numDays = 6;
            for (let j = 0; j < i; j++) {
                numDays += monthTab[j];
            }
            var numWeeks = Math.floor(numDays/7);
            console.log(numWeeks);
            writeText({ text: monthNames[i], x: 60 + (numWeeks * 24.5), y: 0})
        }
        drawRectangle();
    }, []);
  
    return (
        <div>
            <canvas
            ref={canvasRef}
            height={200}
            width={1500}
            />
        </div>
    );
}
  
  export default App;