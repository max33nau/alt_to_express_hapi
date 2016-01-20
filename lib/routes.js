"use strict";
var startDB = require('./database');
var joi = require('joi');
var dbInfo = startDB();
var Schema = dbInfo.mongoose.Schema;
var UserSportSchema = new Schema({
  username: {type: String, unique: true, required: true },
  sport: {type: String, required: true }
});
var User = dbInfo.mongoose.model('User', UserSportSchema);

exports.rest = [
  { method: 'GET',
    path:'/',
    handler: function(request,reply){ // Shows you static index.html page in Jade
      return reply.view('index');
    }
  },
  { method: 'GET',
    path:'/sport',
    handler: function(request,reply){ // Shows sport html to submit form for POST
      return reply.view('sport');
    }
  },
  { method: 'POST',
    path:'/sport',
    config: {
      handler: function(request,reply) {  // Posts data to my mongodb
        var personForDatabase = new User();
        personForDatabase.username = request.payload.username;
        personForDatabase.sport = request.payload.sport;
        personForDatabase.save(function(error,user){
          if(!error) {
            console.log(user.username + 'was added and there favorite sport is ' + user.sport);
            return reply(user.username + ' was added and their favorite sport is ' + user.sport);
          } else {
            console.log(error);
          }
        });
      },
      validate: {
          payload: {
              username: joi.string().required(),
              sport: joi.string().required()
          }
      }
    }
  },
  { method: ['PUT','GET'],
    path:'/sport/update',
    config: {
      handler: function(request,reply) {  // Posts data to my mongodb
        var update = {
          username: request.query.username,
          sport: request.query.newsport
        };
        User.findOne({username: update.username})
          .select('username sport')
          .exec(function(error, users) {
            if(error) {
              console.log(error);
              return reply('That sport is not in our database');
            } else {
              users.sport = update.sport;
              users.save(function(error,user){
                if(error) {
                  console.log(error);
                } else {
                  console.log(user.username +' new favorite sport:' +user.sport+' was saved.');
                  return reply(user.username +' new favorite sport:  ' +user.sport);
                }
              });
            }
          });
        },
        validate: {
            query: {
                username: joi.string().required(),
                newsport: joi.string().required()
            }
        }
      }
  },
  {
    method: 'GET',
    path:'/sport/{favoritesport}',
    config: {
      handler: function(request,reply) {
        User.find({sport: request.params.favoritesport})
          .select('username sport')
          .exec(function(error, users) {
            if(error) {
              console.log(error);
              return reply('That sport is not in our database');
            } else {
              return reply(users);
            }
        });
      },
      validate: {
          params: {
              favoritesport: joi.string().required()
          }
      }
    }
  },
  {
    method: 'GET',
    path:'/user/all',
    config: {
      handler: function(request,reply) {
        User.find({})
          .select('username sport')
          .exec(function(error, users) {
            if(error) {
              console.log(error);
            } else {
              return reply(users);
            }
        });
      }
    }
  },
  {
    method: 'DELETE',
    path:'/user/{user}',
    config: {
      handler: function(request,reply) {
        User.findOne({ username: request.params.user }, function(error,user){
          if(error) {
            console.log(error);
          } else {
            user.remove();
            reply(user + ' was removed');
          }
        });
      },
      validate: {
          params: {
              user: joi.string().required()
          }
      }
    }
  }

];
