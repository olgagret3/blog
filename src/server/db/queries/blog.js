const knex = require('../connection');


function getBlog() {
  return knex('blog')
  .select('*');
}

function getArticle(id) {
	return knex('blog')
  .select('*')
  .where({ id: parseInt(id) });
}

function addArticle(article) {
  return knex('blog')
  .insert(article)
  .returning('*');
}

function updateArticle(id, article) {
  return knex('blog')
  .update(article)
  .where({ id: parseInt(id) })
  .returning('*');
}

function deleteArticle(id) {
  return knex('blog')
  .del()
  .where({ id: parseInt(id) })
  .returning('*');
}


module.exports = {
  getBlog,
  getArticle,
  addArticle,
  updateArticle,
  deleteArticle
};
