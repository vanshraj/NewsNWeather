let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let User = require("../models/user");
let should = chai.should();
let assert = chai.assert
chai.use(chaiHttp);

describe('User Api', () => {
  let testUser = {
    'name':'john doe',
    'password':'johndoe123',
    'email':'foo@bar.com'
  }
  let testLogin = {
    'password':'johndoe123',
    'email':'foo@bar.com'
  }

  //Test SignUp
  describe('POST /signup', () => {
    User.deleteMany({}, (err) => {
    });
    it("It should create a new user", (done) => {
      chai.request(server)
      .post('/signup')
      .send(testUser)
      .end((err,res) =>{
        res.should.have.status(201);
        res.body.message.should.be.a('String');
        done();
      });
    });

    it("It should fail creating same user", (done) => {
      chai.request(server)
      .post('/signup')
      .send(testUser)
      .end((err,res) =>{
        res.should.have.status(400);
        res.body.message.should.be.a('String');
        done();
      });
    });
  });

  //Test Login
  describe('POST /login', () => {
    it("It should login a new user", (done) => {
      chai.request(server)
      .post('/login')
      .send(testLogin)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        res.body.message.should.be.a('String');
        done();
      });
    });
  });

  //Test Logout
  describe('POST /logout', () => {
    it("It should logout a user", (done) => {
      chai.request(server)
      .post('/logout')
      .end((err,res) => {
        res.should.have.status(200);
        res.body.message.should.be.a('String');
        done();
      });
    });
  });

});
