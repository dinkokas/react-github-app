import React from "react";
import PropTypes from "prop-types";

const Result = (props) => {
  const { data } = props;
  console.log("Ovo je data u results", data);

  const listRepos =
    data.userRepoData.length !== 0 ? (
      data.userRepoData.map((item) => <li key={item.id}>{item.name}</li>)
    ) : (
      <li>No repositories found!</li>
    );
  return (
    <div className="result">
      <div className="userData">
        <div>
          <img src={data.userAvatar} alt="#" />
        </div>
        <div>
          <h3>{data.name}</h3>
          <p>Location: {data.location}</p>
          <p>Bio: {data.bio}</p>
        </div>
      </div>
      <div className="repoData">
        <div>
          <h3>Public repositores:</h3>
          <ul>{listRepos}</ul>
        </div>
      </div>
    </div>
  );
};

Result.propTypes = {
  data: PropTypes.obj,
};

export default Result;
