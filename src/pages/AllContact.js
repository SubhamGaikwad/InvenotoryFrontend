import React, { useContext, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const AllContact = () => {
  const { toast } = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]); // Store filtered contacts separately

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        const res = await fetch(
          `https://long-gold-duck-hose.cyclic.app/api/mycontacts`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        if (!result.error) {
          setContacts(result.contacts);
          setFilteredContacts(result.contacts); // Initialize filteredContacts with all contacts
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      try {
        const res = await fetch(
          `https://long-gold-duck-hose.cyclic.app/api/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          setFilteredContacts(result.myContacts); // Update filteredContacts after deletion
          toast.success("Deleted Product");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Handle search input changes and filter contacts in real-time
  const handleSearchSubmit = (input) => {
    const lowerCaseInput = input.toLowerCase();
    setSearchInput(input); // Update the searchInput state
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(lowerCaseInput)
    );
    setFilteredContacts(filtered);
  };
  return (
    <>
      <div>
        <h1>Your Products</h1>
        <a href="/mycontacts" className="btn btn-danger my-2">
          Reload Product
        </a>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Products..." />
        ) : (
          <>
            {contacts.length == 0 ? (
              <h3>No products created yet</h3>
            ) : (
              <>
                <form className="d-flex">
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search Product"
                    value={searchInput}
                    onChange={(e) => handleSearchSubmit(e.target.value)} // Pass the input value to the function
                  />
                  <button type="submit" className="btn btn-info mx-2">
                    Search
                  </button>
                </form>

                <p>
                  Your Total Products: <strong>{contacts.length}</strong>
                </p>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Name</th>
                      <th scope="col">Vendor</th>
                      <th scope="col">date</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Description</th>
                      <th scope="col">Available Quantity</th>
                      <th scope="col">Damage Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr
                        key={contact._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(contact);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{contact.name}</th>
                        <td>{contact.vendor}</td>
                        <td>{contact.date}</td>
                        <td>{contact.quantity}</td>
                        <td>{contact.description}</td>
                        <td>{contact.availablequantity}</td>
                        <td>{contact.damagequantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.name}</h3>
          <p>
            <strong>Vendor</strong>: {modalData.vendor}
          </p>
          <p>
            <strong>Date</strong>: {modalData.date}
          </p>
          <p>
            <strong>Quantity</strong>: {modalData.quantity}
          </p>
          <p>
            <strong>Description</strong>: {modalData.description}
          </p>
          <p>
            <strong>Availablequantity</strong>: {modalData.availablequantity}
          </p>
          <p>
            <strong>Damagequantity</strong>: {modalData.damagequantity}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteContact(modalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllContact;
