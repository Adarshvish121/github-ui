import React, { useState } from 'react'
import axios from 'axios';

function GitProfile() {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
  
    const handleChange = (event) => {
      setUsername(event.target.value);
    }; 
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
        setUserData(null);
      }
    };
  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Fetch</button>
      </form>
      {userData && (
        <div className="card-Profile">
          <img src={userData.avatar_url} alt={userData.login} />
          <h2>{userData.login}</h2>
          <p>{userData.name}</p>
          <p>{userData.username}</p>
          <span className="repos">Public Repos: {userData.public_repos}</span><br />
          <span className="gists">Public Gists: {userData.public_gists}</span>
          <p>{userData.username}</p>

          <p>
            {" "}
            Profile Created At:{" "}
            {new Date(userData.created_at).toISOString().slice(0, 10)}
          </p>
        </div>
      )}
    </div>
  )
}

export default GitProfile;
