## Video Streaming App

[Video Streaming App - Geeks for Geeks](https://www.geeksforgeeks.org/how-to-build-video-streaming-application-using-node-js/)


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Video Player</title>
</head>
<body>
        <!-- with streaming -->
    <video src="/videoplayer" width="1080px" 
           controls></video>
           <!-- without streaming -->
    <!-- <video src="/videoplayer" width="1080px" 
           controls></video> -->
</body>
</html>
```

```js
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

app.get('/', (req, res) => {  
  res.sendFile(path.resolve('index.html'));
}); 

app.get('/videoplayer', (req, res) => {
  const range = req.headers.range
  const videoPath = './video.mp4';
  const videoSize = fs.statSync(videoPath).size
  const chunkSize = 1 * 1e6; // 1MB
  console.log(chunkSize);
  const start = Number(range.replace(/\D/g, ""))
  const end = Math.min(start + chunkSize, videoSize - 1)
  const contentLength = end - start + 1;
  const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4"
  }
  res.writeHead(206, headers)
  const stream = fs.createReadStream(videoPath, {
      start,
      end
  })
  stream.pipe(res)
});


// Without Streaming
app.get('/video', (req, res) => {
  const filePath = path.resolve('video.mp4'); // Path to your video file

// Read the entire video file into memory
fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // `data` contains the video file content as a Buffer
  console.log('Video file read successfully.');
  console.log(`File size: ${data.length} bytes`);
  
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Length', data.length);
  res.send(data);
   
  });

})
app.listen(3000, () => {
  console.log('Server started on port 3000');
}); 

```