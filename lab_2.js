
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var threat; // получение кол-ва угроз
var vulnerability=[]; // получение кол-ва уязвимостей на каждую угрозу
var mas=[]; // содержит перечисление всех угроз и уязвимостей

app.set('port',3000);

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // использование js, css, картинок.

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

app.get('/',function(req, res) {
	res.render("index");
})

app.post('/get_data', function(req, res) {
	threat = req.body['threat']; // получение кол-ва угроз
	vulnerability = []; // сбрасываем значения
	mas = []; // сбрасываем значения

	for (var i in req.body) {
		if (i == "threat") continue;
		vulnerability.push(req.body[i]);
	}

	for (var j=0; j<threat; j++) {
		for (k=0; k<vulnerability[j]; k++) {
			mas.push('Угроза ' + (j*1+1) + ' - Уязвимость ' + (k*1+1));
		}
	}

	res.render("get_data", {
		data: mas
	});	

})

// Обработка запроса на подсчет рисков
app.post('/count', function(req, res) {

	var znacheniya = [];
	
	for (var i in req.body) {
		znacheniya.push(req.body[i]);
	}
	
	res.render("result", {
		numb_vulnerab: vulnerability,
		threat: threat,
		znacheniya:znacheniya
	});

	
})

http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});
