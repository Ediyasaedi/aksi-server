const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

const adminData = {
  email: "admin5@mail.com",
  password: "admin123",
  role: "admin",
};

const userData = {
  email: "siswa@mail.com",
  password: "siswa123",
  role: "siswa",
};

let tokenadmin = "";
let userId = 0;

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
  }
});

describe("Register Admin || Success Case", () => {
  test("Should send object with keys: email, role", (done) => {
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

describe("Register Admin || Error Case", () => {
  test("Failed because of email and password is null", (done) => {
    const nullAdmin = { ...adminData, email: "", password: "" };
    request(app)
      .post("/addadmin")
      .send(nullAdmin)
      .end(function (err, res) {
        const errors = [
          "Validation isEmail on email failed",
          "Validation notEmpty on email failed",
          "Validation notEmpty on password failed",
        ];
        if (err) throw err;
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(expect.arrayContaining(errors));
        done();
      });
  });
});

describe("Register User || Success Case", () => {
  test("Should send object with keys: token", (done) => {
    request(app)
      .post("/app/register")
      .send(userData)
      .end(function (err, res) {
        userId = res.body.id;
        if (err) throw err;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("email", userData.email);
        expect(res.body).toHaveProperty("role", userData.role);
        expect(res.body).not.toHaveProperty("password");
        done();
      });
  });
});

describe("Register User || Error Case", () => {
  test("Failed because of email and password is null", (done) => {
    const nullUser = { ...userData, email: "", password: "" };
    request(app)
      .post("/app/register")
      .send(nullUser)
      .end(function (err, res) {
        const errors = [
          "Validation isEmail on email failed",
          "Validation notEmpty on email failed",
          "Validation notEmpty on password failed",
        ];
        if (err) throw err;
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(expect.arrayContaining(errors));
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
        tokenadmin = res.body.token;
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body).not.toHaveProperty("password");
        done();
      });
  });
});

describe("Login Admin || Error Case", () => {
  test("Failed because of wrong password", (done) => {
    const wrong_password = { ...adminData, password: "123456" };
    request(app)
      .post("/login")
      .send(wrong_password)
      .end(function (err, res) {
        const errors = ["invalid email or password"];
        if (err) throw err;
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(expect.arrayContaining(errors));
        done();
      });
  });
  test("Failed because of email not ready at database", (done) => {
    const wrong_email = { ...adminData, email: "jhondoe55@mail.com" };
    request(app)
      .post("/login")
      .send(wrong_email)
      .end(function (err, res) {
        const errors = ["invalid email or password"];
        if (err) throw err;
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(expect.arrayContaining(errors));
        done();
      });
  });
  test("Failed because role user not admin", (done) => {
    request(app)
      .post("/login")
      .send(userData)
      .end(function (err, res) {
        const errors = ["invalid email or password"];
        if (err) throw err;
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(expect.arrayContaining(errors));
        done();
      });
  });
});

describe("Login User || Success Case", () => {
  test("Should send object with keys: token", (done) => {
    request(app)
      .post("/app/login")
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

describe("Login User || Error Case", () => {
  test("Failed because of wrong password", (done) => {
    const wrong_password = { ...userData, password: "123456" };
    request(app)
      .post("/app/login")
      .send(wrong_password)
      .end(function (err, res) {
        const errors = ["invalid email or password"];
        if (err) throw err;
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(expect.arrayContaining(errors));
        done();
      });
  });
  test("Failed because of email not ready at database", (done) => {
    const wrong_email = { ...adminData, email: "jhondoe55@mail.com" };
    request(app)
      .post("/app/login")
      .send(wrong_email)
      .end(function (err, res) {
        const errors = ["invalid email or password"];
        if (err) throw err;
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty("errors", expect.any(Array));
        expect(res.body.errors).toEqual(expect.arrayContaining(errors));
        done();
      });
  });
});

describe("Get User by Admin based on User Role || Success Case", () => {
  test("Should send object with keys: users", (done) => {
    let role = "siswa";
    request(app)
      .get("/admin/user/role/" + role)
      .set("access_token", tokenadmin)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("users");
        done();
      });
  });
});

describe("Get User by Admin based on User Role || Failed Case", () => {
  test("Failed because access token not set", (done) => {
    let role = "siswa";
    request(app)
      .get("/admin/user/role/" + role)
      .end(function (err, res) {
        const errors = ["invalid email or password"];
        if (err) throw err;
        expect(res.status).toBe(401);
        expect(res.body.errors).toEqual(expect.arrayContaining(errors));
        done();
      });
  });
  // test("Failed because role is integer", (done) => {
  //   let role = 1234;
  //   request(app)
  //     .get("/admin/user/role/" + role)
  //     .set("access_token", tokenadmin)
  //     .end(function (err, res) {
  //       const errors = ["data not found"];
  //       if (err) throw err;
  //       expect(res.status).toBe(500);
  //       done();
  //     });
  // });
});

describe("Get User by Admin based on User ID || Success Case", () => {
  test("Should send object with keys: user", (done) => {
    request(app)
      .get("/admin/user/" + userId)
      .set("access_token", tokenadmin)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("user");
        done();
      });
  });
});

describe("Update User || Success Case", () => {
  test("Should send object with keys: msg", (done) => {
    let update_user = {
      ...userData,
      name: "Siswa Baik",
      img_url: "url.com/img",
    };
    request(app)
      .put(`/admin/user/${userId}`)
      .set("access_token", tokenadmin)
      .send(update_user)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("msg", expect.any(String));
        done();
      });
  });
});

describe("Delete User || Success Case", () => {
  test("Should send object with keys: msg", (done) => {
    request(app)
      .delete(`/admin/user/${userId}`)
      .set("access_token", tokenadmin)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("msg", expect.any(String));
        done();
      });
  });
});
