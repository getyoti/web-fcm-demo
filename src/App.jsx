import FaceCapture from "@getyoti/react-face-capture";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./App.module.css";
import RadioButtons from "./components/RadioButtons";
import SecureField from "./components/SecureField";
import ZoomEffect from "./components/ZoomEffect";
import MultiframeField from "./components/MultiframeField";
import UseIframeField from "./components/UseIframeField";

const assuranceLevels = ["low", "medium", "high"];

const App = () => {
  const [image, setImage] = useState();
  const [levelOfAssurance, setLevelOfAssurance] = useState();
  const [secureFlag, setSecureFlag] = useState(false);
  const [multiframeFlag, setMultiframeFlag] = useState(false);
  const [useIframe, setUseIframe] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const predict = async (body, multiframe) =>
    fetch(`/api/predict${multiframe ? "?multiframe=true" : "" }`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

  const onSuccess = async (payload, base64PreviewImage) => {
    setImage(base64PreviewImage);
    try {
      const res = await predict({
        ...payload,
        level_of_assurance: levelOfAssurance || undefined,
      }, multiframeFlag);

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
    setUseIframe(false);
  };

  const FaceCaptureComponent = () => (
    <FaceCapture
      clientSdkId={process.env.SDK_ID}
      multiframe={multiframeFlag}
      onError={onError}
      onSuccess={onSuccess}
      returnPreviewImage
      secure={secureFlag}
    />
  );

  // const policiesAllOff = "accelerometer 'none'; ambient-light-sensor 'none'; aria-notify 'none'; attribution-reporting 'none'; autoplay 'none'; bluetooth 'none'; browsing-topics 'none'; camera 'none'; captured-surface-control 'none'; compute-pressure 'none'; cross-origin-isolated 'none'; deferred-fetch 'none'; deferred-fetch-minimal 'none'; display-capture 'none'; encrypted-media 'none'; fullscreen 'none'; gamepad 'none'; geolocation 'none'; gyroscope 'none'; hid 'none'; identity-credentials-get 'none'; idle-detection 'none'; language-detector 'none'; local-fonts 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; on-device-speech-recognition 'none'; otp-credentials 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-create 'none'; publickey-credentials-get 'none'; screen-wake-lock 'none'; serial 'none'; speaker-selection 'none'; storage-access 'none'; summarizer 'none'; translator 'none'; usb 'none'; web-share 'none'; window-management 'none'; xr-spatial-tracking 'none'";

  // const policiesOnlyCamera = "accelerometer 'none'; ambient-light-sensor 'none'; aria-notify 'none'; attribution-reporting 'none'; autoplay 'none'; bluetooth 'none'; browsing-topics 'none'; camera *; captured-surface-control 'none'; compute-pressure 'none'; cross-origin-isolated 'none'; deferred-fetch 'none'; deferred-fetch-minimal 'none'; display-capture 'none'; encrypted-media 'none'; fullscreen 'none'; gamepad 'none'; geolocation 'none'; gyroscope 'none'; hid 'none'; identity-credentials-get 'none'; idle-detection 'none'; language-detector 'none'; local-fonts 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; on-device-speech-recognition 'none'; otp-credentials 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-create 'none'; publickey-credentials-get 'none'; screen-wake-lock 'none'; serial 'none'; speaker-selection 'none'; storage-access 'none'; summarizer 'none'; translator 'none'; usb 'none'; web-share 'none'; window-management 'none'; xr-spatial-tracking 'none'";

  const policiesAllOn = "accelerometer *; ambient-light-sensor *; aria-notify *; attribution-reporting *; autoplay *; bluetooth *; browsing-topics *; camera *; captured-surface-control *; compute-pressure *; cross-origin-isolated *; deferred-fetch *; deferred-fetch-minimal *; display-capture *; encrypted-media *; fullscreen *; gamepad *; geolocation *; gyroscope *; hid *; identity-credentials-get *; idle-detection *; language-detector *; local-fonts *; magnetometer *; microphone *; midi *; on-device-speech-recognition *; otp-credentials *; payment *; picture-in-picture *; publickey-credentials-create *; publickey-credentials-get *; screen-wake-lock *; serial *; speaker-selection *; storage-access *; summarizer *; translator *; usb *; web-share *; window-management *; xr-spatial-tracking *";

  return (
    <div className={styles.scanContainer}>
      {!image ? (
        <div className={styles.scanContainer}>
          <div className={styles.faceCaptureWrapper}>
            {useIframe ? (
              <iframe
                title="Face Capture iframe"
                className={styles.iframe}
                allow={policiesAllOn}
                src="https://localhost:6006/iframe.html?args=clientSdkId:2ba147ae-b2ac-40ca-aef4-b3ea548a3d6f&id=face-capture-default--default&viewMode=story"
              />
            ) : (
              <FaceCaptureComponent />
            )}
          </div>
          <div className={styles.optionsDiv}>
            <SecureField currentValue={secureFlag} onChange={setSecureFlag} />
            <UseIframeField currentValue={useIframe} onChange={setUseIframe} />
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
