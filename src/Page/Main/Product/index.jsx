import Navbar from "../../../Components/Module/Navbar";
import Card from "../../../Components/Module/Card";
import Iconstar from "../../../assets/icons/icon-start.svg";
import Nav from "../../../Components/Module/Nav";
import CountButton from "../../../Components/Base/Count";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addMyBag } from "../../../config/redux/action/myBagAction";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [data, setData] = useState({
  //   name: "",
  //   price: "",
  // });

  const handleAddToCart = (product) => {
    const itemToAdd = {
      id_product: product?.id,
      // name: product?.name,
      price: product?.price,
      quantity: quantity,
    };
    dispatch(addMyBag(itemToAdd));
    navigate("/mybag");
  };

  const handleCheckout = (product) => {
    const itemToAdd = {
      id_product: product?.id,
      // name: product?.name,
      price: product?.price,
      quantity: quantity,
    };
    dispatch(addMyBag(itemToAdd));
    navigate("/checkout");
  };

  const handlePlusQuantity = () => {
    if (quantity < product?.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/${id}`
        );
        console.log(response.data);
        setProduct(response.data.data[0]);
      } catch (error) {
        console.error("Failed to fetch Product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <Navbar />
      <main id="product-page" key={product?.id}>
        <div className="container mt-5">
          <Nav />
          <div className="product mt-5">
            <div className="row">
              <section className="col-lg-4">
                <div className="model container ">
                  <img
                    style={{ width: 1000 }}
                    src={product?.image}
                    className="rounded img-fluid"
                    alt={product?.name}
                  />
                </div>
              </section>
              <section className="col-lg-6">
                <div className="title">
                  <h1>{product?.name}</h1>
                  <p>Zalora Cloth</p>
                </div>
                <div className="d-flex align-items-center">
                  <img src={Iconstar} alt="Star" />
                  <img src={Iconstar} alt="Star" />
                  <img src={Iconstar} alt="Star" />
                  <img src={Iconstar} alt="Star" />
                  <img src={Iconstar} alt="Star" />
                  <span className="text-secondary">(10)</span>
                </div>

                <div className="price mt-4">
                  <p className="my-0">Price</p>
                  <h1>Rp. {product?.price}</h1>
                </div>

                {/* <div className="color mt-4">
                  <p className="my-0">Color</p>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select Color</option>
                    <option value="1">White</option>
                    <option value="2">Black</option>
                    <option value="3">Red</option>
                  </select>
                </div> */}

                <div className="size mt-4 d-flex" id="amount">
                  {/* <div
                    className="d-flex flex-column"
                    style={{ marginRight: "80px" }}
                  >
                    <p>Size</p>
                    <CountButton />
                  </div> */}
                  <div className="d-flex flex-column">
                    <p>Jumlah</p>
                    {/* <CountButton /> */}
                    <div>
                      <button
                        onClick={() => handleMinusQuantity()}
                        type="button"
                        className="btn btn-dark"
                      >
                        -
                      </button>
                      <span className="num px-2">{quantity}</span>
                      <button
                        onClick={() => handlePlusQuantity()}
                        type="button"
                        className="btn btn-outline-dark"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="button d-flex mt-4">
                  {/* <button
                    type="button"
                    className="btn btn-outline-dark me-2 flex-grow-3"
                  >
                    Chat
                  </button> */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    type="button"
                    className="btn btn-outline-dark me-2 flex-grow-3"
                  >
                    Add Bag
                  </button>
                  <button
                    onClick={() => handleCheckout(product)}
                    type="button"
                    className="btn btn-danger me-2 flex-grow-1"
                  >
                    Buy Now
                  </button>
                </div>
              </section>
            </div>
          </div>
          <div className="row mt-5 ">
            <section className="product col-lg-12">
              <h1>Informasi Produk</h1>
              <div className="condition mt-5">
                <h2>Condition</h2>
                <h1
                  className="capitalize"
                  style={{ color: "#DB3022", fontSize: "20px" }}
                >
                  New
                </h1>
              </div>
              <div className="description mt-5">
                <h2>Description</h2>
                <p>{product?.description}</p>
              </div>
              <div className="mt-5">
                <h1>Product Review</h1>
                <div className="row mt-5">
                  <div className="col-lg-2">
                    <h1>
                      5.0<span>/5.0</span>
                    </h1>
                    <img src={Iconstar} alt="Star" />
                    <img src={Iconstar} alt="Star" />
                    <img src={Iconstar} alt="Star" />
                    <img src={Iconstar} alt="Star" />
                    <img src={Iconstar} alt="Star" />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="row mt-5">
            <div className="title-card">
              <h1>You Can Also Like This</h1>
              <p>Youve never seen it before!</p>
            </div>
          </div>
          <div className="d-flex flex-wrap row-gap-4 gap-3 mb-5 mt-3">
            <Card />
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
