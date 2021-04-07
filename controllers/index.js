var NewsController = require('./NewsController');
var WeatherController = require('./WeatherController');
var UserController = require('./UserController');

module.exports = {
	news: NewsController,
	weather: WeatherController,
	user: UserController,
}
