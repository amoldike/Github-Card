import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "./card.css";
import { GoSearch } from "react-icons/go";

const Card = () => {
  const [username, setUsername] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((data1) => {
        setData(data1.data);
      })
      .catch((error1) => setError(error1));
  };
  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter your github username..!"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">
            <GoSearch size={23} style={{ marginBottom: "-0.2rem" }} />
          </button>
        </form>
      </div>

      {data ? (
        <div className="card-container">
          <div>
            <img src={data.avatar_url} alt="user-image" width={100} />
          </div>
          <div className="details">
            <p>Username : {data.login} </p>
            <p>Name : {data.name}</p>
            <p>Public repos : {data.public_repos}</p>
            <p>Public gists : {data.public_gists}</p>
            <p>Created at : {moment(data.created_at).format("YYYY/MM/DD")} </p>
          </div>
        </div>
      ) : (
        error && <h1 style={{ margin: "auto" }}>User not found</h1>
      )}
    </div>
  );
};

export default Card;
