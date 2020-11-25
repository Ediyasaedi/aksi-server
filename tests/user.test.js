const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

const adminData = {
  email: "admin5@mail.com",
  password: "admin123",
  role: "admin",
};

afterAll(function (done) {
  if (process.env.NODE_ENV == "test") {
    User.destroy({
      where: {
        role: adminData.role,
      },
    })
      .then((_) => {
        done();
      })
      .catch((err) => done(err));
  }
});

describe("Register Admin || Success Case", () => {
  test("Should send object with keys: token", (done) => {
    request(app)
      .post("/addadmin")
      .send(adminData)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("email", adminData.email);
        expect(res.body).toHaveProperty("role", adminData.role);
        expect(res.body).not.toHaveProperty("password");
        done();
      });
  });
});

describe("Login Admin || Success Case", () => {
  test("Should send object with keys: token", (done) => {
    request(app)
      .post("/login")
      .send(adminData)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body).not.toHaveProperty("password");
        done();
      });
  });
});
