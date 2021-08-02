import mysql from 'mysql';

// Get a mysql db connection obj
function dbConn() {

    return mysql.createConnection({
        host: '152.136.190.11',
        user: 'ares_crowdloan_contribute',
        password: '12345678',
        port: '3306',
        database: 'ares_crowdloan_contribute'
    });
}

// Get db schema create sql script.
function createTableSql() {
    return "CREATE TABLE `bind_relations` (\n" +
        "  `id` int(11) NOT NULL AUTO_INCREMENT,\n" +
        "  `sign_address` varchar(50) COLLATE utf8mb4_bin NOT NULL,\n" +
        "  `bind_address` varchar(50) COLLATE utf8mb4_bin NOT NULL,\n" +
        "  `sign_str` varchar(255) COLLATE utf8mb4_bin NOT NULL,\n" +
        "  `status` int(11) DEFAULT NULL,\n" +
        "  `valid_type` varchar(10) COLLATE utf8mb4_bin NOT NULL,\n" +
        "  `at_create` datetime DEFAULT NULL,\n" +
        "  `at_update` datetime DEFAULT NULL,\n" +
        "  PRIMARY KEY (`id`),\n" +
        "  UNIQUE KEY `bind_unique` (`sign_address`,`bind_address`),\n" +
        "  KEY `sign_address` (`sign_address`),\n" +
        "  KEY `bind_address` (`bind_address`),\n" +
        "  KEY `status` (`status`),\n" +
        "  KEY `valid_type` (`valid_type`),\n" +
        "  KEY `at_create` (`at_create`),\n" +
        "  KEY `at_update` (`at_update`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;\n"
}

// To do a mysql query
export function insertBindRelations(sql_param_arr) {

    const connection = dbConn();
    connection.connect();

    var addSql = 'INSERT INTO bind_relations(`sign_address`,`bind_address`,`sign_str`,`status`,`valid_type`,`at_create`,`at_update`) VALUES(?,?,?,?,?,?,?)';
    // var addSqlParams = ['sign_address', 'bind_address', 'sign_str', 1, 'valid_type', '2020-01-11', '2020-01-12'];
    connection.query(addSql, sql_param_arr, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:',result.insertId);
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');

    });
    connection.end();
}
