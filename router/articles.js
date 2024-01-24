const express = require('express');
const route = express.Router();
const Article = require('../models/article');


route.get('/new',(req,res)=>{
    res.render("articles/new",{article: new Article()});
})

route.get('/:id',async (req,res)=>{   // dynamic url
    const id = req.params.id;
    const article = await Article.findById(id);
    if(article == null) res.redirect('/')
    res.render('articles/show',{article:article})
})

route.get('/edit/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id);
    console.log(article);
    res.render('articles/edit',{article:article})
})
route.post('/',async (req,res,next)=>{

    req.article = new Article();
    next();
},saveArticleAndRedirect('new'))

route.put('/:id',async (req,res,next)=>{
    req.article = await Article.findById(req.params.id);
    next();
},saveArticleAndRedirect('edit'))
route.get('/read')
route.delete('/:id',async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/')
})

function saveArticleAndRedirect(path){
    return async(req,res)=>{
        let article = req.article;
       
            article.title = req.body.title
            article.description= req.body.description
            article.markdown = req.body.markdown
      
        try{
            await article.save();
            res.redirect(`/articles/${article.id}`)
        }
        catch(err){
            console.log(err);
            res.render(`articles/${path}`,{article:article})
        }
    }
}

module.exports = route;