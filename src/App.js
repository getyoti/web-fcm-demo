import React, { useState } from "react";
import FaceCapture, { CAPTURE_METHOD } from "@getyoti/react-face-capture";
import "@getyoti/react-face-capture/index.css";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Zoom, CircularProgress } from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import { Api } from "./api/api";
import clsx from "clsx";

const service = new Api();

const useStyles = makeStyles((theme) =>
  createStyles({
    root: { paddingTop: theme.spacing(3) },
    img: { width: "100%", borderRadius: 20 },
    imgContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "50vw",
      margin: "auto",
    },
    button: {
      marginTop: theme.spacing(3),
    },
    faceCapture: {
      "& div div": {
        borderRadius: 20,
        width: "50vw",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    response: {
      marginTop: theme.spacing(2),
      minHeight: "180px",
      border: "2px solid",
      borderColor: theme.palette.primary.main,
      borderRadius: 20,
      minWidth: "80%",
      padding: theme.spacing(1),
    },
    error: { borderColor: theme.palette.error.main },
    responseTitle: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
    },
    responseTitleError: {
      color: theme.palette.error.main,
    },
  })
);

const App = () => {
  const [image, setImage] = useState();
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const classes = useStyles();

  const onSuccess = ({ image }) => {
    setImage(image);
    service
      .predict(image)
      .then((res) => setResponse(JSON.stringify(res.data, null, 2)))
      .catch((err) => {
        setError(true);
        const errorMessage = err.response.data;
        setResponse(
          typeof errorMessage === "object" && errorMessage !== null
            ? JSON.stringify(errorMessage, null, 2)
            : errorMessage
        );
      });
  };
  const onError = (error) => console.log("Error =", error);

  const reset = () => {
    setImage(undefined);
    setResponse(undefined);
    setError(undefined);
  };

  return (
    <div className={classes.root}>
      <Container>
        {!image ? (
          <div className={classes.faceCapture}>
            <FaceCapture
              captureMethod={CAPTURE_METHOD.AUTO}
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
            <div
              className={clsx(classes.response, {
                [classes.error]: error,
              })}
            >
              {response ? (
                <>
                  <span
                    className={clsx(classes.responseTitle, {
                      [classes.responseTitleError]: error,
                    })}
                  >
                    {error ? "Error" : "Response"}:
                  </span>
                  <pre>{response}</pre>
                </>
              ) : (
                <CircularProgress size={30} />
              )}
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={reset}
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
