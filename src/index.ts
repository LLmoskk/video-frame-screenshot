type FrameCaptureResult = { blob: Blob; url: string } | null;

const captureVideoFrame = (
  video: HTMLVideoElement
): Promise<FrameCaptureResult> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Failed to get canvas context');
    return Promise.resolve(null);
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  return new Promise<FrameCaptureResult>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve({ blob, url: URL.createObjectURL(blob) });
      } else {
        console.error('blob failed');
        resolve(null);
      }
    });
  });
};

const captureFrame = (file: File, time = 0): Promise<FrameCaptureResult> => {
  const video = document.createElement('video');
  video.src = URL.createObjectURL(file);
  video.currentTime = time;
  video.muted = true;
  video.autoplay = true;

  return new Promise<FrameCaptureResult>((resolve) => {
    video.oncanplay = async () => {
      const frame = await captureVideoFrame(video);
      resolve(frame);
    };
  });
};

const captureFrameAtTimeRange = async (
  file: File,
  startTime: number,
  endTime: number
): Promise<FrameCaptureResult | null> => {
  const video = document.createElement('video');
  video.src = URL.createObjectURL(file);
  video.currentTime = startTime;
  video.muted = true;
  video.autoplay = true;

  return new Promise<FrameCaptureResult>((resolve) => {
    video.oncanplay = async () => {
      if (video.currentTime >= endTime) {
        resolve(null);
      } else {
        const result = await captureVideoFrame(video);
        resolve(result);
      }
    };
  });
};

const downloadFrame = (
  frame: FrameCaptureResult,
  filename = 'frame.png'
): void => {
  if (frame && frame.url) {
    const a = document.createElement('a');
    a.href = frame.url;
    a.download = filename;
    a.click();
  } else {
    console.error('No frame to download');
  }
};

export { captureFrame, captureFrameAtTimeRange, downloadFrame };
