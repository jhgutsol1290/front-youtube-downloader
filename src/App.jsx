import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavigationBar from "./components/layout/NavigationBar";
import DownloadVideo from "./components/DownloadVideo/DownloadVideo";
import { Container, Row, Col } from "react-bootstrap";
import VideoList from "./components/VideoList/VideoList";

console.log(process.env.REACT_APP_BACK_ADDRESS)

function App() {
  return (
    <Router>
      <>
        <NavigationBar />
        <Container className="mt-5">
          <Row>
            <Col xs={12}>
              <Switch>
                <Route path="/" exact component={DownloadVideo} />
                <Route path="/video-list" exact component={VideoList} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </>
    </Router>
  );
}

export default App;
