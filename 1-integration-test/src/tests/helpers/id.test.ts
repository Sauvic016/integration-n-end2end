import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../index";
import clearDB from "./reset-db";

describe("Get request", () => {
  beforeEach(async () => {
    console.log("clearing db");
    await clearDB();
  });
  it("should give the id that i want", async () => {
    const { status, body } = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    expect(status).toBe(200);
    expect(body).toEqual({ answer: 3, id: expect.any(Number) });
    const id = body.id;
    const reqest = await request(app).get("/request").query({
      id,
    });
    expect(reqest.status).toBe(200);
    expect(reqest.body).toEqual({ id, a: 1 });
  });
});
