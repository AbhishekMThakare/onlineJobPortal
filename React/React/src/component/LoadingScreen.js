import React from 'react'

export default function LoadingScreen() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        opacity : 0.8,
        backgroundColor: 'azure',
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          class="spinner-border "
          style={{ width: "23rem", height: "23rem" }}
          role="status"
        ></div>
        <span>Sending Mail to Candidate Please Wait.......</span>
      </div>
    </div>
  );
}
