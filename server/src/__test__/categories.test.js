const request = require("supertest");
const config = require("../app")


describe("get all categories", () => {
  /**
   * It should response the GET method
   */
  test("get categories should get 200 response", async done => {
    config.then(async app => {
      // expect.assertions(1);
      request(app)
        .get("/api-v1/category")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done)

    })
  })

  /**
   * It should response the GET method
   */
  test("get categories should fail response", async done => {
    config.then(async app => {
      // expect.assertions(1);
      request(app)
        .post("/api-v1/category")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(423423423400)
        .end(done)

    })
  })
})




