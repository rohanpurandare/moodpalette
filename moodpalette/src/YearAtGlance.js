import { useEffect, useRef } from "react";
import data from './calendar-data-source.json'

function App() {
    const canvasRef = useRef();
  
    const drawRectangle = () => {
        const context = canvasRef.current.getContext("2d");
        const validDays = data.calendarDataSource.percentData;
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 53; j++) {
                var n = (Math.random() * 0xfffff * 1000000).toString(16);
                if (validDays[j][i] === null) {
                    n = (0xffffff).toString(16);
                }
                context.fillStyle = "#" + n.slice(0, 6);
                context.fillRect(j*25, i*25, 24, 24);
            }
        }
    };
  
    useEffect(() => {
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