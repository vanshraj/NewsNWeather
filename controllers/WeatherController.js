const superagent = require('superagent');

module.exports = {
  find: function(params, callback) {
    superagent.get('http://api.openweathermap.org/data/2.5/forecast')
    .query({
      appid: process.env.WEATHER_API_KEY,
      q: params.city ? params.city : 'London'
    })
    .then(res => {
			callback(null, res.body);
    })
    .catch(err =>{
			callback(err, null);
    })
	}
}
