import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
// import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(
      `https://long-gold-duck-hose.cyclic.app/api/contact`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, ...userDetails }),
      }
    );
    const result = await res.json();
    if (!result.error) {
      toast.success(`updated [${userDetails.name}] contact`);

      setUserDetails({
        name: "",
        vendor: "",
        date: "",
        quantity: "",
        description: "",
        availablequantity: "",
        damagequantity: "",
      });
      navigate("/mycontacts");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://long-gold-duck-hose.cyclic.app/api/contact/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        setUserDetails({
          name: result.name,
          vendor: result.vendor,
          date: result.date,
          description: result.description,
          availablequantity: result.availablequantity,
          damagequantity: result.damagequantity,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(); // Call the async function here
  }, [id]); // Dependency array with 'id'

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <>
          <h2>Edit your Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput" className="form-label mt-4">
                Name Of Product
              </label>
              <input
                type="text"
                className="form-control"
                id="name" // Duplicate ID
                name="nameInput"
                value={userDetails.name}
                onChange={handleInputChange}
                placeholder="Product Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="vendorInput" className="form-label mt-4">
                Vendor
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
                Quantity
              </label>
              <input
                type="number"
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
                type="text"
                className="form-control"
                id="descriptionInput"
                name="description"
                value={userDetails.description}
                onChange={handleInputChange}
                placeholder="description"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="availablequantityInput" // Duplicate ID
                className="form-label mt-4"
              >
                availablequantity
              </label>
              <input
                type="number"
                className="form-control"
                id="availablequantityInput" // Duplicate ID
                name="availablequantity"
                value={userDetails.availablequantity}
                onChange={handleInputChange}
                placeholder=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="damageInput" className="form-label mt-4">
                damagequantity
              </label>
              <input
                type="number"
                className="form-control"
                id="damagequantity"
                name="damagequantity"
                value={userDetails.damagequantity}
                onChange={handleInputChange}
                placeholder="damagequantity"
              />
            </div>
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-info my-2"
            />
          </form>
        </>
      )}
    </>
  );
};

export default EditContact;
