const request = require("supertest");
const app = require("../app");
const { Wacana, User } = require("../models");

const adminData = {
  email: "admin5@mail.com",
  password: "admin123",
  role: "admin",
};

let initial_token_admin = "";
let IdUser = null;
let IdWacana = null;

const userData = {
  email: "penulis@mail.com",
  password: "penulis123",
  role: "penulis",
  name: "Penulis Baik",
  img_url: "url.com/penulis",
};

const wacana_data = {
  title: "Title Wacana",
  img_url: "url.com/img",
  kelas: 10,
  UserId: IdUser,
};

beforeAll(function (done) {
  request(app)
    .post("/addadmin")
    .send(adminData)
    .end(function (err, res) {
      if (err) throw err;
      request(app)
        .post("/login")
        .send(adminData)
        .end(function (err, res) {
          if (err) throw err;
          initial_token_admin = res.body.token;
          done();
        });
    });

  request(app)
    .post("/admin/user")
    .set("access_token", initial_token_admin)
    .send(userData)
    .end(function (err, res) {
      if (err) throw err;
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("name", userData.name);
      IdUser = res.body.id;
      done();
    });
});

afterAll(function (done) {
  if (process.env.NODE_ENV == "test") {
    User.destroy({
      where: {
        role: [adminData.role, userData.role],
      },
    })
      .then((_) => {
        done();
      })
      .catch((err) => done(err));

    Wacana.destroy({
      where: {
        title: wacana_data.title,
      },
    });
  }
});

describe("Add Wacana || Success Case", () => {
  test("Should send object with keys: newWacana", (done) => {
    request(app)
      .post("/admin/wacana")
      .set("access_token", initial_token_admin)
      .send(wacana_data)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("newWacana", expect.any(Object));
        IdWacana = res.body.id;
        done();
      });
  });
});

describe("Read Wacana by Admin || Success Case", () => {
  test("Should send object with keys: wacanas", (done) => {
    request(app)
      .get("/admin/wacana")
      .set("access_token", initial_token_admin)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("wacanas", expect.any(Object));
        done();
      });
  });
});

describe("Read Wacana by Mobile App || Success Case", () => {
  test("Should send object with keys: wacanas", (done) => {
    request(app)
      .get("/app/wacanas")
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("wacanas", expect.any(Object));
        done();
      });
  });
});

describe("Read Wacana by Admin Based On Kelas || Success Case", () => {
  test("Should send object with keys: wacanas", (done) => {
    request(app)
      .get(`/admin/wacana/sort/${10}`)
      .set("access_token", initial_token_admin)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("wacanas", expect.any(Object));
        done();
      });
  });
});

// describe("Read Wacana by Admin Based On ID || Success Case", () => {
//   test("Should send object with keys: wacana", (done) => {
//     request(app)
//       .get(`/admin/wacana/${IdWacana}`)
//       .set("access_token", initial_token_admin)
//       .end(function (err, res) {
//         if (err) throw err;
//         expect(res.status).toBe(200);
//         expect(res.body).toHaveProperty("wacana", expect.any(Object));
//         done();
//       });
//   });
// });
