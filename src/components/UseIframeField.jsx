import React from "react";
import styles from "./SecureField.module.css";

const UseIframeField = ({ currentValue, onChange }) => {
  const onChangeFlag = () => {
    onChange(!currentValue);
  };
  return (
    <div className={styles.toggleDiv}>
      <div>
        <h4 className={styles.title}>Use iframe</h4>
      </div>
      <div>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={currentValue}
            onChange={onChangeFlag}
          />
          <span className={styles.slider} />
        </label>
      </div>
    </div>
  );
};

export default UseIframeField;
