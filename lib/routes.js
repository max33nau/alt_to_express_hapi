
var startDB = require('./database');

var dbInfo = startDB();
var Schema = dbInfo.mongoose.Schema;
var UserSportSchema = new Schema({
  username: {type: String, unique: true, required: true },
  sport: {type: String, required: true }
})
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
    handler: function(request,reply) {  // Posts data to my mongodb
      var personForDatabase = new User();
      personForDatabase.username = request.payload.username;
      personForDatabase.sport = request.payload.sport;
      personForDatabase.save(function(error,user){
        if(!error) {
          return reply(request.payload.username + 'was added to the database');
        } else {
          console.log(error);
        }
      });
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
      }
    }
  }
];
