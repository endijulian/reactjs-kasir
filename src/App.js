import "./App.css";
import { Hasil, ListCategories, NavbarComponent } from "./components";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <NavbarComponent></NavbarComponent>
      <div className="mt-4">
        <Container fluid>
          <Row>
            <ListCategories></ListCategories>
            <Col>
              <h4>
                <strong>Daftar Product</strong>
                <hr></hr>
              </h4>
            </Col>
            <Hasil></Hasil>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
