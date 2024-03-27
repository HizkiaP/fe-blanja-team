import AddANewModal from "../../../Modal/AddANewAddress/AddANewAddress";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  myAddress,
} from "../../../../../config/redux/action/AddressAction";
import Swal from "sweetalert2";
import ModalUpdateAddress from "../../../Modal/ModalUpdateAddress";

const ShippingAddress = () => {
  const [showSecondModal, setShowSecondModal] = useState(false);
  const handleShowSecondModal = () => setShowSecondModal(true);
  const handleCloseSecondModal = () => setShowSecondModal(false);
  const dispatch = useDispatch();

  const { addressList } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(myAddress());
  }, [dispatch]);

  const handleDeleteAddres = async (id) => {
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
        await dispatch(deleteAddress(id));
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
    // navigate("/");
    dispatch(myAddress());
  };
  return (
    <section className="bg-light" id="shippingAddress">
      <div className="main-content mt-5 w-75">
        <div className="container bg-white px-5 py-5">
          <div className="wrapper-card ">
            <h3 className="title mb-0">Choose Another Address</h3>
            <span className="sub-title">Manage your Shipping Address</span>
            <hr className="mb-4" />
            <div className="row mt-5 d-grid">
              <button
                className="btn btn-danger"
                type="button"
                style={{
                  // width: "80%",
                  border: "1px dashed grey",
                  height: "40px",
                  lineHeight: "20px",
                  textAlign: "center",
                  marginBottom: "40px",
                }}
                onClick={handleShowSecondModal}
              >
                <span>Add New Address</span>
                <AddANewModal
                  showMe={showSecondModal}
                  onHideMe={handleCloseSecondModal}
                />
              </button>
            </div>
            <div className="row mt-3">
              <div className="card">
                {addressList?.map((item) => (
                  <div className="card-body" key={item.id}>
                    <h5>{item?.name_recipient}</h5>

                    <p>
                      <span>{`${item.street}, ${item.city}`} </span>
                      <br />
                      <div className="position-relative">
                        <div className="position-absolute bottom-50 end-0">
                          <ModalUpdateAddress item={item} />
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDeleteAddres(item.id);
                            }}
                          >
                            <FaTrash size={15} />
                          </button>
                        </div>
                      </div>
                      <span>{item?.postal_code}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingAddress;
