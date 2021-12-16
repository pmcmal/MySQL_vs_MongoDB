const MysqlRepository = require('./repository/mysql_repository');
const util = require('./util');
const repository = new MysqlRepository();
const chalk = require('chalk');
var initialTime = Date.now();
var input = parseInt(process.argv.slice(2)[0]) || 5000;

var selectMap = {};
var insertMap = {};
var deletedMap = {};
var temps = [];

async function _insert() {

    let count = 0;
    const initialTime = Date.now();
    for (let i = 0; i < input; i++) {
        await repository.insert();
        count++;
    }
    insertMap = {
        count: count,
        time: util.calcTime(initialTime)
    };
}
async function _select() {

    const initialTime = Date.now();
    const r = await repository.getTemps();
    temps = r;
    selectMap = {
        count: r.length,
        time: util.calcTime(initialTime)
    };
}
async function _delete() {
    initialTime = Date.now();
    for (let i = 0; i < temps.length; i++) {
        const e = temps[i];
        const o = await repository.deleteById(e.id);
    }
    deletedMap = {
        count: temps.length,
        time: util.calcTime(initialTime)
    };
}

async function crudTest() {
    await _insert();
    console.log(chalk.blue('Insert tested'));
    await _select();
    console.log(chalk.green('Select tested'));
    await _delete();
    console.log(chalk.red('Delete tested'));
}

global.Promise.all([
    crudTest()
]).then(function () {
    const finalTime = Date.now();
    const result = {
        database: 'CRUD MySQL',
        input: input,
        insert: util.format(insertMap),
        select: util.format(selectMap),
        delete: util.format(deletedMap),
        time: util.calcTime(initialTime, finalTime),
    }
    console.table(result);
})