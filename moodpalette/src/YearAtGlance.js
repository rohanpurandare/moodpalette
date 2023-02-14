import { useEffect, useRef } from "react";

function App() {
    const canvasRef = useRef();
  
    const drawRectangle = () => {
      const context = canvasRef.current.getContext("2d");
      for (let i = 0; i < 365; i++) {
        var n = (Math.random() * 0xfffff * 1000000).toString(16);
        context.strokeStyle = "#" + n.slice(0, 6);;
        context.lineWidth = 2;
        context.strokeRect(i*2, 0, 2, 45);
      }
    };
  
    useEffect(() => {
      drawRectangle();
    }, []);
  
    return (
  <div>
    <canvas
      ref={canvasRef}
      style={{
        width: "730px",
        height: "400px",
        background: "url('./bg-img.jpg')",
      }}
    />
  </div>
    );
  }
  
  export default App;