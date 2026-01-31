import { v4 as uuidv4 } from "uuid";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.send(Object.values(req.context.models.messages)));
router.get("/:messageId", (req, res) => res.send(req.context.models.messages[req.params.messageId]));
router.post("/", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});
router.put("/:messageId", (req, res) => {
  const message = req.context.models.messages[req.params.messageId];
  if (message.userId !== req.context.me.id) return res.send("You are not authorized to update this message!");

  const newMessages = {
    ...req.context.models.messages,
    [message.id]: {
      ...message,
      text: req.body.text,
    },
  };

  req.context.models.messages = newMessages;
  return res.send(req.context.models.messages);
});
router.delete("/:messageId", (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;