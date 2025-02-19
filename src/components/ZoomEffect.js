import React from "react";
import * as styles from "./ZoomEffect.module.css";
import classNames from "classnames";

const ZoomEffect = ({ children, in: inProp }) => {
    return (
        <div className={classNames(styles.zoomTransition,{
            [styles.zoomEnter]: inProp === true,
            [styles.zoomExit]: inProp === false,
        })}>
            {children}
        </div>
    );
};

export default ZoomEffect;
