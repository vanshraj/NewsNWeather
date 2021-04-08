let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let User = require("../models/user");
let should = chai.should();
let assert = chai.assert
chai.use(chaiHttp);

describe('News Api', () => {
  let testUser = {
    'name':'john doe',
    'password':'johndoe123',
    'email':'bar@foo.com'
  }
  let testLogin = {
    'password':'johndoe123',
    'email':'bar@foo.com'
  }

  //Test News
  describe('GET /news', () => {
    User.deleteMany({}, (err) => {
    });

    it("It should send bad auth when fetch news without login", (done) => {
        //fetch news
        chai.request(server)
        .get('/news?search=bitcoin')
        .end((err,res) => {
            res.should.have.status(401);
            res.body.message.should.be.a('String');
            done();
        });
    });

    it("It should create user, login and fetch news", (done) => {
      chai.request(server)
      .post('/signup')
      .send(testUser)
      .end((err,res) =>{
        res.should.have.status(201);
        res.body.message.should.be.a('String');
            chai.request(server)
            .post('/login')
            .send(testLogin)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                res.body.message.should.be.a('String');
                var token = res.body.token;
                //fetch news
                chai.request(server)
                .get('/news?search=bitcoin')
                .set({ Authorization: `Bearer ${token}` })
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('count');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('Array');
                    done();
                });
            });
      });
    });

  });
});

describe('Weather Api', () => {
    //Test Weather
    describe('GET /weather', () => {
      it("It should fetch weather", (done) => {
          //fetch news
          chai.request(server)
          .get('/weather')
          .end((err,res) => {
              res.should.have.status(200);
              res.body.should.have.property('count');
              res.body.should.have.property('unit');
              res.body.should.have.property('location');
              res.body.should.have.property('data');
              res.body.data.should.be.a('Array');
              done();
          });
      });
  });
});
