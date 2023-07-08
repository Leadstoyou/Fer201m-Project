import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Figure,
  Form,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
// import "./ProductManager.css";
import { useEffect, useState } from "react";
import { ArchiveFill, PencilSquare } from "react-bootstrap-icons";
import NotFound from "../layouts/NotFound";

const ProductManager = () => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products"))
  );
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories"))
  );
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID")).isAdmin
      : false
  );
  const [newProductAdded, setNewProductAdd] = useState({});
  const [updateProduct, setUpdateProduct] = useState({});
  const SIZE_KEY = {
    shirts: ["S", "ML", "XL", "XXL"],
    pants: [27, 28, 29, 30, 31, 32, 33],
    shoes: [39, 40, 41, 42, 43],
  };

  useEffect(() => {
    setNewProductAdd((prevProduct) => ({
      ...prevProduct,
      id: products[products.length - 1].id + 1,
    }));
  }, []);

  const handleCloseModal = () => {
    if (isEditing) {
      setIsEditing(false);
    }
    setShowModal(false);
    var elements = document.getElementsByClassName("form-control");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.value = "";
    }
  };
  const handleEditProduct = (id) => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setUpdateProduct(foundProduct);

    setIsEditing(true);
    setShowModal(true);
  };
  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== parseInt(id));
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(products));
  };
  const handleClickSaveEdit = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === parseInt(id) ? updateProduct : product
    );
    console.log(updatedProducts);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(products));
    setIsEditing(false);
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isEditing) {
      const updatedProducts = [...products, newProductAdded];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setShowModal(false);
      setNewProductAdd({});
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return isAdmin ? (
    <div className="container border-0" style={{ marginTop: "5px" }}>
      <div
        className="table-wrapper"
        style={{ paddingTop: "12px" }}
      >
        <div className="table-title">
          <Row>
            <Col sm={6}>
              <h2>Manager Product </h2>
            </Col>
            <Col sm={6}>
              <Button
                variant="info"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Mới
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  window.history.back(-1);
                }}
                style={{ marginLeft: "70%" }}
              >
                Quay lại
              </Button>
            </Col>
          </Row>
        </div>
        <div class="scrollable-area" style={{ overflow: "auto" }}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>
                    <Figure.Image
                      src={product.img}
                      alt={product.name}
                      style={{ maxWidth: 100, maxHeight: 100 }}
                      rounded
                    />
                  </td>

                  <td>{product.name}</td>
                  <td>{product.color.join(", ")}</td>
                  <td>{product.size.join(", ")}</td>
                  <td>{product.price}</td>
                  <td>{product.amount}</td>
                  <td>
                    <PencilSquare
                      style={{
                        color: "white",
                        backgroundColor: "yellow",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleEditProduct(product.id);
                      }}
                      required
                    />
                    <ArchiveFill
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleDeleteProduct(product.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditing
                ? `Chỉnh sửa sản phẩm (ID:${updateProduct.id})`
                : "Thêm mới sản phẩm"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
              <Form.Control
                placeholder="Product Name"
                aria-label="product_name"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  isEditing
                    ? setUpdateProduct((prevProduct) => ({
                        ...prevProduct,
                        name: e.target.value,
                      }))
                    : setNewProductAdd((prevProduct) => ({
                        ...prevProduct,
                        name: e.target.value,
                      }));
                }}
                defaultValue={isEditing ? updateProduct.name : ""}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Giá</InputGroup.Text>
              <Form.Control
                placeholder="Price"
                aria-label="product_price"
                aria-describedby="basic-addon3"
                onChange={(e) => {
                  isEditing
                    ? setUpdateProduct((prevProduct) => ({
                        ...prevProduct,
                        price: e.target.value,
                      }))
                    : setNewProductAdd((prevProduct) => ({
                        ...prevProduct,
                        price: e.target.value,
                      }));
                }}
                defaultValue={isEditing ? updateProduct.price : ""}
                required
              />
              <InputGroup.Text>đ</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {categories.map((category, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => {
                        setNewProductAdd((prevProduct) => ({
                          ...prevProduct,
                          catId: category.id,
                        }));
                      }}
                    >
                      {`${category.name} (${category.id})`}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control
                placeholder={isEditing ? updateProduct.catId : "Category"}
                aria-label="product_category"
                aria-describedby="basic-addon3"
                defaultValue={isEditing ? updateProduct.catId : ""}
                value={newProductAdded.catId ? newProductAdded.catId : ""}
                onChange={(e) => {
                  isEditing
                    ? setUpdateProduct((prevProduct) => ({
                        ...prevProduct,
                        catId: e.target.value,
                      }))
                    : setNewProductAdd((prevProduct) => ({
                        ...prevProduct,
                        catId: e.target.value,
                      }));
                }}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                placeholder="Description"
                as="textarea"
                aria-label="With textarea"
                onChange={(e) => {
                  isEditing
                    ? setUpdateProduct((prevProduct) => ({
                        ...prevProduct,
                        description: e.target.value,
                      }))
                    : setNewProductAdd((prevProduct) => ({
                        ...prevProduct,
                        description: e.target.value,
                      }));
                }}
                defaultValue={isEditing ? updateProduct.description : ""}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                title="Size"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item
                  onClick={(e) => {
                    setNewProductAdd((prevProduct) => ({
                      ...prevProduct,
                      size: SIZE_KEY.shirts,
                    }));
                  }}
                >
                  Áo
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    setNewProductAdd((prevProduct) => ({
                      ...prevProduct,
                      size: SIZE_KEY.pants,
                    }));
                  }}
                >
                  Quần
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    setNewProductAdd((prevProduct) => ({
                      ...prevProduct,
                      size: SIZE_KEY.shoes,
                    }));
                  }}
                >
                  Giầy/Dép
                </Dropdown.Item>
              </DropdownButton>
              <Form.Control
                placeholder={
                  isEditing ? updateProduct.size : "Separated by commas"
                }
                aria-label="product_category"
                defaultValue={isEditing ? updateProduct.size : ""}
                value={newProductAdded.size ? newProductAdded.size : ""}
                onChange={(e) => {
                  isEditing
                    ? setUpdateProduct((prevProduct) => ({
                        ...prevProduct,
                        size: e.target.value,
                      }))
                    : setNewProductAdd((prevProduct) => ({
                        ...prevProduct,
                        size: e.target.value,
                      }));
                }}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Color</InputGroup.Text>
              <Form.Control
                placeholder="Separated by commas"
                aria-label="product_color"
                aria-describedby="basic-addon3"
                defaultValue={isEditing ? updateProduct.color : ""}
                onChange={(e) => {
                  isEditing
                    ? setUpdateProduct((prevProduct) => ({
                        ...prevProduct,
                        color: e.target.value
                          ? e.target.value.split(",")
                          : e.target.value,
                      }))
                    : setNewProductAdd((prevProduct) => ({
                        ...prevProduct,
                        color: e.target.value
                          ? e.target.value.split(",")
                          : e.target.value,
                      }));
                }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Quantity</InputGroup.Text>
              <Form.Control
                placeholder="Quantity"
                aria-label="product_quantity"
                aria-describedby="basic-addon3"
                onChange={(e) => {
                  isEditing
                    ? setUpdateProduct((prevProduct) => ({
                        ...prevProduct,
                        amount: e.target.value,
                      }))
                    : setNewProductAdd((prevProduct) => ({
                        ...prevProduct,
                        amount: e.target.value,
                      }));
                }}
                defaultValue={isEditing ? updateProduct.amount : ""}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Image</InputGroup.Text>
              <Form.Control
                placeholder="Image Link"
                aria-label="product_image"
                aria-describedby="basic-addon3"
                onChange={(e) => {
                  isEditing
                    ? setUpdateProduct((prevProduct) => ({
                        ...prevProduct,
                        img: e.target.value,
                      }))
                    : setNewProductAdd((prevProduct) => ({
                        ...prevProduct,
                        img: e.target.value,
                      }));
                }}
                defaultValue={isEditing ? updateProduct.img : ""}
                required
              />
              <Form.Control
                placeholder="BlurImage Link"
                aria-label="product_blur_image"
                aria-describedby="basic-addon3"
                onChange={(e) => {
                  isEditing
                    ? setUpdateProduct((prevProduct) => ({
                        ...prevProduct,
                        blurImg: e.target.value,
                      }))
                    : setNewProductAdd((prevProduct) => ({
                        ...prevProduct,
                        blurImg: e.target.value,
                      }));
                }}
                defaultValue={isEditing ? updateProduct.blurImg : ""}
                required
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={
                isEditing
                  ? () => {
                      handleClickSaveEdit(updateProduct.id);
                    }
                  : () => {}
              }
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  ) : (
    <NotFound />
  );
};

export default ProductManager;
