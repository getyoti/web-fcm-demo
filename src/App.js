import FaceCapture from "@getyoti/react-face-capture";
import React, { useState } from "react";
import { Api } from "./api/api";
import RadioButtons from "./components/RadioButtons";
import SecureField from "./components/SecureField";
import * as styles from './App.module.css'
import ZoomEffect from "./components/ZoomEffect";
import classNames from 'classnames';

const service = new Api();
const assuranceLevels = ["low", "medium", "high"];

const App = () => {
  const [image, setImage] = useState();
  const [levelOfAssurance, setLevelOfAssurance] = useState("");
  const [secureFlag, setSecureFlag] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const onSuccess = (payload, base64PreviewImage) => {
    setImage(base64PreviewImage);
    service
      .predict({
        ...payload,
        level_of_assurance: levelOfAssurance || undefined,
      })
      .then((res) => setResponse(JSON.stringify(res.data, null, 2)))
      .catch((err) => {
        setError(true);
        const errorMessage = err.response.data;
        setResponse(
          typeof errorMessage === "object" && errorMessage !== null
            ? JSON.stringify(errorMessage, null, 2)
            : errorMessage
        );
      });
  };
  const onError = (error) => console.log("Error =", error);

  const onLevelOfAssuranceChange = (event) => {
    if (event.target.value) {
      setLevelOfAssurance(
        event.target.value !== levelOfAssurance ? event.target.value : ""
      );
    }
  };

  const reset = () => {
    setImage(undefined);
    setResponse(undefined);
    setError(undefined);
  };

  return (
    <div className={styles.scanContainer}>
      {!image ? (
        <div className={styles.scanContainer}>
          <div className={styles.faceCaptureWrapper}>
            <FaceCapture
              onSuccess={onSuccess}
              onError={onError}
              secure={secureFlag}
              clientSdkId={process.env.SDK_ID}
              returnPreviewImage={true}
            />
          </div>
          <div
            className={styles.optionsDiv}
          >
            <SecureField
              currentValue={secureFlag}
              onChange={setSecureFlag}
            />
            <RadioButtons
              label="Level of assurance"
              currentValue={levelOfAssurance}
              values={assuranceLevels}
              onClick={onLevelOfAssuranceChange}
            />
          </div>
        </div>
      ) : (
        <div className={styles.imgContainer}>
          <ZoomEffect in={!!image}>
            <img
              className={styles.img}
              src={image}
              alt="Face Capture Module"
            />
          </ZoomEffect>
          <div
            className={classNames(styles.response, {
              [styles.error]: error,
            })}
          >
            {response ? (
              <>
                <span
                  className={classNames(styles.responseTitle, {
                    [styles.responseTitleError]: error,
                  })}
                >
                  {error ? "Error" : "Response"}:
                </span>
                <pre>{response}</pre>
              </>
            ) : (
              <div>
                <div className={styles.loader} />
              </div>
            )}
          </div>
          <button
            className={styles.restartButton}
            onClick={reset}
          >
            Restart
            <svg viewBox="0 0 24 24">
              <path d="M12 6V1l-7 7 7 7V9c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
