import { Button, Col, Container, Row } from "react-bootstrap";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Container style={{ height: "90vh" }}>
      <Row className="justify-content-center align-items-center" style={{ height: "100%" }}>
        <Col
         xs="auto">
          <ExclamationCircleFill size={"5rem"} />
          <h1>(404) Không tìm thấy trang</h1>
          <Link to="/">
            <Button variant="outline-primary">Trở lại trang chủ</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
