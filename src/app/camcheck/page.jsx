'use client';
import React from 'react';
import Script from 'next/script';
import Image from 'next/image';
import {
  onIncreaseScoreThreshold,
  onDecreaseScoreThreshold,
  onDecreaseMinConfidence,
  onIncreaseMinConfidence,
} from '@/utils/faceDetectionControls';
import {
  loadImageFromUrl,
  loadImageFromUpload,
} from '@/utils/imageSelectionControls';

const page = () => {
  const handleScriptError = () => {
    console.log('error');
  };
  const handleAllScriptsLoaded = () => {
    console.log('error on handleAllScriptsLoaded');
  };
  return (
    <div>
      <Script
        src="https://code.jquery.com/jquery-2.1.1.min.js"
        strategy="beforeInteractive"
        onError={handleScriptError}
      />

      {/* Load Materialize after jQuery */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"
        strategy="afterInteractive"
        onError={handleScriptError}
      />

      {/* Load face-api.js and other custom scripts */}
      {/* <Script
        src="/js/face-api.js"
        strategy="afterInteractive"
        onError={handleScriptError}
      /> */}
      <Script
        src="@/utils/faceDetectionControls"
        strategy="afterInteractive"
        onError={handleScriptError}
      />
      <Script
        src="@/utils/faceDetectionControls.js"
        strategy="afterInteractive"
        onError={handleScriptError}
      />
      <Script
        src="@/utils/imageSelectionControls.js"
        strategy="afterInteractive"
        onError={handleScriptError}
      />
      <Script
        src="@/utils/bbt.js"
        strategy="afterInteractive"
        onError={handleScriptError}
        onLoad={handleAllScriptsLoaded}
      />

      <div className="center-content page-container">
        <div className="progress" id="loader">
          <div className="indeterminate"></div>
        </div>
        <div style={{ position: 'relative' }} className="margin">
          <Image
            id="inputImg"
            src="/image1pp.png"
            alt="img"
            width={200}
            height={200}
            style={{ maxWidth: '800px' }}
          />
          <canvas id="overlay" />
        </div>

        <div className="row side-by-side">
          <div
            id="face_detector_selection_control"
            className="row input-field"
            style={{ marginRight: '20px' }}
          >
            <label>Select Face Detector</label>
          </div>

          <div id="image_selection_control"></div>
          <div id="selectList"></div>
          <button
            className="waves-effect waves-light btn"
            onClick={loadImageFromUrl}
          >
            Ok
          </button>
          <input
            id="queryImgUploadInput"
            type="file"
            className="waves-effect btn bold"
            onChange={loadImageFromUpload}
            accept=".jpg, .jpeg, .png"
          />
          <div id="image_selection_control"></div>
        </div>

        {/* <span id="tiny_face_detector_controls">
          <div className="row side-by-side">
            <div className="row input-field" style={{ marginRight: '20px' }}>
              <label>Input Size</label>
            </div>
            <div className="row">
=              <label>Score Threshold:</label>
              <input
                disabled
                value="0.5"
                id="scoreThreshold"
                type="text"
                className="bold"
              />
            </div>
            <button
              className="waves-effect waves-light btn"
              onClick={onDecreaseScoreThreshold}
            >
              <i className="material-icons left">-</i>
            </button>
            <button
              className="waves-effect waves-light btn"
              onClick={onIncreaseScoreThreshold}
            >
              <i className="material-icons left">+</i>
            </button>
          </div>
        </span> */}
      </div>
    </div>
  );
};

export default page;
