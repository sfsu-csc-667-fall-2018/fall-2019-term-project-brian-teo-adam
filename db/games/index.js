const bycrypt = require('bcryptjs');
const db = require('../connection'); 

const CREATE_SQL = 'INSERT INTO games(name,owner_id,number_players) VALUES ($1,$2,$3) RETURNING id'; 

const create = (name,owner_id,number_players) => {
  return db.one(CREATE_SQL,[name,owner_id,number_players]);
};

const FIND_GAME_BY_ID = 'SELECT * FROM games WHERE id=$1';
const findGameById = id => db.one(FIND_GAME_BY_ID, [id]);

const FIND_GAME_BY_NAME = 'SELECT * FROM games WHERE name ILIKE $1';
const findGameByName = name => db.any(FIND_GAME_BY_NAME, [name]);

module.exports = {
  create,
  findGameById,
  findGameByName,
};
