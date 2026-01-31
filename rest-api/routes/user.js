import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.send(Object.values(req.context.models.users)));
router.post("/", (req, res) => res.send("User POST request!"));
router.get("/:userId", (req, res) => res.send(req.context.models.users[req.params.userId]));
router.put("/:userId", (req, res) => res.send(`User PUT request on /users/${req.params.userId}!`));
router.delete("/:userId", (req, res) => res.send(`User DELETE request on /users/${req.params.userId}!`));

export default router;