const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
var serve = require('koa-static');



const blogRoutes = require('./routes/blog');

const app = new Koa();
const PORT = process.env.PORT || 1337;


app.use(bodyParser());
app.use(blogRoutes.routes());
app.use(serve('../../public'));


const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;

