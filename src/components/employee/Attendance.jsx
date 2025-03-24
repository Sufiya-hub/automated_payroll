'use client';
import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import * as faceapi from 'face-api.js';
import { IoClose } from 'react-icons/io5';
import Spinner from '../Spinner';

const Attendance = ({ imageName, setAttendanceDialog, attendanceDialog }) => {
  const refImgRef = useRef(null);
  const refCanvasRef = useRef(null);
  const videoRef = useRef(null);
  const webcamCanvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [imageSrc, setImageSrc] = useState(`/employees/${imageName}`);
  const [matchResult, setMatchResult] = useState(null);
  const intervalRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Load Face API Models
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

    setLoading(false);
  };

  // Handle Image Load
  useEffect(() => {
    // console.log('ref:', refImgRef.current);
    if (!modelsLoaded || !refImgRef.current) return;

    console.log('loading started');

    handleImageLoad();
  }, [modelsLoaded]);

  // Start Webcam
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

  // Face Matching Logic
  useEffect(() => {
    if (!faceMatcher) return;
    startWebcam();

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
      console.log('match Result:', bestMatch.label);
      if (bestMatch.label !== 'unknown') {
        // console.log('matches ga');
        setAttendanceDialog(false);
        await fetch('/api/attendance', {
          method: 'PATCH',
        });
      }
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [faceMatcher]);

  // Cleanup Webcam on Unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      {attendanceDialog && (
        <div
          className={`${
            !attendanceDialog && 'hidden'
          } bg-black/60 h-full flex items-center justify-center absolute w-full inset-0`}
        >
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
            strategy="afterInteractive"
            onError={() => console.log('Error loading Materialize')}
          />
          <div className="h-5/6 w-2/5 bg-white rounded-lg p-4 overflow-hidden">
            <div className="flex justify-end w-full">
              <button
                onClick={() => {
                  setAttendanceDialog(false);
                }}
              >
                <IoClose size={24} />
              </button>
            </div>
            {loading && (
              <div className="flex items-center justify-center w-full">
                <Spinner />
              </div>
            )}

            <div style={{ position: 'relative' }} className="margin">
              <Image
                ref={refImgRef}
                id="refImg"
                src={imageSrc}
                alt="Uploaded Reference"
                width={200}
                height={200}
                onLoad={handleImageLoad}
                style={{ maxWidth: '800px', position: 'absolute', opacity: 0 }}
              />
              <canvas
                ref={refCanvasRef}
                className="overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  display: 'none',
                }}
              />
            </div>
            {!loading && (
              <div style={{ position: 'relative', marginTop: '20px' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  width="300"
                  height="300"
                  style={{ border: '1px solid black' }}
                  className="rounded-full"
                />
                <canvas
                  ref={webcamCanvasRef}
                  className="overlay"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </div>
            )}

            {matchResult && (
              <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg"
                style={{
                  backgroundColor:
                    matchResult === 'Faces Matched' ? 'green' : 'red',
                  color: 'white',
                }}
              >
                <p>{matchResult}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
