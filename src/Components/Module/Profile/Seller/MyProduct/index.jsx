import { useEffect, useState } from "react";
import ModalUpdateProduct from "../../../Modal/ModalUpdateProduct";
import "./myproduct.css";
import { FaSearch, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getMyProductBySellerId,
} from "../../../../../config/redux/action/productAction";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

const MyProduct = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, productList } = useSelector((state) => state.product);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const seller_id = decoded.id;

  useEffect(() => {
    dispatch(getMyProductBySellerId(seller_id));
  }, [dispatch, seller_id]);
  // const handleSearch = () => {};

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product",
      text: "Are you sure you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
    });

    if (result?.isConfirmed) {
      try {
        await dispatch(deleteProduct(id));
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
    // navigate("/");
    dispatch(getMyProductBySellerId(seller_id));
  };
  return (
    <section id="myProduct">
      <div className="main-content w-75 bg-grey">
        <div className="container bg-white">
          <div className="wrapper-card">
            <h3 className="title mb-0">My Product</h3>
            <hr className="mb-3" />
            {/* navpils */}
            <ul className="nav mb-3" id="pills-tab-product" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-item-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                  style={{
                    color: "white",
                    backgroundColor: "rgba(220, 53, 69,1)",
                  }}
                >
                  All Items
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                  style={{
                    color: "white",
                    backgroundColor: "rgba(220, 53, 69,1)",
                  }}
                >
                  Sold Out
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                  style={{
                    color: "white",
                    backgroundColor: "rgba(220, 53, 69,1)",
                  }}
                >
                  Archived
                </button>
              </li>
            </ul>
            <div className="search mb-3">
              <div className="icon py-2 px-4">
                <FaSearch />
              </div>
              <input
                type="search"
                className="form-control p-2"
                id="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabIndex="0"
              >
                <div className="container pt-3">
                  <div className="row">
                    <div className="col-lg-12 p-0">
                      {/* <ModalProduct /> */}
                      <table className="table table-hover">
                        <thead className="table-light text-center ">
                          <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <td colSpan="3" className="text-center">
                              Loading...
                            </td>
                          ) : productList?.length > 0 ? (
                            productList.map((item) => (
                              <tr key={item.id}>
                                <td className="text-center">
                                  <img
                                    crossOrigin="anonymous"
                                    src={item.image}
                                    className="img-thumbnail"
                                    alt=""
                                    width={70}
                                    height={70}
                                  />
                                </td>
                                <td className="text-center">{item.name}</td>
                                <td className="text-center">{item.price}</td>
                                <td className="text-center">{item.stock}</td>

                                <td className="text-center">
                                  <ModalUpdateProduct item={item} />

                                  <button
                                    type="button"
                                    onClick={() => handleDelete(item.id)}
                                    className="btn btn-danger"
                                  >
                                    <FaTrash />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <td colSpan="3" className="text-center">
                              No products.
                            </td>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* sold out */}
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabIndex="0"
              >
                <div className="container pt-3">
                  <div className="row">
                    <div className="col-lg-12 p-0">
                      <table className="table table-hover">
                        <thead className="table-light text-center ">
                          <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* archived */}
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
                tabIndex="0"
              >
                <div className="container pt-3">
                  <div className="row">
                    <div className="col-lg-12 p-0">
                      <table className="table table-hover">
                        <thead className="table-light text-center ">
                          <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProduct;
