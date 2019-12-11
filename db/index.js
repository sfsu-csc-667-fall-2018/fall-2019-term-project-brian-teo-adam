const bycrypt = require('bcryptjs');

const db = require('../connection'); 


const CREATE_SQL = 
'INSERT INTO users(password,username,email) VALUES ($1,$2,$3) RETURNING *'; 

const create = ( password,username,email ) => {
    const hash = bycrypt.hashSync(password, 10)
    console.log(username," ::::",password, ":::", email)
    return db.one(CREATE_SQL,[hash,username,email]);
};

const FIND_BY_ID_SQL = 'SELECT * FROM users WHERE id=$1';
const findById = id => db.one(FIND_BY_ID_SQL, [id]);

const FIND_BY_EMAIL_SQL = 'SELECT * FROM users WHERE email=$1';
const findByEmail = email => db.any(FIND_BY_EMAIL_SQL, [email]);

module.exports = {
  create,
  findById,
  findByEmail
};