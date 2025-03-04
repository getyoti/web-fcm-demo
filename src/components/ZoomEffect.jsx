import classNames from "classnames";
import React from "react";
import styles from "./ZoomEffect.module.css";

const ZoomEffect = ({ children, in: inProp }) => {
  return (
    <div
      className={classNames(styles.zoomTransition, {
        [styles.zoomEnter]: inProp === true,
        [styles.zoomExit]: inProp === false,
      })}
    >
      {children}
    </div>
  );
};

export default ZoomEffect;
