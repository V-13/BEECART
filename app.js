const Express = require("express");
var app = new Express();
app.set('view engine','ejs');
app.use(Express.static(__dirname+"/public"));
nav=[{link:'/',title:'HOME'},{link:'/products',title:'PRODUCTS'}]

prod=[{ 
    model:"Honor 8x",
    disp:"6.5 Notch display",
    price:"₹13,799",
    picture:"/images/honor.jpg",
    release:"2019"
     },
       {
           model:"Google Pixel 3",
           disp:"5.5 FHD display",
           price:"₹59,799",
           picture:"/images/pixel.jpg",
           release:"2019"
       },
       {
           model:"Nokia 5.1 Plus",
           disp:"13MP+5MP Camera",
           price:"₹ 9,999",
           picture:"/images/nokia.jpg",
           release:"2019"
       },
       {
        model:"Samsung S10",
        disp:"Infinity-O display ",
        price:"₹ 55,900",
        picture:"/images/s10.jpg",
        release:"2019"
       },

    



{ 
    model:"OPPO F11",
    disp:"4 GB RAM | 128 GB ROM",
    price:"₹17,990",
    picture:"/images/oppo.jpg",
    release:"2018"
     },
       {
           model:"Real me 3",
           disp:"6.22 HD display",
           price:"₹59,799",
           picture:"/images/real.jpg",
           release:"2019"
       },
       {
           model:"Apple iPhone XR",
           disp:"6.1 inch Display",
           price:"₹ 64,999",
           picture:"/images/apple.jpg",
           release:"2019"
       },
       {
        model:"Azus Zenfone Max M2",
        disp:"64 GB ROM ",
        price:"₹ 7,999",
        picture:"/images/asuz.jpg",
        release:"2019"
       }



];

















app.get('/',(rq,rs)=>{
    rs.render('index',{nav,title:"home"});
});

app.get('/products',(rq,rs)=>{
      rs.render('products',{title:"products",prod});
});

app.get('/phone/:id',(rq,rs)=>{

    const x= rq.params.id;
    
    rs.render('phone',{products:prod[x],title:"Mobiles"});
});

app.listen(4000,()=>{
    console.log("server running on 4000")
});