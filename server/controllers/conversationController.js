import Conversation from "../modal/Conversation.js";

export const setChat = async (request, response) => {
  let senderId = request.body.sender;
  let receiverId = request.body.receiver;

  const exist = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (exist) {
    response.status(200).json(exist);
    return;
  }
  const newConversation = new Conversation({
    members: [senderId, receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    response.status(200).json(savedConversation);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const setGroupChat = async (req, res) => {
  let senderId = req.body.sender;
  let receiverId = req.body.receiver;

  const exist = await Conversation.findOne({
    members: { $in: [receiverId] },
  });

  if (exist) {
    res.status(200).json(exist);
    return;
  }
  const newConversation = new Conversation({
    members: [receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const getConversation = async (request, response) => {
//     try {
//         const conversation = await Conversation.findOne({ members: { $all: [ request.body.senderId, request.body.receiverId] }});
//         response.status(200).json(conversation);
//     } catch (error) {
//         response.status(500).json(error);
//     }

// }
