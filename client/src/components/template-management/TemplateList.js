import React, { useEffect, useState } from "react";
// import { Document, Page } from "react-pdf";
import axios from "axios";
import Navbar from "../NavBar";

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = () => {
    axios
      .get(" http://localhost:8000/fetchTemplate")
      // .then((response) => response.json())
      .then((data) => {
        setTemplates(data.data);
        console.log(data);
        // Separate images and files from the fetched templates
        const imageTemplates = data.data.filter((template) =>
          isImage(template.image)
        );
        const fileTemplates = data.data.filter(
          (template) => !isImage(template.image)
        );
        setImages(imageTemplates);
        setFiles(fileTemplates);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const isImage = (url) => {
    // Add logic to check if the URL points to an image file based on file extension or any other criteria
    // Example: Checking file extension using a regular expression
    const imageExtensions = /\.(jpeg|jpg|gif|png|bmp)$/i;
    return url && imageExtensions.test(url);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflowY: "auto",
        background: "lightgrey",
      }}
    >
      <div
        style={{ width: "20%", overflowY: "auto", backgroundColor: "#28282B" }}
      >
        <Navbar />
      </div>
      <div style={{ width: "80%", padding: "20px" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontFamily: "bold",
            color: "white",
            backgroundColor: "black",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          Templates
        </h1>
        {images.length === 0 && files.length === 0 ? (
          <p>No templates found</p>
        ) : (
          <div style={{ display: "flex", gap: "20px" }}>
            {images.length > 0 && (
              <div
                style={{
                  flex: "1",
                  backgroundColor: "white",
                  boxShadow: "0 0 2px 1px black",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    fontFamily: "bold",
                    color: "white",
                    backgroundColor: "black",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                >
                  Images
                </h2>
                <div>
                  {images.map((template) => (
                    <div
                      key={template._id}
                      style={{
                        borderBottom: "1px solid black",
                        paddingBottom: "20px",
                        marginLeft: "1rem",
                        marginTop: "1.7rem",
                      }}
                    >
                      <h3>{template.title}</h3>
                      <p
                        style={{
                          fontFamily: "bold",
                          textAlign: "left",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        Supervised By: {template.supervisedBy}
                      </p>
                      {template.image && template.image[0] && (
                        <img
                          src={`${template.image}`}
                          alt="Template Image"
                          width="200px"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {files.length > 0 && (
              <div
                style={{
                  flex: "1",
                  backgroundColor: "white",
                  boxShadow: "0 0 2px 1px black",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    fontFamily: "bold",
                    color: "white",
                    backgroundColor: "black",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                >
                  Files
                </h2>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tbody>
                    <tr>
                      <th
                        style={{
                          borderTop: "1px solid black",
                          borderBottom: "1px solid black",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          borderTop: "1px solid black",
                          borderBottom: "1px solid black",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Supervised By
                      </th>
                      <th
                        style={{
                          borderTop: "1px solid black",
                          borderBottom: "1px solid black",
                          padding: "10px",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        Download
                      </th>
                    </tr>
                    {files.map((template) => (
                      <tr key={template._id}>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            borderBottom: "1px solid black",
                            padding: "10px",
                          }}
                        >
                          <h3>{template.title}</h3>
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            borderBottom: "1px solid black",
                            padding: "10px",
                            textAlign: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "18px",
                              fontFamily: "Times New Roman",
                            }}
                          >
                            {template.supervisedBy}
                          </span>
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            borderBottom: "1px solid black",
                            padding: "10px",
                          }}
                        >
                          <a
                            href={`${template.image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download File
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateList;
