import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

function ColorPicker() {
  const [color, setColor] = useState('#000000');

  const handleChange = (newColor) => {
    setColor(newColor.hex);
  };

  return (
    <div>
      <CirclePicker
        color={color}
        onChange={handleChange}
        width="300px"
        circleSize={64}
        circleSpacing={10}
      />
      <p>You selected: {color}</p>
    </div>
  );
}

export default ColorPicker;
