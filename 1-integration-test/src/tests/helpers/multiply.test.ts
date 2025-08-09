import { beforeAll, describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../index";
import clearDb from "./reset-db";

describe("POST /multiply", () => {
  beforeAll(async () => {
    console.log("clearing db");
    await clearDb();
  });
  it("should mulitply  2 numbers", async () => {
    const { status, body } = await request(app).post("/multiply").send({
      a: 1,
      b: 2,
    });

    expect(status).toBe(200);
    expect(body).toEqual({ answer: 2, id: expect.any(Number) });
  });
  it("should multiply 2 negative numbers", async () => {
    const { status, body } = await request(app).post("/multiply").send({
      a: -21,
      b: 12,
    });

    expect(status).toBe(200);
    expect(body).toEqual({ answer: -252, id: expect.any(Number) });
  });
});
