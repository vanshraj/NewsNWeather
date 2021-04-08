const superagent = require('superagent');

module.exports = {
  find: function(params, callback) {
    var city = params.city ? params.city : 'London';
    superagent.get('http://api.openweathermap.org/data/2.5/forecast')
    .query({
      appid: process.env.WEATHER_API_KEY,
      q: city
    })
    .then(res => {
      var forcasts = res.body.list;
      var list = [];
      for (var i = 0; i < forcasts.length; i += 8) {
          var forcast = forcasts[i];
          var d = {};
          d['date'] = forcast.dt_txt;
          d['main'] = forcast.weather[0].main;
          d['temp'] = forcast.main.temp;
          list.push(d);
          if(list.length==5){
            var data = {
              count: list.length,
              location: city,
              unit:'metrics',
              data: list
            }
            callback(null,data);
          }
      }
    })
    .catch(err =>{
			callback(err, null);
    })
	}
}
