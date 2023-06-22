import { Hasil, ListCategories, NavbarComponent, Menus } from "./components";
import { Col, Container, Row } from "react-bootstrap";
import React, { Component } from "react";
import { API_URL } from "./utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
      .then((response) => {
        const menus = response.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((response) => {
        const menus = response.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjangs = (value) => {
    const dataKeranjang = {
      jumlah: 1,
      total_harga: value.harga,
      product: value,
    };

    axios
      .post(API_URL + "keranjangs", dataKeranjang)
      .then((response) => {
        swal({
          title: "Success add to troli",
          text: "Success add to troli " + dataKeranjang.product.nama,
          icon: "success",
          button: "Okey",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, categoriYangDipilih } = this.state;

    return (
      <div className="App">
        <NavbarComponent></NavbarComponent>
        <div className="mt-4">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              ></ListCategories>
              <Col>
                <h4>
                  <strong>Daftar Product</strong>
                  <hr></hr>

                  <Row>
                    {menus &&
                      menus.map((menu) => (
                        <Menus
                          key={menu.id}
                          menu={menu}
                          masukKeranjangs={this.masukKeranjangs}
                        ></Menus>
                      ))}
                  </Row>
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
