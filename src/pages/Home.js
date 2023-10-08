import React, { useContext } from "react";
// import {  } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate, useEffect } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  return (
    <>
      <div className="jumbotron">
        <h1>Welcome {user ? user.name : null}</h1>
        <hr className="my-4" />
        <Link to="/mycontacts">
          <a className="btn btn-info" href="#" role="button">
            Add Products
          </a>
        </Link>
      </div>
    </>
  );
};

export default Home;
