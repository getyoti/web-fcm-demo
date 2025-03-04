import React from "react";
import styles from "./RadioButtons.module.css";

const RadioButtons = ({ label, currentValue, values, onClick }) => {
  return (
    <div className={styles.radioGroup}>
      <legend className={styles.radioGroupLabel}>{label}</legend>
      {values.map((value) => (
        <label key={value} className={styles.radioContainer}>
          <input
            type="radio"
            value={value}
            checked={value === currentValue}
            onClick={onClick}
            readOnly
          />
          <span className={styles.radioLabel}>{value}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
