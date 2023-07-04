import { KJUR } from "jsrsasign";
export const zoomAuth = async (req, res) => {
  try {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;

    const oHeader = { alg: "HS256", typ: "JWT" };

    const oPayload = {
      sdkKey: process.env.ZOOM_MEETING_SDK_KEY,
      mn: req.body.meetingNumber,
      role: req.body.role,
      iat: iat,
      exp: exp,
      appKey: process.env.ZOOM_MEETING_SDK_KEY,
      tokenExp: iat + 60 * 60 * 2,
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const signature = KJUR.jws.JWS.sign(
      "HS256",
      sHeader,
      sPayload,
      process.env.ZOOM_MEETING_SDK_SECRET
    );

    res.status(200).json({
      signature: signature,
    });
  } catch (err) {
    console.log(err);
    res.status(500).josn(err);
  }
};
