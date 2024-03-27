import React from "react";
import { Modal } from "react-bootstrap";
import gopay from "../../../../assets/img/gopay.png";
import pos from "../../../../assets/img/pos.png";
import mastercard from "../../../../assets/img/mastercard.svg";
import PropTypes from "prop-types";
import Button from "../../../Base/button";
import { useDispatch } from 'react-redux'
import { AddOrder } from '../../../../config/redux/action/OrderAction.js'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Payment = ({ show, onHide, addressId, totalPrice, myBagList=[] }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()  

  const insertOrder = async () => {
    const orderData = {
      address_id: addressId,
      seller_id: "6",
      order_total: totalPrice,
      payment_method: "gopay",
      order_item: myBagList
    } 
    await dispatch(AddOrder(orderData))
    Swal.fire({
      icon: "success",
      title: "Order Success !",
    });
    navigate("/profile")  
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid" style={{height : 220, width:"100%", border:"2px solid #F4F4F4", marginBottom:5}}>
        <h5 style={{ fontWeight: 600, marginBottom: 20 }}>Payment method</h5>
        <div className="container">
          <div className="row " >
            <div className="col-4 " style={{height : 50, display: "flex", alignItems: "center"}}>
              <img src={gopay} alt="gopay" style={{ width: 80, height: 18,  }} />
            </div>
            <div className="col-7" style={{height : 50, display:"flex", alignItems: "center"}}>
              <p style={{paddingTop: 18}} >Gopay</p>
            </div>
            <div className="col-1" style={{height : 50, display: "flex", verticalAlign: "center"}}>
              <input type="checkbox" value="gopay" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row ">
            <div className="col-4" style={{height : 50, display: "flex", alignItems: "center"}}>
              <img
                src={pos}
                alt="pos indonesia"
                style={{ Width: 58, Height: 38,  }}
              />
            </div>
            <div className="col-7" style={{height : 50, display:"flex", alignItems: "center"}}>
              <p style={{paddingTop: 15}}>Pos Indonesia</p>
            </div>
            <div className="col-1" style={{height : 50, display: "flex", verticalAlign: "center"}}>
              <input type="checkbox" value="pos indonesia" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row "> 
            <div className="col-4" style={{height : 50, display: "flex", alignItems: "center"}}>
              <img
                src={mastercard}
                alt="mastercard"
                style={{ width: 52.95, height: 40.89,  }}
              />
            </div>
            <div className="col-7" style={{height : 50, display:"flex", alignItems: "center"}}>
              <p style={{paddingTop: 12}}>MasterCard</p>
            </div>
            <div className="col-1" style={{height : 50, display: "flex", verticalAlign: "center"}}>
              <input type="checkbox" value="masterCard" />
            </div>
          </div>
        </div>
        </div>
        <div className="container-fluid" style={{height : 220, width:"100%", border:"2px solid #F4F4F4", marginBottom:5}}>
        <h5 style={{ fontWeight: 600, marginBottom: 20 }}>Shopping summary</h5>
        <div className="row ">
          <div className="col-9"><p style={{ color: "#9B9B9B" }}>Order</p></div>
          <div className="col-3"><p style={{ fontWeight: 600 }}>Rp.1.000.000</p></div>
        </div>
        <div className="row ">
          <div className="col-9"><p style={{ color: "#9B9B9B" }}>Delivery</p></div>
          <div className="col-3"><p style={{ fontWeight: 600 }}>Rp. 5.000</p></div>
        </div>
        </div>

        <div className="container-fluid" style={{height : 70, width:"100%", border:"2px solid #F4F4F4"}}>
          <div className="row">
            <div className="col-7">
            <h5 style={{ fontWeight: 600 }}>Shopping summary</h5>
            <h6 style={{ color: "#DB3022" }}>Rp. 1.005.000</h6>
            </div>
            <div className="col-5">
            <Button
            child = "buy"
            style={{
              borderRadius: 15,
              backgroundColor: "#DB3022",
              width: 160,
              height: 36,
              marginTop: 15,
              color: "white",
            }}
            onClick={() => insertOrder()}
          >
          </Button>
            </div>
          </div>
          
          
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Payment;
