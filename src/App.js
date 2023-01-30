import FaceCapture from "@getyoti/react-face-capture";
import "@getyoti/react-face-capture/index.css";
import React, { useState } from "react";

const App = () => {
  const [image, setImage] = useState();
  const [error, setError] = useState();

  const onSuccess = ({ img }) => {
    setImage(img);
  };

  const reload = () => {
    setImage(undefined);
    setError(undefined);
  };

  return (
    <div style={{ width: 700 }}>
      {error && <span>ERROR: {error}</span>}
      {!image && (
        <FaceCapture onSuccess={onSuccess} onError={setError} secure={true} />
      )}
      {image && (
        <img width={700} src={image} alt="Face Capture Module Result" />
      )}
      {(error || image) && <button onClick={reload}>Back</button>}
    </div>
  );
};

export default App;
