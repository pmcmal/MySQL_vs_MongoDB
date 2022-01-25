var mysql = require('mysql');
const process = require('process');

var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});

connect.connect();
var dv = 1000000000; //default value
var ev = dv; //end value
var nv = 9182506147; //update value

let query = (str) => {
    return new Promise((resolve, reject) => {
        connect.query(str, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

let insert = async (seconds) => {
	console.log("SEKCJA INSERT");
    var iterations = 1;
    var count = 0;
    var value = dv;
    var total_count = 0;
    var start = process.hrtime()

    while (true) {

        var insert_A = 'INSERT INTO `test_a`(`value_1`, `value_2`, `value_3`, `value_4`) \
        VALUES (' + value + ',' + value + ',' + value + ',' + value + ');';

        var result = await query(insert_A);

        value++;
        count++;

        var end = process.hrtime(start);
        if (end[1] > 997000000 || end[0] == 1) {
            iterations++;
            console.info('Wiersz :\t %d \tCzas wykonania: %ds %dms', count, end[0], end[1] / 1000000);
            total_count += count;
            count = 0;
            if (iterations > seconds) {
                ev += total_count;
                return total_count;
            }
            start = process.hrtime();
        }
    }
};

let select = async (seconds) => {
	console.log("SEKCJA SELECT");
    var iterations = 1;
    var count = 0;
    var value = dv;
    var total_count = 0;
    var start = process.hrtime()


    while (true) {
		
        var select_A = 'SELECT * FROM `test_a` WHERE `value_1`=' + value;
        var result = await query(select_A);

        value++;
        if (value == ev) value = dv;
        count++;

        var end = process.hrtime(start);
        if (end[1] > 997000000 || end[0] == 1) {
            iterations++;
            console.info('Wiersz :\t %d \tCzas wykonania: %ds %dms', count, end[0], end[1] / 1000000);
            total_count += count;
            count = 0;
            if (iterations > seconds) {
                ev += total_count;
                return total_count;
            }
            start = process.hrtime();
        }
    }
};

let update = async (seconds) => {
	console.log("SEKCJA UPDATE");
    var iterations = 1;
    var count = 0;
    var value = dv;
    var total_count = 0;
    var start = process.hrtime()

    while (true) {
		
        const update_A = 'UPDATE `test_a` SET `value_4`=' + nv + ' WHERE `id`=' + value;
        var result = await query(update_A);

        value++;
        if (value == ev) value = dv;
        count++;

        var end = process.hrtime(start);
        if (end[1] > 997000000 || end[0] == 1) {
            iterations++;
            console.info('Wiersz :\t %d \tCzas wykonania: %ds %dms', count, end[0], end[1] / 1000000);
            total_count += count;
            count = 0;
            if (iterations > seconds) {
                ev += total_count;
                return total_count;
            }
            start = process.hrtime();
        }
    }
};

let mdelete = async (seconds) => {
	console.log("SEKCJA DELETE");
    var iterations = 1;
    var count = 0;
    var value = dv;
    var total_count = 0;
    var start = process.hrtime()

    while (true) {
		
        if (value < ev) {
            const update_A = 'DELETE FROM `test_a` WHERE value_1 =' + value;
            var result = await query(update_A);
            count++;
            value++;
        } else {
            total_count += count;
            var end = process.hrtime(start);
            console.info('Wiersz :\t %d \t \tCzas wykonania: %ds %dms', count, end[0], end[1] / 1000000);
            return total_count;
        }

        var end = process.hrtime(start);
        if (end[1] > 997000000 || end[0] == 1) {
            iterations++;
            console.info('Wiersz :\t %d \tCzas wykonania: %ds %dms', count, end[0], end[1] / 1000000);
            total_count += count;
            count = 0;
            if (iterations > seconds) {
                ev += total_count;
                return total_count;
            }
            start = process.hrtime();
        }
    }
};


let resetDB = async (option) => {

    const drop = 'DROP TABLE IF EXISTS `test_a`;';
    var result = await query(drop);

    if (option == 1) {
        const create = 'CREATE TABLE test_a (\
        id int ,\
        value_1 varchar(64),\
        value_2 varchar(64),\
        value_3 varchar(64),\
        value_4 varchar(64),\
        created datetime DEFAULT CURRENT_TIMESTAMP \
    );';
        var result = await query(create);
    } else {
        const create = 'CREATE TABLE test_a (\
        id int NOT NULL AUTO_INCREMENT,\
        value_1 varchar(64),\
        value_2 varchar(64),\
        value_3 varchar(64),\
        value_4 varchar(64),\
        created datetime DEFAULT CURRENT_TIMESTAMP,\
        PRIMARY KEY (id)\
    );';
        var result = await query(create);
    }


    return 1;


};

let runBechmark = async (seconds, option) => {

    var reseted = await resetDB(option);
    if (reseted) {

        var inserts = await insert(seconds);

        if (inserts) {
            console.info('Wierszy :\t %d INSERTED \n', inserts);
            var selects = await select(seconds);
        }

        if (selects) {
            console.info('Wierszy :\t %d SELECTED \n', selects);
            var updates = await update(seconds);
        }

        if (updates) {
            console.info('Wierszy :\t %d UPDATED \n', updates);
            var deletes = await mdelete(seconds);
        }

        if (deletes) {
            console.info('Wierszy :\t %d DELETED \n', deletes);
        }

    }


    return  "ZAKOŃCZONO TESTY MYSQL :)";
}

module.exports = {

    runBechmark
}