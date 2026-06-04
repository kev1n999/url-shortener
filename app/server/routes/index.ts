import { Router } from "express";

export const router = Router();

router.get("/", (req, res) => res.status(200).send("Hello World!"));