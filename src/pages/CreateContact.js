import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateContact = () => {
  // const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    vendor: "",
    date: "",
    quantity: "",
    description: "",
    availablequantity: "",
    damagequantity: "",
  });
  // const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(
      `https://long-gold-duck-hose.cyclic.app/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userDetails),
      }
    );
    const result = await res.json();
    if (!result.error) {
      toast.success(`Created [${userDetails.name}] contact`);

      setUserDetails({
        name: "",
        vendor: "",
        date: "",
        quantity: "",
        description: "",
        availablequantity: "",
        damagequantity: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <h2>Create your contact</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Name Of Product
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="vendorInput" className="form-label mt-4">
            Vendor Name
          </label>
          <input
            type="text"
            className="form-control"
            id="vendorInput"
            name="vendor"
            value={userDetails.vendor}
            onChange={handleInputChange}
            placeholder="Vendor Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateInput" className="form-label mt-4">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="dateInput"
            name="date"
            value={userDetails.date}
            onChange={handleInputChange}
            placeholder="date"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantityInput" className="form-label mt-4">
            quantity
          </label>
          <input
            type="Number"
            className="form-control"
            id="quantityInput"
            name="quantity"
            value={userDetails.quantity}
            onChange={handleInputChange}
            placeholder="quantity"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descriptionInput" className="form-label mt-4">
            description
          </label>
          <input
            type="description"
            className="form-control"
            id="descriptionInput"
            name="description"
            value={userDetails.description}
            onChange={handleInputChange}
            placeholder="description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="  availablequantityInput" className="form-label mt-4">
            availablequantity
          </label>
          <input
            type="number"
            className="form-control"
            id="availablequantityInput"
            name="availablequantity"
            value={userDetails.availablequantity}
            onChange={handleInputChange}
            placeholder="availablequantity"
          />
        </div>
        <div className="form-group">
          <label htmlFor=" damagequantityInput" className="form-label mt-4">
            damagequantity
          </label>
          <input
            type="number"
            className="form-control"
            id=" damagequantityInput"
            name="damagequantity"
            value={userDetails.damagequantity}
            onChange={handleInputChange}
            placeholder=" damagequantity"
          />
        </div>
        <input
          type="submit"
          value="Add Products"
          className="btn btn-info my-2"
        />
      </form>
    </>
  );
};

export default CreateContact;
