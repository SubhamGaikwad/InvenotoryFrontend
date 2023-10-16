import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  return (
    <div className="jumbotron">
      <h1>Welcome {user ? user.name : null}</h1>
      <hr className="my-4" />
      <Link to="/mycontacts" className="btn btn-info" role="button">
        Add Products
      </Link>
    </div>
  );
};

export default Home;
