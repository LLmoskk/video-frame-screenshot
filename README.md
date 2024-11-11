# 视频帧捕获工具

## 函数说明

```typescript
type FrameCaptureResult = { blob: Blob; url: string } | null;
```

### `captureFrame(file: File, time: number = 0): Promise<FrameCaptureResult>`
从指定的视频文件中捕获指定时间的帧。

- **参数**：
  - `file`：视频文件（例如 `.mp4`、`.webm` 等），用于从中捕获帧。
  - `time`：指定捕获帧的时间（秒）。默认为 `0`（视频开始时）。

- **返回值**：返回一个 `Promise`，解析为 `FrameCaptureResult` 对象，包含 `blob` 和 `url`（如果捕获失败则为 `null`）。

### `captureFrameAtTimeRange(file: File, startTime: number, endTime: number): Promise<FrameCaptureResult | null>`
在指定的时间范围内捕获视频的某一帧。如果视频的当前时间超出了 `endTime`，则返回 `null`。

- **参数**：
  - `file`：视频文件，从中捕获帧。
  - `startTime`：开始时间（秒），从该时间开始捕获帧。
  - `endTime`：结束时间（秒），在该时间点捕获停止。

- **返回值**：返回一个 `Promise`，解析为 `FrameCaptureResult` 对象（如果没有捕获到帧，则返回 `null`）。

### `downloadFrame(frame: FrameCaptureResult, filename: string = 'frame.png'): void`
将捕获的帧下载为图像文件。

- **参数**：
  - `frame`：包含 `blob` 和 `url` 的帧对象 (`FrameCaptureResult`)。
  - `filename`：下载的文件名（默认为 `frame.png`）。

- **返回值**：触发下载，保存为指定的图片文件。
