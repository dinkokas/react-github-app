import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useState } from "react";
import Result from "./Result";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [userRepoData, setUserRepoData] = useState([]);
  const [error, setError] = useState("");
  const [hasUser, setHasUser] = useState(false);

  const object = {
    name: name,
    bio: bio,
    location: location,
    userAvatar: userAvatar,
    userRepoData: userRepoData,
  };

  //
  const fetchUserData = async () => {
    const userData = await fetch(`https://api.github.com/users/${searchInput}`);
    const userDataJson = await userData.json();
    if (userDataJson.message) {
      setError(userDataJson.message);
      setHasUser(false);
    } else {
      // Set states
      setUserAvatar(userDataJson.avatar_url);
      setName(userDataJson.name);
      setLocation(userDataJson.location);
      setBio(userDataJson.bio);
      //
      const userRepoData = await fetch(
        `https://api.github.com/users/${searchInput}/repos`
      );
      const userRepoDataJson = await userRepoData.json();
      //Set states
      setUserRepoData(userRepoDataJson);
      setError(null);
      setHasUser(true);
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="searchPage">
      {hasUser ? (
        <div></div>
      ) : (
        <div className="searchBar">
          <Form onSubmit={fetchUserData}>
            <Form.Field>
              <label style={{ fontSize: "18px", padding: "12px 0" }}>
                Enter Github username:
              </label>
              <input
                style={{ fontSize: "15px", padding: "12px" }}
                placeholder="e.g. scaledrone"
                name="name"
                onChange={handleSearch}
              />
            </Form.Field>
            <Button
              type="submit"
              style={{ fontSize: "14px", fontWeight: "bold" }}
            >
              Search
            </Button>
          </Form>
        </div>
      )}
      {hasUser ? <Result data={object} /> : <h1>{error}</h1>}
      {hasUser ? (
        <Button
          onClick={() => {
            setHasUser(false);
          }}
          className="backButton"
        >
          Back to search
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Search;
