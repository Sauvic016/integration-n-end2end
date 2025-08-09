import { beforeEach, describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../index";
import clearDb from "./reset-db";

describe("POST /sum", () => {
  beforeEach(async () => {
    console.log("clearing db");
    await clearDb();
  });
  it("should add 2 numbers", async () => {
    const { status, body } = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    expect(status).toBe(200);
    expect(body).toEqual({ answer: 3, id: expect.any(Number) });
  });
  it("should  add 2 negative numbers", async () => {
    const { status, body } = await request(app).post("/sum").send({
      a: -1,
      b: -2,
    });

    expect(status).toBe(200);
    expect(body).toEqual({ answer: -3, id: expect.any(Number) });
  });
});
