const Express = require("express");
var app = new Express();
app.set('view engine','ejs');
app.use(Express.static(__dirname+"/public"));
nav=[{link:'/',title:'HOME'},{link:'/products',title:'PRODUCTS'}]

prod=[{ 
    model:"Honor 8x",
    disp:"6.5 Notch display",
    price:"₹13,799",
    picture:"/images/honor.jpg"
     },
       {
           model:"Google Pixel 3",
           disp:"5.5 FHD display",
           price:"₹59,799",
           picture:"/images/pixel.jpg"
       },
       {
           model:"Nokia 5.1 Plus",
           disp:"13MP+5MP Camera",
           price:"₹ 9,999",
           picture:"/images/nokia.jpg"
       },
       {
        model:"Samsung S10",
        disp:"Infinity-O display ",
        price:"₹ 55,900",
        picture:"/images/s10.jpg"
       }



];

app.get('/',(rq,rs)=>{
    rs.render('index',{nav,title:"home"});
});

app.get('/products',(rq,rs)=>{
      rs.render('products',{title:"products",prod});
});
app.listen(4000,()=>{
    console.log("server running on 4000")
});