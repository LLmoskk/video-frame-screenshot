import { useState } from 'react';
import { captureFrame } from '../src';

const App = () => {
  const [frames, setFrames] = useState<string[]>([]);

  const handleInputOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newFrames: string[] = [];

    for (let i = 0; i < 10; i++) {
      const frame = await captureFrame(file, i * 1);
      if (frame) {
        newFrames.push(frame.url);
      }
    }

    setFrames(newFrames);
  };

  return (
    <div>
      <input type='file' onChange={handleInputOnChange} />
      <div>
        {frames.map((url, index) => (
          <img key={index} src={url} alt={`frame-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default App;
