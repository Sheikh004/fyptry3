import { useEffect } from "react";
import { uploadFile } from "../../../api/api";
import { EmojiEmotions, AttachFile, Mic } from "@mui/icons-material";
import { Box, styled, InputBase } from "@mui/material";

const Container = styled(Box)`
  height: 100%;
  background: #052f72;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: white;
  }
  padding-left: 90px;
`;

const Search = styled(Box)`
  border-radius: 18px;
  background-color: #ffffff;
  width: calc(100% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  padding-right: 530px;
  font-size: 14px;
  height: 20px;
  overflow: visible;
  direction: ltr;
`;

const ClipIcon = styled(AttachFile)`
  transform: "rotate(40deg)";
`;

const Footer = ({ sendText, value, setValue, setFile, file, setForm }) => {
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("fileName", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        console.log(response.data);
        setForm(response.data);
      }
    };
    getImage();
  }, [file]);

  const onFileChange = (e) => {
    setValue(e.target.files[0].name);
    setFile(e.target.files[0]);
  };

  return (
    <Container>
      <label htmlFor="fileInput">
        <ClipIcon />
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => onFileChange(e)}
      />

      <Search>
        <InputField
          placeholder="Type a message"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => sendText(e)}
          value={value}
        />
      </Search>
    </Container>
  );
};

export default Footer;
