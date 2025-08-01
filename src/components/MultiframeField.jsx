import React, { useEffect } from "react";
import styles from "./SecureField.module.css";

const MultiframeField = ({ currentValue, onChange, secureValue }) => {
  const onChangeMultiframeFlag = () => {
    onChange(!currentValue);
  };
  useEffect(() => {
    if (!secureValue) {
      onChange(false);
    }
  }, [secureValue, onChange]);
  return (
    <div className={styles.toggleDiv}>
      <div>
        <h4 className={styles.title}>Multiframe mode</h4>
      </div>
      <div>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={currentValue}
            onChange={onChangeMultiframeFlag}
            disabled={!secureValue}
          />
          <span className={styles.slider} />
        </label>
      </div>
    </div>
  );
};

export default MultiframeField;
