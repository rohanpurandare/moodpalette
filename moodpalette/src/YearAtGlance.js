import { useEffect, useRef } from "react";

function App() {
    const canvasRef = useRef();
  
    const drawRectangle = () => {
        const context = canvasRef.current.getContext("2d");
        
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 54; j++) {
                var n = (Math.random() * 0xfffff * 1000000).toString(16);
                context.fillStyle = "#" + n.slice(0, 6);
                context.fillRect(j*18.5, i*18.5, 17, 17);
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
            height={400}
            width={1000}
            />
        </div>
    );
}
  
  export default App;