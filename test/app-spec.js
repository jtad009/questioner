const request = require('supertest');
var expect = require('chai').expect;
var rewire = require('rewire');
var app = rewire('../app');
var meetup = rewire('../lib/meetups');

describe("Questioner App",function(){
	it("Loads the home page", function(done) {
		request(app).get("/").expect(200).end(done);
	});

    describe("Get /api/meetup/:id",function(done){
        it('returns a meetup',function(){
            return request(app).get('/api/v1/meetups/1').
                set('Accept','application/json').
                expect(200,{
                    "status": 200,
                    "data": [
                        {
                            "tags": [
                                "Events",
                                "Meetsups",
                                "Andela",
                                "Hackerton"
                            ],
                            "id": 1,
                            "createdOn": "Sun . 10:40 PM . 14/12/14",
                            "location": "lagos",
                            "images": [],
                            "topic": "Hackerton in yaba",
                            "happeningOn": "2018-09-12"
                        }
                    ]
                },done)
        });
    });
    describe("Get all meetups",function(done){
        beforeEach(function(){
            this.def =
            {
                "status": 200,
                "data": [
                    {
                        tags: [
                            "Events",
                            "Meetsups",
                            "Andela",
                            "Hackerton"
                        ],
                        id: 1,
                        createdOn: "Sun . 10:40 PM . 14/12/14",
                        location: "lagos",
                        images: [],
                        topic: "Hackerton in yaba",
                        happeningOn: "2018-09-12"
                    },
                    {
                        tags: [
                            "Events",
                            "Meetsups",
                            "Andela",
                            "Hackerton"
                        ],
                        id: 2,
                        createdOn: "Sun . 10:40 PM . 14/12/14",
                        location: "lagos",
                        images: [
                            "http://localhost:5000/images/54620ef4a1a3e.JPG"
                        ],
                        topic: "Hackerton in yaba",
                        happeningOn: "2018-09-12"
                    }
                ]
            }
            ;
            meetup.__set__('meetups',this.def);
        });
        it('returns a meetup',function(){
            var def = this.def;
            return request(app).get('/api/v1/meetups/').
                set('Accept','application/json').
                expect(200,
                    def,
                done)
        });
    });
    describe("POST a meetup ",function(done){
        beforeEach(function(){
            this.def ={
                "status": 200,
                "data": [
                    {
                        "id": 1,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 1,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    },
                    {
                        "id": 2,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 2,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    }
                ]
            }

            ;
            meetup.__set__('meetups',this.def);
        });
        it('Creates a new meetup',function(){
            var def = this.def;

            request(app)
                .post("/api/v1/meetups/")
                .set('Accept','application/x-www-form-urlencoded')

                .send({
                    "id":9,
                    "topic":"new meetup in calabar",
                    "location":"calabar",
                    "tags":["calabar","meetup"],
                    "createdOn":"2019-01-02",
                    "happeningOn":"2019-02-02",
                    "images":[]
                })
                .expect('Content-type',/json/)
                .expect(200)
                .end(function(error,response){
                    expect(response.body.data[0]).to.have.property('id');
                    expect(response.body.data[0].id).to.not.equal(5);
                    expect(response.body.data[2]).to.have.property('id');
                    expect(response.body.data[2].id).to.not.equal(5);
                    expect(response.body.data[2]).to.have.property('topic');
                    expect(response.body.data[2].topic).to.equal("new meetup in calabar");
                    expect(response.body.data[2]).to.have.property('location');
                    expect(response.body.data[2].location).to.equal("calabar");
                });


        });
    });
    describe("Get all meetup questions",function(done){
        beforeEach(function(){
            this.def ={
                "status": 200,
                "data": [
                    {
                        "id": 1,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 1,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    },
                    {
                        "id": 2,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 2,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    }
                ]
            }

            ;
            meetup.__set__('meetups',this.def);
        });
        it('returns a meetup',function(){
            var def = this.def;
            return request(app).get('/api/v1/questions/').
                set('Accept','application/json').
                expect(200,
                def,
                done)
        });
    });
    describe("POST a meetup Question ",function(done){
        beforeEach(function(){
            this.def ={
                "status": 200,
                "data": [
                    {
                        "id": 1,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 1,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    },
                    {
                        "id": 2,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 2,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    }
                ]
            }

            ;
            meetup.__set__('meetups',this.def);
        });
        it('Creates a new meetup question and return an object with key value pairs',function(){
            var def = this.def;

            request(app)
                .post("/api/v1/questions/")
                .set('Accept','application/x-www-form-urlencoded')

                .send({
                    "id": 3,
                    "createdOn": "2018-09-12",
                    "createdBy": 1,
                    "meetup": 1,
                    "title": "How to create data structures",
                    "body": "How can i do this and that from time to time in the mix",
                    "votes": 0
                })
                .expect('Content-type',/json/)
                .expect(200)
                .end(function(error,response){

                    expect(response.body.data[0]).to.have.property('id');
                    expect(response.body.data[0].id).to.equal(1);
                    expect(response.body.data[2]).to.have.property('id');
                    expect(response.body.data[2].id).to.equal(3);
                    expect(response.body.data[2]).to.have.property('title');
                    expect(response.body.data[2].title).to.equal("How to create data structures");
                    expect(response.body.data[2]).to.have.property('body');
                    expect(response.body.data[2].body).to.equal("How can i do this and that from time to time in the mix");
                });


        });
    });
    describe("Rsvp a  meetup  ",function(done){
        beforeEach(function(){
            this.def ={
                "status": 200,
                "data": [
                    {
                        "id": 1,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 1,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    },
                    {
                        "id": 2,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 2,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    }
                ]
            }

            ;
            meetup.__set__('meetups',this.def);
        });
        it('should RSVP a meetup if it exist and return an array of keys and values',function(){
            var def = this.def;

            request(app)
                .post("/api/v1/meetups/2/rsvps")
                .set('Accept','application/x-www-form-urlencoded')

                .send({
                    "meetup":2,
                    "topic":"new meetup in calabar",
                    "status":"no"
                    })
                .expect('Content-type',/json/)
                .expect(200)
                .end(function(error,response){

                    expect(response.body.data[0]).to.have.property('meetup');
                    expect(response.body.data[0].meetup).to.equal(2);
                    expect(response.body.data[0]).to.have.property('topic');
                    expect(response.body.data[0].topic).to.equal("new meetup in calabar");
                    expect(response.body.data[0]).to.have.property('status');
                    expect(response.body.data[0].status).to.equal("no");

                });


        });
    });
    describe("RSVP a  meetup  ",function(done){
        beforeEach(function(){
            this.def ={
                "status": 200,
                "data": [
                    {
                        "id": 1,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 1,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    },
                    {
                        "id": 2,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 2,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    }
                ]
            }

            ;
            meetup.__set__('meetups',this.def);
        });
        it('Should Not Rsvp a meetup of that doesnt exist in the meetups list',function(){
            var def = this.def;

            request(app)
                .post("/api/v1/meetups/3/rsvps")
                .set('Accept','application/x-www-form-urlencoded')

                .send({
                    "meetup":3,
                    "topic":"new meetup in calabar",
                    "status":"no"
                })
                .expect('Content-type',/json/)
                .expect(200)
                .end(function(error,response){


                    expect(response.body).to.have.property('status');
                    expect(response.body.status).to.equal(404);
                    expect(response.body).to.have.property('data');
                    expect(response.body.data).to.equal("Invalid meetup ID.");


                });


        });
    });

    describe("Down Vote a  meetup Question ",function(done){
        beforeEach(function(){
            this.def ={
                "status": 200,
                "data": [
                    {
                        "id": 1,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 1,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    },
                    {
                        "id": 2,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 2,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    }
                ]
            }

            ;
            meetup.__set__('meetups',this.def);
        });
        it('Downvotes a meetup question and returns a key and value pair',function(){
            var def = this.def;

            request(app)
                .patch("/api/v1/questions/2/downvote")
                .set('Accept','application/x-www-form-urlencoded')

                .expect('Content-type',/json/)
                .expect(200)
                .end(function(error,response){

                    expect(response.body).to.have.property('status');
                    expect(response.body.status).to.equal(200);
                    expect(response.body.data[0]).to.have.property('votes');
                    expect(response.body.data[0].votes).to.equal(9);
                    expect(response.body.data[0]).to.have.property('meetup');
                    expect(response.body.data[0].meetup).to.equal(2);

                });


        });
    });
    describe("Upvote a  meetup Question ",function(done){
        beforeEach(function(){
            this.def ={
                "status": 200,
                "data": [
                    {
                        "id": 1,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 1,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    },
                    {
                        "id": 2,
                        "createdOn": "2018-09-12",
                        "createdBy": 1,
                        "meetup": 2,
                        "title": "How to create data structures",
                        "body": "How can i do this and that from time to time in the mix",
                        "votes": 10
                    }
                ]
            }

            ;
            meetup.__set__('meetups',this.def);
        });
        it('upvotes a meetup question and returns a key and value pair',function(){
            var def = this.def;

            request(app)
                .patch("/api/v1/questions/1/upvote")
                .set('Accept','application/x-www-form-urlencoded')

                .expect('Content-type',/json/)
                .expect(200)
                .end(function(error,response){

                    expect(response.body).to.have.property('status');
                    expect(response.body.status).to.equal(200);
                    expect(response.body.data[0]).to.have.property('votes');
                    expect(response.body.data[0].votes).to.equal(11);
                    expect(response.body.data[0]).to.have.property('meetup');
                    expect(response.body.data[0].meetup).to.equal(1);

                });


        });
    });

});