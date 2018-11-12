const Router = require('koa-router');
const queries = require('../db/queries/blog');
const url = require('url');
const multer = require('koa-multer');
const path = require('path');
const fs = require('fs');

const router = new Router();

const URL = '/api/blog';
const path_dir = '/media/olga/Work/Hackspace/projects/Tasks/Koa/public/picture/';

router.get(URL, async (ctx) => {
  try {
    const blog = await queries.getBlog();
    ctx.body = JSON.stringify(blog); 
  } catch (err) {
    console.log(err)
  }
})

router.get(`${URL}/:id`, async (ctx) => {
  try {
    const article = await queries.getArticle(ctx.params.id);
    console.log(article.length);
    if(article.length){
      console.log("get id");
    	ctx.body = JSON.stringify(article); 	
    }
    else{
    	ctx.status = 404;
     	ctx.body = {
         status: 'error',
         message: 'That article does not exist.'
        };
    }
    
  } catch (err) {
    console.log(err)
  }
})



let writeImageInFile = function (imageBase64_withMetaData, nameFile) {
  let acceptType = [ 'png', 'jpg', 'jpeg' ];
  let typeFile = imageBase64_withMetaData.match(/^"data:(.*?)\/([a-z]+);base64,(.+)"$/)[2];
  if(!typeFile || acceptType.indexOf(typeFile) === -1) throw Error();

  let imageBase64_withoutMetaData = imageBase64_withMetaData.match(/^"data:([A-Za-z-+\/]+);base64,(.+)"$/)[2];

  let bitmap = new Buffer(imageBase64_withoutMetaData , 'base64');

  let pathImage = path.join(path_dir, `${nameFile}.${typeFile}`);

  fs.writeFile(pathImage, bitmap, 'base64', function(err) {
    if (err) {
      console.log('Fail', err);
    } else {
      console.log("Success");
    }
  });
  return "picture/" + `${nameFile}.${typeFile}`;
};

router.post(URL, async (ctx) => {
  let picture_str = JSON.stringify(ctx.request.body.picture);
  let path_picture = JSON.stringify(ctx.request.body.path);
  let picture = writeImageInFile(picture_str, path_picture.substring(1,path_picture.indexOf('.')));
  ctx.request.body.picture = picture;
  delete ctx.request.body['path'];
  try {
    const article = await queries.addArticle(ctx.request.body);

    if (article.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: article
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'Error'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.put(`${URL}/:id`, async (ctx) => {
  try {
    const article = await queries.updateArticle(ctx.params.id, ctx.request.body);
    if (article.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: article
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That article does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.delete(`${URL}/:id`, async (ctx) => {
  try {
    console.log(ctx.params.id);
    const article = await queries.deleteArticle(ctx.params.id);
    if (article.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: article
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That article does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})


module.exports = router;
