import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import propTypes from "prop-types";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyProductBySellerId,
  updateProduct,
} from "../../../../config/redux/action/productAction";
import Swal from "sweetalert2";

const ModalUpdateProduct = ({ item }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [saveImage, setSaveImage] = useState("");
  const { loading } = useSelector((state) => state.product);

  let [data, setData] = useState({
    name: "",
    price: "",
    color: "",
    size: "",
    stock: "",
    description: "",
    image: saveImage,
    seller_id: "",
    category_id: "",
  });

  useEffect(() => {
    setData({
      name: item.name,
      price: item.price,
      color: item.color,
      size: item.size,
      stock: item.stock,
      description: item.description,
      image: item.image,
      seller_id: item.seller_id,
      category_id: item.category_id,
    });
  }, []);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    // console.log(data);
  };

  const handleUpload = (e) => {
    const uploader = e.target.files[0];
    setSaveImage(uploader);
    // console.log(uploader);
  };

  const formData = new FormData();
  formData.append("image", saveImage);
  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("color", data.color);
  formData.append("size", data.size);
  formData.append("stock", data.stock);
  formData.append("description", data.description);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(updateProduct(item.id, formData));
      Swal.fire({
        title: "Success",
        text: "Update Product Success",
        icon: "success",
      });
      handleClose();
      dispatch(getMyProductBySellerId(item.seller_id));
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Update Product Failed",
        icon: "error",
      });
    }
  };
  return (
    <>
      <button
        className="btn btn-warning"
        type="button"
        style={{ marginRight: 8 }}
        onClick={handleShow}
      >
        <FaPen color="white" />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="file" onChange={handleUpload} name="image" />

          <Form.Control
            type="text"
            placeholder="Name Product"
            className="my-3"
            name="name"
            value={data?.name}
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Price"
            className="my-3"
            name="price"
            value={data?.price}
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Color"
            className="my-3"
            name="color"
            value={data?.color}
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Size"
            className="my-3"
            name="size"
            value={data?.size}
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            placeholder="Stock"
            className="my-3"
            name="stock"
            value={data?.stock}
            onChange={handleChange}
          />

          {/* <Form.Control
            type="text"
            placeholder="condition"
            className="my-3"
            name="stock"
            value={data?.condition}
            onChange={handleChange}
          /> */}
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: "100px" }}
            name="description"
            value={data?.description}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading.." : "Save Update Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalUpdateProduct.propTypes = {
  item: propTypes.any,
};
export default ModalUpdateProduct;
