# Video Frame Capture Tool

A tool for capturing screenshots from specific frames of a video

## Installation

```bash
  npm install video-frame-screenshot
```

## Usage/Examples

```react
import { useState } from 'react';
import { captureFrame } from 'video-frame-screenshot'

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
```

## API Reference

#### TS Types

```typeScript
  type FrameCaptureResult = { blob: Blob; url: string } | null;
```

#### `captureFrame(file: File, time: number = 0): Promise<FrameCaptureResult>`

Captures a frame from a video file at a specified time.

| Parameter | Type     | Description                                                  |
| :-------- | :------- | :----------------------------------------------------------- |
| `file`    | `File`   | **Required** Video file (e.g., `.mp4`) to capture frame from |
| `time`    | `number` | Time in seconds to capture the frame. Defaults to `0` (start of video) |

#### `captureFrameAtTimeRange(file: File, startTime: number, endTime: number): Promise<FrameCaptureResult | null>`

Captures a frame from a video within a specified time range. Returns `null` if the current video time exceeds `endTime`.

| Parameter   | Type     | Description                                                  |
| :---------- | :------- | :----------------------------------------------------------- |
| `file`      | `File`   | **Required** Video file (e.g., `.mp4`) to capture frame from |
| `startTime` | `number` | **Required** Start time in seconds to begin frame capture     |
| `endTime`   | `number` | **Required** End time in seconds where capture stops          |

#### `downloadFrame(frame: FrameCaptureResult, filename: string = 'frame.png'): void`

Downloads the captured frame as an image file.

| Parameter  | Type                 | Description                                                  |
| :--------- | :------------------- | :----------------------------------------------------------- |
| `frame`    | `FrameCaptureResult` | **Required** The captured frame result to download           |
| `filename` | `string`             | Filename for the downloaded file (defaults to `frame.png`)    |
