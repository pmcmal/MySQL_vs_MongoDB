var mongo = require('./mongo');
var mysql = require('./mysql');
var seconds= 10;

let main = () =>{
console.log("MONGODB VS MYSQL PROJEKT ZTBD 2022");
console.log("TESTUJE MONGODB");
mongo.runBechmark(seconds).then((resolve) => {
    console.log(resolve);
    console.log("TESTUJE MYSQL - BAZA NIEINDEKSOWANA");
    mysql.runBechmark(seconds, 1).then((resolve) => {
        console.log(resolve);
        console.log("TESTUJE MYSQL - BAZA INDEKSOWANA Z PRIMARY KEY");
        mysql.runBechmark(seconds, 2).then((resolve) => {
            console.log(resolve);
			console.log("UKOŃCZONO WSZYSTKO :)");
			return;
        });
    });
});

};

main();