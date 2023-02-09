import { Button, IconButton, makeStyles } from "@material-ui/core";
import { CameraFrontOutlined, CameraRearOutlined } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import Webcam from "react-webcam";
import useToasterMessage from "../../hooks/useToasterMessage";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  actionButton: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
}));

const CAMERA_DIRECTION = {
  FRONT: "user",
  BACK: "environment",
};

const WebcamCapture = ({ onCapture, onCancel, onCameraOpen }) => {
  const webcamRef = React.useRef(null);
  const classes = useStyles();
  const [cameraDirection, setCameraDirection] = useState(CAMERA_DIRECTION.BACK);
  const [mediaError, setMediaError] = useState(false);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: { exact: cameraDirection },
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 300,
      height: 300,
    });
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  useEffect(() => {
    onCameraOpen(mediaError);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaError]);

  const toaster = useToasterMessage();

  return (
    <div className={classes.container}>
      {!mediaError && (
        <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          onError={() => {}}
          onUserMediaError={() => {
            toaster({
              message: `${
                cameraDirection === CAMERA_DIRECTION.FRONT ? "Front" : "Back"
              } Side Camera not supported. Please switch back to other side camera`,
              type: "info",
            });
            setMediaError(true);
          }}
          screenshotFormat="image/jpeg"
          width={220}
          videoConstraints={videoConstraints}
        />
      )}
      <span onClick={() => setMediaError(false)}>
        {cameraDirection === CAMERA_DIRECTION.BACK && (
          <IconButton
            onClick={() => setCameraDirection(CAMERA_DIRECTION.FRONT)}
          >
            <CameraFrontOutlined />
          </IconButton>
        )}
        {cameraDirection === CAMERA_DIRECTION.FRONT && (
          <IconButton onClick={() => setCameraDirection(CAMERA_DIRECTION.BACK)}>
            <CameraRearOutlined />
          </IconButton>
        )}
      </span>

      <div className={classes.actionButton}>
        <Button
          variant={"outlined"}
          color={"default"}
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
        >
          Capture
        </Button>
        <Button variant={"outlined"} color={"default"} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default WebcamCapture;
