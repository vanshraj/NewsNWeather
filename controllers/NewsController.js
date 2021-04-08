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
      var articles = JSON.parse(res.text).articles;
      var list = [];
      articles.forEach((article) => {
          var d = {};
          d['headline'] = article.title;
          d['link'] = article.url;
          list.push(d);
          if(list.length==articles.length){
            var data = {
              count:list.length,
              data: list
            }
            callback(null,data);
          }
      });
    })
    .catch(err =>{
			callback(err, null);
    })
	}
}
