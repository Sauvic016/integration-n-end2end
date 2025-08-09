import express from "express";
import { prismaClient } from "./db";

export const app = express();

app.use(express.json());

app.post("/sum", async (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  if (a > 10000000 || b > 10000000) {
    return res.status(422).json({
      message: "Sorry we don't support big numbers",
    });
  }
  const result = a + b;
  const request = await prismaClient.request.create({
    data: {
      a,
      b,
      answer: result,
      type: "ADD",
    },
  });
  res.json({ answer: result, id: request.id });
});

app.post("/multiply", async (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  if (a > 10000 || b > 10000) {
    return res.status(422).json({
      message: "Sorry we don't support big numbers",
    });
  }
  const result = a * b;
  const request = await prismaClient.request.create({
    data: {
      a,
      b,
      answer: result,
      type: "MUL",
    },
  });
  res.json({ answer: result, id: request.id });
});

app.get("/request", async (req, res) => {
  try {
    const id = Number(req.query.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const request = await prismaClient.request.findUnique({
      where: { id },
    });
    if (!request) throw new Error();
    res.json({ id: request.id, a: request.a });
  } catch (e) {
    res.status(404).json({ error: "Request not found" });
  }
});
