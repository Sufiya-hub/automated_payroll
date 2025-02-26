'use client';
import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import * as faceapi from 'face-api.js';

const Page = () => {
  const refImgRef = useRef(null);
  const refCanvasRef = useRef(null);
  const videoRef = useRef(null);
  const webcamCanvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [imageSrc, setImageSrc] = useState('/girl.jpg'); // Default reference image
  const [matchResult, setMatchResult] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        ]);
        console.log('Models Loaded');
        setModelsLoaded(true);
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    if (typeof window !== 'undefined') {
      loadModels();
    }
  }, []);

  const handleImageLoad = async () => {
    if (!modelsLoaded || !refImgRef.current || !refCanvasRef.current) {
      console.log('Models not loaded yet!');
      return;
    }

    const img = refImgRef.current;
    const canvas = refCanvasRef.current;

    canvas.width = img.width;
    canvas.height = img.height;

    const fullFaceDescriptions = await faceapi
      .detectAllFaces(img, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (!fullFaceDescriptions.length) {
      console.log('No face detected in reference image');
      return;
    }

    console.log('Reference Image Detections:', fullFaceDescriptions);

    // Create a new FaceMatcher and update state
    setFaceMatcher(new faceapi.FaceMatcher(fullFaceDescriptions));

    // Draw bounding box
    faceapi.matchDimensions(canvas, img);
    const resizedResults = faceapi.resizeResults(fullFaceDescriptions, img);
    resizedResults.forEach(({ detection }) => {
      const drawBox = new faceapi.draw.DrawBox(detection.box, {
        label: 'Reference',
      });
      drawBox.draw(canvas);
    });
  };

  const uploadRefImage = async (e) => {
    const imgFile = e.target.files?.[0];
    if (!imgFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result); // Set new image source
    };
    reader.readAsDataURL(imgFile);
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const startFaceMatching = () => {
    if (!faceMatcher) {
      console.log('FaceMatcher is not set yet.');
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || !faceMatcher) return;

      const video = videoRef.current;
      const canvas = webcamCanvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const detections = await faceapi
        .detectAllFaces(canvas, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (!detections.length) {
        console.log('No face detected in webcam');
        setMatchResult('No Face Detected');
        return;
      }

      const bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);
      console.log('Face Match Result:', bestMatch);

      setMatchResult(
        bestMatch.label === 'unknown' ? 'No Match Found' : 'Faces Matched'
      );
    }, 3000); // Checks every 3 seconds
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (faceMatcher) {
      startFaceMatching();
    }
  }, [faceMatcher]); // Runs when faceMatcher updates

  return (
    <div>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
        strategy="afterInteractive"
        onError={() => console.log('Error loading Materialize')}
      />

      <div className="center-content page-container">
        <p>Upload Reference Image:</p>
        <input type="file" accept="image/*" onChange={uploadRefImage} />

        <div style={{ position: 'relative' }} className="margin">
          <Image
            ref={refImgRef}
            id="refImg"
            src={imageSrc}
            alt="Uploaded Reference"
            width={200}
            height={200}
            onLoad={handleImageLoad}
            style={{ maxWidth: '800px' }}
          />
          <canvas
            ref={refCanvasRef}
            className="overlay"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>

        <button
          onClick={startWebcam}
          style={{ marginTop: '10px', padding: '10px' }}
        >
          Start Webcam
        </button>

        <div style={{ position: 'relative', marginTop: '20px' }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            width="300"
            height="300"
            style={{ border: '1px solid black' }}
          />
          <canvas
            ref={webcamCanvasRef}
            className="overlay"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>

        {matchResult && (
          <div
            id="match-modal"
            className="modal"
            style={{
              display: 'block',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor:
                matchResult === 'Faces Matched' ? 'green' : 'red',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              zIndex: 1000,
            }}
          >
            <p>{matchResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
