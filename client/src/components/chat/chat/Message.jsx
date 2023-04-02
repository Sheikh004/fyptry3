import { useContext } from "react";
import officeIcon from "../../../assets/office.png";
import { Box, styled, Typography } from "@mui/material";
import { GetApp as GetAppIcon } from "@mui/icons-material";

import { downloadMedia, formatDate } from "../../../utils/common-utils";
// import { iconPDF } from "../../../constants/data";

const Wrapper = styled(Box)`
  background: #ffffff;
  padding: 5px;
  max-width: 60%;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Own = styled(Box)`
  background: #dcf8c6;
  padding: 5px;
  max-width: 60%;
  width: fit-content;
  margin-left: auto;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;
`;

const Message = ({ message }) => {
  return (
    <>
      {message.senderId === "641800d14c144769799107e6" ? (
        <Own>
          {message.type === "file" ? (
            <ImageMessage message={message} />
          ) : (
            <TextMessage message={message} />
          )}
        </Own>
      ) : (
        <Wrapper>
          {message.type === "file" ? (
            <ImageMessage message={message} />
          ) : (
            <TextMessage message={message} />
          )}
        </Wrapper>
      )}
    </>
  );
};

const TextMessage = ({ message }) => {
  return (
    <>
      <Text>{message.text}</Text>
      <Time>{formatDate(message.createdAt)}</Time>
    </>
  );
};

const ImageMessage = ({ message }) => {
  return (
    <div style={{ position: "relative" }}>
      {(message?.text?.includes(".png") ||
        message?.text?.includes(".jpg") ||
        message?.text?.includes(".jpeg")) && (
        <img
          style={{ width: 300, height: "100%", objectFit: "cover" }}
          src={message.text}
          alt={message.text}
        />
      )}
      {message?.text?.includes(".pdf") && (
        <div style={{ display: "flex" }}>
          <img
            src={
              "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png"
            }
            alt="pdf-icon"
            style={{ width: 80 }}
          />
          <Typography style={{ fontSize: 14 }}>
            {message.text.split("--").pop()}
          </Typography>
        </div>
      )}
      {!message?.text?.includes(".pdf") &&
        !message?.text?.includes(".png") &&
        !message?.text?.includes(".jpeg") &&
        !message?.text?.includes(".jpg") && (
          <div style={{ display: "flex" }}>
            <img src={officeIcon} alt="pdf-icon" style={{ width: 80 }} />
            <Typography style={{ fontSize: 14 }}>
              {message.text.split("--").pop()}
            </Typography>
          </div>
        )}
      <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
        <GetAppIcon
          onClick={(e) => downloadMedia(e, message.text)}
          fontSize="small"
          style={{
            marginRight: 10,
            border: "1px solid grey",
            borderRadius: "50%",
          }}
        />
        {formatDate(message.createdAt)}
      </Time>
    </div>
  );
};

export default Message;
