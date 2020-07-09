import React from "react";
import { Alert } from "react-bootstrap";

const Alerts = ({ variant, update, text }) => {
  return (
    <Alert
      variant={variant}
      onClose={() => update(false)}
      dismissible
      className="mt-3 offset-md-2"
      style={{ width: "60%" }}
    >
      <Alert.Heading className="d-flex justify-content-center">
        {text}
      </Alert.Heading>
    </Alert>
  );
};

export default Alerts;
