import React, { useState, useEffect } from "react";
import { Container, Row, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import "./VideoList.css";
import Alerts from "../../utils/Alerts";
import Filter from "../Filter/Filter";

const VideoList = () => {
  const [mainState, setMainState] = useState([]);
  const [page, setPage] = useState(1);
  const [pageDate] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      let url = "";
      setPage(page + 1);
      url += `${process.env.REACT_APP_BACK_ADDRESS}download/?page=${page}`;
      const res = await axios.get(url, {
        params: {
          filter_date: filters,
        },
      });
      if (res.data.data.next === null) {
        setHasMore(false);
      }
      setMainState((prevState) => {
        return [...prevState, ...res.data.data.results];
      });
    } catch (error) {
      setError(true);
    }
  };

  const fetchDateVideos = async () => {
    try {
      let url = "";
      url += `${process.env.REACT_APP_BACK_ADDRESS}download/?page=${pageDate}`;
      const res = await axios.get(url, {
        params: {
          filter_date: filters,
        },
      });
      if (res.data.data.next === null) {
        setHasMore(false);
      }
      setMainState([...res.data.data.results]);
    } catch (error) {
      setError(true);
    }
  };

  const handleDateChange = (e) => setFilters(e.target.value);

  const handleReset = () => {
    window.location.href = "/video-list";
  };

  if (!mainState)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  return (
    <>
      {error && (
        <Alerts
          variant="danger"
          update={() => setError(false)}
          text="Algo salió mal! Por favor, intenta de nuevo"
        />
      )}
      <Filter
        update={handleDateChange}
        getVideos={fetchDateVideos}
        date={filters}
        reset={handleReset}
      />
      <Container className="mt-2">
        <Row>
          {mainState.map(({ author, title, link, created, id }) => {
            return (
              <Card
                style={{ width: "20rem" }}
                className="my-4 ml-3"
                border="dark"
                key={id}
              >
                <div className="player-wrapper">
                  <ReactPlayer
                    url={link}
                    className="react-player"
                    width="100%"
                    height="100%"
                    controls
                  />
                </div>
                <Card.Body>
                  <Card.Title>Video: {title}</Card.Title>
                  <Card.Text>Author: {author}</Card.Text>
                  <Card.Text className="text-muted">Fecha: {created}</Card.Text>
                  <a href={link} rel="noopener noreferrer" target="_blank">
                    <Button variant="outline-secondary">
                      Video Original{" "}
                      <i
                        className="fa fa-arrow-right ml-2"
                        aria-hidden="true"
                      ></i>
                    </Button>
                  </a>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
        {hasMore && (
          <Row className="m-5">
            <Button variant="secondary" onClick={fetchVideos}>
              Más videos{" "}
              <i
                className="fa fa-arrow-circle-down ml-2"
                aria-hidden="true"
              ></i>
            </Button>
          </Row>
        )}
      </Container>
    </>
  );
};

export default VideoList;
