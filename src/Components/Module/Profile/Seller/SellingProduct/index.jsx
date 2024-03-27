import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./sellingProduct.css";
import { createProduct } from "../../../../../config/redux/action/productAction";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const SellingProduct = () => {
  const [data, setData] = useState("");
  const [saveImage, setSaveImage] = useState("");
  const [showImage, setShowImage] = useState("");
  const [category, setCategory] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const [imageError, setImageError] = useState(false); // Add state variable for image upload error

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { loading } = useSelector((state) => state.product);

  // const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const id = decoded.id;
  // console.log(id);

  const formData = new FormData();
  formData.append("name", data?.name);
  formData.append("price", data?.price);
  formData.append("stock", data?.stock);
  formData.append("condition", data?.condition);
  formData.append("image", saveImage);
  formData.append("description", data?.description);
  formData.append("category_id", category);
  formData.append("seller_id", id);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = (e) => {
    // const MIN_FILE_SIZE = 1024; // 1MB
    const MAX_FILE_SIZE = 5120; // 5MB

    const uploader = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setShowImage(reader.result);
    };

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const fileSizeKiloBytes = uploader.size / 1024;

    if (!allowedTypes.includes(uploader?.type)) {
      setIsError(true);
      Swal.fire({
        title: "Failed",
        text: "Type File is not match",
        icon: "error",
      });

      return;
    }

    // if (fileSizeKiloBytes < MIN_FILE_SIZE) {
    //   setIsError(true);
    //   Swal.fire({
    //     title: "Failed",
    //     text: "File size is less than minimum limit",
    //     icon: "error",
    //   });
    //   return;
    // }
    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setIsError(true);
      Swal.fire({
        title: "Failed",
        text: "File size is less than minimum limit",
        icon: "error",
      });
      return;
    }
    setIsError(false);
    reader.readAsDataURL(uploader);
    setSaveImage(uploader);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isError) {
        Swal.fire({
          title: "Failed",
          text: "Create Product Failed",
          icon: "error",
        });
      } else {
        await dispatch(createProduct(formData));
        setData({
          name: "",
          price: "",
          stock: "",
          condition: "",
          description: "",
        });
        setSaveImage(null);
        setShowImage("");
        Swal.fire({
          title: "Success",
          text: "Create Product Success",
          icon: "success",
        });
      }
      // navigate("/");
      // clear all input
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Create Product Failed",
        icon: "error",
      });
    }
  };

  return (
    <section id="selling-product">
      <div className="main-content w-75 bg-grey">
        <div className="container">
          <div className="wrapper-card bg-white py-4">
            <h5>Inventory</h5>

            <div className="border-top" />

            <div className="mb-3 py-2">
              <label
                htmlFor="exampleFormControlInput1"
                className="col-sm-3 col-form-label"
              >
                Name Product
              </label>
              <input
                type="text"
                className="form-control"
                id="input1"
                style={{ width: "20.5vw" }}
                value={data?.name}
                onChange={handleChange}
                name="name"
              />
            </div>
          </div>

          <div className="wrapper-card bg-white py-2 mt-4">
            <h5>Items Detail</h5>
            <div className="border-top" />
            <div className="mb-3 py-2">
              <label
                htmlFor="exampleFormControlInput1"
                className="col-sm-3 col-form-label"
              >
                Unit Price
              </label>
              <input
                type="text"
                className="form-control"
                id="input1"
                style={{ width: "20.5vw" }}
                value={data?.price}
                onChange={handleChange}
                name="price"
              />
            </div>
            <div className="mb-3 py-2">
              <label
                htmlFor="exampleFormControlInput1"
                className="col-sm-3 col-form-label"
              >
                Condition
              </label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="new"
                  value="new"
                  onChange={handleChange}
                  checked={data.condition === "new"}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Baru
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="condition"
                  id="second"
                  value="second"
                  onChange={handleChange}
                  checked={data.condition === "second"}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Bekas
                </label>
              </div>
            </div>
            <div className="mb-3 py-2">
              <label
                htmlFor="exampleFormControlInput1"
                className="col-sm-3 col-form-label"
              >
                Stock
              </label>
              <input
                type="text"
                className="form-control"
                id="input1"
                style={{ width: "20.5vw" }}
                value={data?.stock}
                onChange={handleChange}
                name="stock"
              />
            </div>
            <div className="mb-3 py-2">
              <label
                htmlFor="exampleFormControlInput1"
                className="col-sm-3 col-form-label"
              >
                Category
              </label>
              <select
                className="form-select form-select-md"
                aria-label="Default select example"
                style={{ width: "20.5vw" }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">-- Choose Category --</option>
                <option value="3">Action Figure</option>
                <option value="4">Baju</option>
                <option value="5">Sepatu</option>
                <option value="6">Celana</option>
                <option value="7">Laptop</option>
              </select>
            </div>
            {/* <div className="mb-3 py-2">
              <label
                htmlFor="exampleFormControlInput1"
                className="col-sm-3 col-form-label"
              >
                Stock
              </label>
              <input
                type="text"
                className="form-control"
                id="input1"
                style={{ width: "20.5vw" }}
                value={data?.category}
                onChange={handleChange}
                name="category"
              />
            </div> */}
          </div>
          <div className="wrapper-card bg-white py-2 mt-4">
            <h5>Photo Of Goods</h5>
            <div className="border-top" />
            <div className="mb-3 py-2">
              <div id="myDIV">
                <form encType="multipart/form-data">
                  <div className="mb-3">
                    <label htmlFor="fileInput" className="form-label">
                      Pilih Gambar
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={handleUpload}
                    />
                    {isError && <div className="error-text">{errorMsg}</div>}
                    {showImage && (
                      <img
                        src={showImage}
                        style={{
                          width: "20vh",
                          height: "13vh",
                          objectFit: "contain",
                        }}
                        alt="Uploaded"
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="wrapper-card bg-white py-2 mt-4 mb-4">
            <h5>Description</h5>
            <div className="border-top" />
            <div className="mb-3 py-2">
              <label
                htmlFor="exampleFormControlInput1"
                className="col-sm-3 col-form-label"
              >
                Description
              </label>
              <div className="form-outline mb-4">
                <textarea
                  className="form-control"
                  id="form6Example7"
                  rows="4"
                  value={data?.description}
                  name="description"
                  onChange={handleChange}
                >
                  {" "}
                </textarea>
                <label className="form-label" htmlFor="form6Example7"></label>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 col-2 mx-auto">
            <button
              className="btn btn-danger rounded-pill"
              type="button"
              onClick={handleSubmit}
              // disabled={imageError}
            >
              {loading ? "Loading..." : "Jual"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellingProduct;
