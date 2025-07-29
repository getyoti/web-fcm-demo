import FaceCapture from "@getyoti/react-face-capture";
import classNames from "classnames";
import React, { useState } from "react";
import { predict } from "./api";
import styles from "./App.module.css";
import RadioButtons from "./components/RadioButtons";
import SecureField from "./components/SecureField";
import ZoomEffect from "./components/ZoomEffect";
import MultiframeField from "./components/MultiframeField";

const assuranceLevels = ["low", "medium", "high"];

const App = () => {
  const [image, setImage] = useState();
  const [levelOfAssurance, setLevelOfAssurance] = useState();
  const [secureFlag, setSecureFlag] = useState(false);
  const [multiframeFlag, setMultiframeFlag] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const onSuccess = async (payload, base64PreviewImage) => {
    setImage(base64PreviewImage);
    try {
      const res = await predict({
        ...payload,
        level_of_assurance: levelOfAssurance || undefined,
      }, multiframeFlag)
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
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setResponse(
          typeof data === "object" && data !== null
            ? JSON.stringify(data, null, 2)
            : data,
        );
      } else {
        setError(false);
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setError(true);
      setResponse(err.message);
    }
  };
  const onError = (err) => console.log("Error =", err);

  const onLevelOfAssuranceChange = (event) => {
    if (event.target.value) {
      setLevelOfAssurance(
        event.target.value !== levelOfAssurance ? event.target.value : "",
      );
    }
  };

  const reset = () => {
    setImage(undefined);
    setResponse(undefined);
    setError(undefined);
    setMultiframeFlag(false);
    setSecureFlag(false);
  };

  return (
    <div className={styles.scanContainer}>
      {!image ? (
        <div className={styles.scanContainer}>
          <div className={styles.faceCaptureWrapper}>
            <FaceCapture
              clientSdkId={process.env.SDK_ID}
              multiframe={multiframeFlag}
              onError={onError}
              onSuccess={onSuccess}
              returnPreviewImage
              secure={secureFlag}
            />
          </div>
          <div className={styles.optionsDiv}>
            <SecureField currentValue={secureFlag} onChange={setSecureFlag} />
            <MultiframeField currentValue={multiframeFlag} onChange={setMultiframeFlag} secureValue={secureFlag} />
            <RadioButtons
              currentValue={levelOfAssurance}
              label="Level of assurance"
              onClick={onLevelOfAssuranceChange}
              values={assuranceLevels}
            />
          </div>
        </div>
      ) : (
        <div className={styles.imgContainer}>
          <ZoomEffect in={!!image}>
            <img alt="Face Capture Module" className={styles.img} src={image} />
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
          <button className={styles.restartButton} onClick={reset} type="button">
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
