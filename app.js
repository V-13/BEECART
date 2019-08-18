const Express = require("express");
var app = new Express();
app.set('view engine','ejs');
nav=[{link:'/',title:'HOME'},{link:'/products',title:'PRODUCTS'}]

app.get('/',(rq,rs)=>{
    rs.render('index',{nav,title:"home"});
});
app.listen(4000,()=>{
    console.log("server running on 4000")
});