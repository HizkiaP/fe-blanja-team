import propTypes from "prop-types";
import "./storeProfile.css";
import defaultPhoto from "../../../../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { myProfileSeller } from "../../../../../config/redux/action/sellerAction";
import Button from "../../../../Base/button";
// import { useSelector } from "react-redux";
import { updateProfileSeller } from "../../../../../config/redux/action/sellerAction";
const StoreProfile = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    store_name: "",
    store_description: "",
  });
  const { loading, seller } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(myProfileSeller());
  }, []);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(updateProfileSeller(values));
      dispatch(myProfileSeller());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setValues({
      name: seller?.name || "",
      email: seller?.email || "",
      phone: seller?.phone || "",
      store_name: seller?.store_name || "",
      store_description: seller?.store_description || "",
    });
  }, [seller]);

  return (
    <section id="main-content">
      <div className="main-content w-75 bg-grey">
        <div className="container bg-white">
          <div className="wrapper-card">
            <h3 className="title mb-0">My Store Profile</h3>
            <span className="sub-title">Manage your profile information</span>
            <hr className="mb-4" />
            {loading ? (
              "loading..."
            ) : (
              <div className="row">
                <div className="col-lg-8">
                  <form>
                    <div className="row mb-3 ">
                      <label
                        htmlFor="name"
                        className="col-sm-3 col-form-label text-end"
                      >
                        Name
                      </label>
                      <div className="col-sm-7">
                        <input
                          name="name"
                          type="name"
                          className="form-control"
                          placeholder="Store Name"
                          id="name"
                          value={values.name}
                          onChange={onChange}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3 ">
                      <label
                        htmlFor="name"
                        className="col-sm-3 col-form-label text-end"
                      >
                        Store Name
                      </label>
                      <div className="col-sm-7">
                        <input
                          name="store_name"
                          type="name"
                          className="form-control"
                          placeholder="Store Name"
                          id="name"
                          value={values.store_name}
                          onChange={onChange}
                          // onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="email"
                        className="col-sm-3 col-form-label text-end"
                      >
                        Email
                      </label>
                      <div className="col-sm-7">
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          id="email"
                          onChange={onChange}
                          value={values.email}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="phone-number"
                        className="col-sm-3 col-form-label text-end"
                      >
                        Phone Number
                      </label>
                      <div className="col-sm-7">
                        <input
                          name="phone"
                          type="phone-number"
                          className="form-control"
                          placeholder="Phone Number"
                          id="phone-number"
                          onChange={onChange}
                          value={values.phone}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-3 col-form-label text-end">
                        Store Description
                      </label>
                      <div className="col-sm-7">
                        <textarea
                          name="store_description"
                          className="form-control"
                          placeholder="Store Description"
                          id="floatingTextarea2"
                          style={{ height: 200 }}
                          onChange={onChange}
                          value={values.store_description}
                        />
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                      <div className="col-sm-7 text-center">
                        <button
                          className="btn btn-danger"
                          onClick={handleSubmit}
                        >
                          Save
                        </button>
                      </div>
                    </div> */}
                    <Button
                      child="Save"
                      style={{
                        backgroundColor: "#DB3022",
                        color: "#FFFFFF",
                        marginLeft: "9rem",
                        marginTop: "1rem",
                        width: "90px",
                      }}
                      onClick={handleEdit}
                    />
                  </form>
                </div>

                <div className="col-lg-4 text-center">
                  {seller?.image ? (
                    <img
                      width="110px"
                      height="110px"
                      style={{ borderRadius: 9999, objectFit: "cover" }}
                      src={seller?.image}
                      alt="my_image"
                    />
                  ) : (
                    <img
                      width="110px"
                      height="110px"
                      style={{ borderRadius: 9999, objectFit: "cover" }}
                      src={defaultPhoto}
                      alt="blank_picture"
                    />
                  )}
                  <div className="mb-3 upload-img mt-4 text-dark">
                    <h5>{seller?.name}</h5>
                  </div>
                  {/* <div className="mb-3 button-upload mt-4 text-dark">
                    <button
                      className="btn btn-secondary"
                      onChange={handleChangeImage}
                    >
                      Upload file
                    </button>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

StoreProfile.propTypes = {
  seller: propTypes.any,
  showImage: propTypes.any,
  handleChangeImage: propTypes.any,
  handleChange: propTypes.any,
  handleSubmit: propTypes.any,
  loading: propTypes.any,
  image: propTypes.any,
};
export default StoreProfile;
