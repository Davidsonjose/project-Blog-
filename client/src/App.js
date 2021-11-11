import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./components/Navigation";
import LeftComponent from "./components/leftComponent";
import RightComponent from "./components/rightComponent";

function App() {
  return (
    <div id="main">
      <Navigation />
      <Row className="container-fluid">
        <Col md={9}>
          <LeftComponent />
        </Col>
        <Col md={3}>
          <RightComponent />
        </Col>
      </Row>
    </div>
  );
}

export default App;
