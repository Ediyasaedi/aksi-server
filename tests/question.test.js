const request = require("supertest");
const app = require("../app");
const { Wacana, User, Question } = require("../models");

let initial_token_admin = "";
let IdUser = null;
let IdWacana = null;
let IdQuestion = null;

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

const questionData = {
  soal: "dummy soal",
  pilihan_a: "pilihan a",
  pilihan_b: "pilihan b",
  pilihan_c: "pilihan c",
  pilihan_d: "pilihan d",
  kunci_jawaban: "pilihan a",
  img_url: "url.com/img",
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

    Question.destroy({
      where: {
        soal: questionData.soal,
      },
    });
  }
});

describe("Add Question || Success Case", () => {
  test("Should send object with keys: newQuestion", (done) => {
    request(app)
      .post("/admin/question")
      .set("access_token", initial_token_admin)
      .send(questionData)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("newQuestion", expect.any(Object));
        IdQuestion = res.body.newQuestion.id;
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
