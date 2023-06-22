import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return (
      <FontAwesomeIcon icon={faUtensils} className="mr-2"></FontAwesomeIcon>
    );
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mr-2"></FontAwesomeIcon>;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2"></FontAwesomeIcon>;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2"></FontAwesomeIcon>;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((response) => {
        const categories = response.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;

    return (
      <Col md={2} mt={2}>
        <h4>
          <strong>Daftar Kategori</strong>
          <hr></hr>
        </h4>

        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={
                  categoriYangDipilih === category.nama && "category-aktif"
                }
              >
                <h5>
                  <Icon nama={category.nama}></Icon> {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
