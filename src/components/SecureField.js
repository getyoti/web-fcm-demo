import React from "react";
import "@getyoti/react-face-capture/index.css";
import {
  FormControlLabel,
  FormLabel,
  Switch,
  FormControl,
} from "@material-ui/core";

const SecureField = ({ currentValue, onChange }) => {
  const onChangeSecureFlag = (e, value) => {
    onChange(value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">
        Secure Mode
      </FormLabel>
      <FormControlLabel
        control={<Switch color="primary" />}
        label="Secure"
        checked={currentValue}
        onChange={onChangeSecureFlag}
      />
    </FormControl>
  );
};

export default SecureField;
