const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "a123",
    database: 'raro',
    insecureAuth: true
});

connection.connect(function (err) { if (err) throw err; });

async function query(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result, fields) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
module.exports = class MysqlRepository {

    constructor() {
    }

    getConnection() {
        return connection;
    }
    async insert() {
        const sql = `INSERT INTO temp (temp) VALUES('Temp ${Date.now()}');`
        return await query(sql);
    }

    async deleteById(id) {
        return await query(`delete from temp where id = ${id}`);
    }

    async getTemps() {
        return await query("SELECT * FROM temp");
    }

}