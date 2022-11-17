const database = require('../database/database');


setData = async (tableName, data) => {

    try {
        fieldName = "";
        values = "";
        keysArray = Object.keys(data);
        valuesArry = Object.values(data);

        for (let a = 0; a < valuesArry.length; a++) {
            if (valuesArry.length - 1 == a) {
                values = values + `'${valuesArry[a]}'`;
            } else {
                values = values + `'${valuesArry[a]}'` + ",";
            }
        }
        for (let i = 0; i < keysArray.length; i++) {
            if (keysArray.length - 1 == i) {
                fieldName = fieldName + keysArray[i];
            } else {
                fieldName = fieldName + keysArray[i] + ",";
            }

        }
        query = `INSERT INTO ${tableName}(${fieldName}) VALUES(${values})`;
        console.log(query)
        insert = await database.query(query);
        console.log("insert",)
        return insert;
    } catch (error) {
        console.log(error);
    }

}


module.exports = { 'setData': setData };