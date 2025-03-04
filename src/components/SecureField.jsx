import React from "react";
import styles from "./SecureField.module.css";

const SecureField = ({ currentValue, onChange }) => {
  const onChangeSecureFlag = () => {
    onChange(!currentValue);
  };

  return (
    <div className={styles.toggleDiv}>
      <div>
        <h4 className={styles.title}>Secure mode</h4>
      </div>
      <div>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            value={currentValue}
            onChange={onChangeSecureFlag}
          />
          <span className={styles.slider} />
        </label>
      </div>
    </div>
  );
};

export default SecureField;
