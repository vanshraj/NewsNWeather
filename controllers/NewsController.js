const superagent = require('superagent');

module.exports = {
  find: function(params, callback) {
    if(!params.search){
      callback('Enter query in search', null);
    }
    superagent.get('https://newsapi.org/v2/everything')
    .query({
      apiKey: process.env.NEWS_API_KEY,
      q: params.search
    })
    .then(res => {
			callback(null, res);
    })
    .catch(err =>{
			callback(err, null);
    })
	}
}
