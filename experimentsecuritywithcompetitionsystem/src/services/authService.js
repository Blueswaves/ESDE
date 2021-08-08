config = require('../config/config');
const pool = require('../config/database')

const log = require('winston');

module.exports.authenticate = (email, callback) => {

    pool.getConnection((err, connection) => {
        if (err) {
            if (err) throw err;
            //========================================================================
            //SOLUTION
            //========================================================================
            log.error(err);
        } else {
            try {
                connection.query(`SELECT user.user_id, fullname, email, user_password, role_name, user.role_id  
                   FROM user INNER JOIN role ON user.role_id=role.role_id AND email='${email}'`, {}, (err, rows) => {
                    if (err) {
                        //========================================================================
                        //SOLUTION
                        //========================================================================
                        log.error(err);
                        if (err) return callback(err, null);
                    } else {
                        if (rows.length == 1) {
                            console.log(rows);
                            //========================================================================
                            //SOLUTION
                            //========================================================================
                            log.info(rows);
                            return callback(null, rows);
                        } else {
                            //========================================================================
                            //SOLUTION
                            //========================================================================
                            log.error(err);
                            return callback('Login has failed', null);
                        }
                    }
                    connection.release();

                });
            } catch (error) {
                //========================================================================
                //SOLUTION
                //========================================================================
                log.error(err);
                return callback(error, null);;
            }
        }
    }); //End of getConnection

} //End of authenticate