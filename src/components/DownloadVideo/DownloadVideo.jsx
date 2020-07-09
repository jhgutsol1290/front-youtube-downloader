import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Card, Button, Alert, Spinner } from "react-bootstrap";
import Alerts from "../../utils/Alerts";

const DownloadVideo = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    link: "",
    video_name: "",
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
    if (success) {
      setTimeout(() => {
        setData({
          link: "",
          video_name: "",
        });
        setSuccess(false);
      }, 3000);
    }
  }, [error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACK_ADDRESS}download/`, data);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {error && (
        <Alerts
          variant="danger"
          update={() => setError(false)}
          text="Algo salió mal! Por favor, intenta de nuevo"
        />
      )}
      {success && (
        <Alerts
          variant="success"
          update={() => setError(false)}
          text="Video descargado correctamente"
        />
      )}
      <Card style={{ width: "60%" }} className="mt-5 offset-md-2" border="dark">
        <Card.Header className="d-flex justify-content-center">
          Descargar video
        </Card.Header>
        <Card.Body>
          <Form
            className="d-flex justify-content-center"
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="formVideo">
              <Form.Label className="d-flex justify-content-center">
                Link del video a descargar
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Link..."
                onChange={handleChange}
                name="link"
                value={data.link}
                autoFocus
                required
              />
              <Form.Label className="d-flex justify-content-center">
                Nombre del archivo
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre..."
                onChange={handleChange}
                name="video_name"
                value={data.video_name}
                required
              />
              {!isLoading ? (
                <Button
                  disabled={isLoading}
                  variant="secondary"
                  type="submit"
                  className="mt-2 d-flex offset-md-3"
                >
                  Descargar
                </Button>
              ) : (
                <Spinner
                  animation="border"
                  role="status"
                  className="offset-md-5 mt-2 p-3"
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default DownloadVideo;
