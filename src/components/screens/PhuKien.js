import DefaultLayout from "../layouts/DefaultLayout";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Ao = () => {
  const [originalProduct, setOriginalProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [listShirtCategories, setListShirtCategories] = useState([]);

  let listShirt = JSON.parse(localStorage.getItem("products")).filter(
    (shirt) => shirt.catId === 3
  );
  let shirtCategories = JSON.parse(localStorage.getItem("categories"));

  useEffect(() => {
    setOriginalProduct(listShirt);
    setFilteredProduct(listShirt);
    setListShirtCategories(shirtCategories[2].detail);
  }, []);
  const filterByName = (nameString) => {
    const filtered = originalProduct.filter(({ name }) =>
      name.toLowerCase().includes(nameString.toLowerCase())
    );
    setFilteredProduct(filtered);
  };

  const handleClick = (name) => {
    filterByName(name);
  };

  const handleMouseEnter = (event, product) => {
    event.currentTarget.getElementsByTagName("img")[0].src = product.blurImg;
  };

  const handleMouseLeave = (event, product) => {
    event.currentTarget.getElementsByTagName("img")[0].src = product.img;
  };

  return (
    <DefaultLayout className="container">
      <div className="Product-content">
        <h2>PHỤ KIỆN</h2>
        {listShirtCategories.map((category, index) => (
          <button key={index} onClick={() => handleClick(category)}>
            {category}
          </button>
        ))}
      </div>
      <br />
      <div className="row">
        {filteredProduct
          .filter((product) =>
            listShirtCategories.some((keyword) =>
              product.name.toLowerCase().includes(keyword.toLowerCase())
            )
          )
          .map((product) => (
            <div
              key={product.id}
              className="col-md-3"
              onMouseEnter={(event) => handleMouseEnter(event, product)}
              onMouseLeave={(event) => handleMouseLeave(event, product)}
            >
              <Card className="card-content">
                <div className="blurry-image">
                  <Link to={`/product/detail/${product.id}`}>
                    <Card.Img src={product.img} />
                  </Link>
                </div>
                <Card.Body>
                  <Link to={`/product/detail/${product.id}`}>
                    <Card.Text style={{ fontWeight: "500" }}>
                      {product.name}
                    </Card.Text>
                  </Link>
                  <Card.Title>{product.price}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </DefaultLayout>
  );
};

export default Ao;
