import React from "react";
import "@getyoti/react-face-capture/index.css";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";

const RadioButtons = ({ label, currentValue, values, onClick }) => {
  return (
    <FormControl>
      <FormLabel id="radio-buttons-group">{label}</FormLabel>
      <RadioGroup
        aria-labelledby={`${label}-radio-buttons-group`}
        name="controlled-radio-buttons-group"
        value={currentValue}
        onClick={onClick}
      >
        {values.map((value) => {
          return (
            <FormControlLabel
              key={`${label}-${value}`}
              value={value}
              control={<Radio color="primary" />}
              label={value}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtons;
