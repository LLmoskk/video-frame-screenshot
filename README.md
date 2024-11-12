# 视频帧捕获工具

获取视频某一帧的截图

## 安装

```bash
  npm install video-frame-screenshot
```

## 使用方法/示例

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

## API 参考

#### TS 类型

```typeScript
  type FrameCaptureResult = { blob: Blob; url: string } | null;
```

#### `captureFrame(file: File, time: number = 0): Promise<FrameCaptureResult>`

从指定的视频文件中捕获指定时间的帧。

| 参数   | 类型     | 描述                                                         |
| :----- | :------- | :----------------------------------------------------------- |
| `file` | `File`   | **必选** 视频文件（例如 `.mp4`、`.webm` 等），用于从中捕获帧 |
| `time` | `number` | 指定捕获帧的时间（秒）。默认为 `0`（视频开始时）             |

#### `captureFrameAtTimeRange(file: File, startTime: number, endTime: number): Promise<FrameCaptureResult | null>`

在指定的时间范围内捕获视频的某一帧。如果视频的当前时间超出了 `endTime`，则返回 `null`。

| 参数        | 类型     | 描述                                                         |
| :---------- | :------- | :----------------------------------------------------------- |
| `file`      | `File`   | **必选** 视频文件（例如 `.mp4`、`.webm` 等），用于从中捕获帧 |
| `startTime` | `number` | **必选** 开始时间（秒），从该时间开始捕获帧                  |
| `endTime`   | `number` | **必选** 结束时间（秒），在该时间点捕获停止                  |

#### `downloadFrame(frame: FrameCaptureResult, filename: string = 'frame.png'): void`

将捕获的帧下载为图像文件。

| 参数       | 类型                 | 描述                                                         |
| :--------- | :------------------- | :----------------------------------------------------------- |
| `frame`    | `FrameCaptureResult` | **必选** 视频文件（例如 `.mp4`、`.webm` 等），用于从中捕获帧 |
| `filename` | `string`             | 下载的文件名（默认为 `frame.png`）                           |
