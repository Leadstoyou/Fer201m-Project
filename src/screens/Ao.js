import DefaultLayout from "../layouts/DefaultLayout";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";

const Ao = () => {
  const [originalProduct, setOriginalProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [listShirtCategories, setListShirtCategories] = useState([]);
  
  let listShirt = JSON.parse(localStorage.getItem("products")).filter(
    (shirt) => shirt.catId === 1
  );
  let shirtCategories = JSON.parse(localStorage.getItem("categories"));
  useEffect(() => {
    setOriginalProduct(listShirt);
    setFilteredProduct(listShirt);
    setListShirtCategories(shirtCategories[0].detail);
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
        <h2>ÁO</h2>
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
            product.name.toLowerCase().includes("Áo".toLowerCase())
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
                  <Card.Img
                    onClick={() =>
                      (window.location.href = `product/detail/${product.id}`)
                    }
                    src={product.img}
                  />
                </div>
                <Card.Body>
                  <Card.Text
                    onClick={() =>
                      (window.location.href = `product/detail/${product.id}`)
                    }
                    style={{ fontWeight: "500" }}
                  >
                    {product.name}
                  </Card.Text>
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
