import React, { useState } from "react";
import NavBar from "../NavBar";

const Template = () => {
  const [title, setTitle] = useState("");
  const [supervisedBy, setSupervisedBy] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("supervisedBy", supervisedBy);
    formData.append("image", image);

    // Send the form data to the endpoint
    fetch("http://localhost:8000/template", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the server
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "lightgrey" }}>
      <div style={{ width: "20%", backgroundColor: "#28282B" }}>
        <NavBar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "50%", margin: "20rem" }}>
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "0 0 2px 1px black",
              borderRadius: "10px",
              padding: "5%",
            }}
          >
            <h1
              style={{
                backgroundColor: "black",
                color: "white",
                margin: 0,
                padding: "10px",
                borderRadius: "10px 10px 0 0",
              }}
            >
              Template Form
            </h1>
            <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ marginRight: "10px" }}>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ marginRight: "10px" }}>Supervised By:</label>
                <input
                  type="text"
                  value={supervisedBy}
                  onChange={(e) => setSupervisedBy(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ marginRight: "10px" }}>Image:</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  style={{
                    width: "100%",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "8px 12px",
                  borderRadius: "5px",
                  background: "black",
                  color: "white",
                  border: "none",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
