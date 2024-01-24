const express = require('express');
const mongoose = require('mongoose');
const app = express();
const articleRouter = require('./router/articles');
const Article = require('./models/article')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); 

mongoose.connect("mongodb://localhost:27017/blogs", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use('/articles', articleRouter);

app.listen(3000, () => {
    console.log('Server launched on port 3000');
});

app.get('/', async(req, res) => {
    try{
        const articles = await Article.find();
    res.render('articles/index', { articles: articles });
    }
    catch(err){
        console.log(err);
    }
    
});
