const request = require("supertest");
const app = require("../app");
const { Wacana, User, Article } = require("../models");

let initial_token_admin = "";
let IdUser = null;
let IdWacana = null;
let IdArticle = null;

const adminData = {
  email: "admin5@mail.com",
  password: "admin123",
  role: "admin",
};

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

const articleData = {
  title: "Article Title",
  img_url: "url.com/img",
  content: "content artikel",
  WacanaId: IdWacana,
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

  request(app)
    .post("/admin/wacana")
    .set("access_token", initial_token_admin)
    .send(wacana_data)
    .end(function (err, res) {
      if (err) throw err;
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("newWacana", expect.any(Object));
      IdWacana = res.body.newWacana.id;
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

    Article.destroy({
      where: {
        title: articleData.title,
      },
    });
  }
});

describe("Add Artikel || Success Case", () => {
  test("Should send object with keys: newArticle", (done) => {
    request(app)
      .post("/admin/article")
      .set("access_token", initial_token_admin)
      .send(articleData)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("newArticle", expect.any(Object));
        IdArticle = res.body.newArticle.id;
        done();
      });
  });
});

// describe("Read Question by IdWacana || Success Case", () => {
//   test("Should send object with keys: question", (done) => {
//     request(app)
//       .get("/admin/question/" + IdWacana)
//       .set("access_token", initial_token_admin)
//       .end(function (err, res) {
//         if (err) throw err;
//         expect(res.status).toBe(200);
//         expect(res.body).toHaveProperty("question", expect.any(Object));
//         done();
//       });
//   });
// });
