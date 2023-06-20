import { Hasil, ListCategories, NavbarComponent } from "./components";
import { Col, Container, Row } from "react-bootstrap";
import React, { Component } from "react";
import { API_URL } from "./utils/constants";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products")
      .then((response) => {
        const menus = response.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.menus);
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
}
