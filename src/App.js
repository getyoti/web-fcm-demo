import React, { useState } from "react";
import FaceCapture from "@getyoti/react-face-capture";
import "@getyoti/react-face-capture/index.css";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Zoom } from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(8),
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(1),
      },
    },
    img: { width: "100%", borderRadius: 20 },
    imgContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    button: {
      marginTop: theme.spacing(3),
    },
    faceCapture: {
      "& div div": {
        borderRadius: 20,
      },
    },
  })
);

const App = () => {
  const [image, setImage] = useState();

  const classes = useStyles();

  const onSuccess = ({ image }) => setImage(image);
  const onError = (error) => console.log("Error =", error);

  return (
    <div className={classes.root}>
      <Container>
        {!image ? (
          <div className={classes.faceCapture}>
            <FaceCapture
              captureMethod="auto"
              onSuccess={onSuccess}
              onError={onError}
            />
          </div>
        ) : (
          <div className={classes.imgContainer}>
            <Zoom in={!!image}>
              <img
                className={classes.img}
                src={image}
                alt="Face Capture Module image"
              />
            </Zoom>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={() => setImage(undefined)}
              endIcon={<ReplayIcon />}
            >
              Restart
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;
