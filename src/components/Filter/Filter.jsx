import React from "react";
import { Form, Button, Badge } from "react-bootstrap";

const Filter = ({ update, getVideos, date, reset }) => {
  return (
    <>
      <Form.Row>
        <Form.Group
          controlId="date"
          style={{ width: "25%" }}
          className="mt-3 mx-2"
        >
          <Form.Label>
            {date === null ? (
              <Badge variant="light">Filtra por fecha</Badge>
            ) : (
              <Badge
                variant="secondary"
                onClick={reset}
                style={{ cursor: "pointer" }}
              >
                Resetear filtros
              </Badge>
            )}
          </Form.Label>
          <Form.Control type="date" onChange={update} name="filter_date" />
        </Form.Group>
        <Button
          variant="secondary"
          onClick={getVideos}
          className="mt-5"
          style={{ height: "50%" }}
        >
          Aplicar <i className="fa fa-filter" aria-hidden="true"></i>
        </Button>
      </Form.Row>
    </>
  );
};

export default Filter;
