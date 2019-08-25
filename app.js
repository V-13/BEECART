const Express = require("express");
const Mongoose= require("mongoose");
var request=require("request")
var app = new Express();
app.set('view engine','ejs');
app.use(Express.static(__dirname+"/public"));

var bodyParser =require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


Mongoose.connect("mongodb://localhost:27017/productdb");

const ProductModel=Mongoose.model("productdetails",{
    model:String,
    disp:String,
    price:String,
    picture:String,
    des:String,
    r1:String,
    r2:String

})






nav=[{link:'/',title:'HOME'},{link:'/products',title:'PRODUCTS'},{link:'/addproducts',title:"ADD PRODUCTS"},{link:'/searchproduct',title:'SEARCH PRODUCT'},{link:'/deleteproduct',title:'DELETE PRODUCT'}]

// prod=[{ 
//     model:"Honor 8x",
//     disp:"6.5 Notch display",
//     price:"₹13,799",
//     picture:"/images/honor.jpg",
//     release:"2019",
//     description:"Handset, Travel Charger, Warranty Card, Charging Cable, PC cover, SIM Ejecting Tool",
//     review:"Very good phone with exciting performance.Must buy.",
//     review1:"Beautiful phone"
//      },
//        {
//            model:"Google Pixel 3",
//            disp:"5.5 FHD display",
//            price:"₹59,799",
//            picture:"/images/pixel.jpg",
//            release:"2019",
//            description:"Handset, Travel Charger, Warranty Card, Charging Cable, PC cover, SIM Ejecting Tool",
//            review:"Very good phone with exciting performance.Must buy.",
//            review1:"Beautiful phone"
//        },
//        {
//            model:"Nokia 5.1 Plus",
//            disp:"13MP+5MP Camera",
//            price:"₹ 9,999",
//            picture:"/images/nokia.jpg",
//            release:"2019",
//            description:"Handset, Travel Charger, Warranty Card, Charging Cable, PC cover, SIM Ejecting Tool",
//            review:"Very good phone with exciting performance.Must buy.",
//            review1:"Beautiful phone"
//        },
//        {
//         model:"Samsung S10",
//         disp:"Infinity-O display ",
//         price:"₹ 55,900",
//         picture:"/images/s10.jpg",
//         release:"2019",
//         description:"Handset, Travel Charger, Warranty Card, Charging Cable, PC cover, SIM Ejecting Tool",
//         review:"Very good phone with exciting performance.Must buy.",
//         review1:"Beautiful phone"
//        },

    



// { 
//     model:"OPPO F11",
//     disp:"4 GB RAM | 128 GB ROM",
//     price:"₹17,990",
//     picture:"/images/oppo.jpg",
//     release:"2018",
//     description:"Handset, Travel Charger, Warranty Card, Charging Cable, PC cover, SIM Ejecting Tool",
//     review:"Very good phone with exciting performance.Must buy.",
//     review1:"Beautiful phone"
//      },
//        {
//            model:"Real me 3",
//            disp:"6.22 HD display",
//            price:"₹59,799",
//            picture:"/images/real.jpg",
//            release:"2019",
//            description:"Handset, Travel Charger, Warranty Card, Charging Cable, PC cover, SIM Ejecting Tool",
//            review:"Very good phone with exciting performance.Must buy.",
//            review1:"Beautiful phone"
//        },
//        {
//            model:"Apple iPhone XR",
//            disp:"6.1 inch Display",
//            price:"₹ 64,999",
//            picture:"/images/apple.jpg",
//            release:"2019",
//            description:"Handset, Travel Charger, Warranty Card, Charging Cable, PC cover, SIM Ejecting Tool",
//            review:"Very good phone with exciting performance.Must buy.",
//            review1:"Beautiful phone"
//        },
//        {
//         model:"Azus Zenfone Max M2",
//         disp:"64 GB ROM ",
//         price:"₹ 7,999",
//         picture:"/images/asuz.jpg",
//         release:"2019",
//         description:"Handset, Travel Charger, Warranty Card, Charging Cable, PC cover, SIM Ejecting Tool",
//         review:"Very good phone with exciting performance.Must buy.",
//         review1:"Beautiful phone"
//        }



// ];

















app.get('/',(rq,rs)=>{
    rs.render('index',{nav,title:"home"});
});



app.get('/phone/:id',(rq,rs)=>{

    const x= rq.params.id;
    
    rs.render('phone',{products:prod[x],title:"Mobiles"});
});

app.get('/addproducts',(req,res)=>{
    res.render('addproducts',{nav,title:"ADD PRODUCTS"});
});


app.post('/read',(req,res)=>{
   var Product=ProductModel(req.body);
   var result=Product.save((error,data)=>{
       if(error)
       {
           throw error;
           res.send('error');
       }
       else
       {
        res.send("<script>alert('product succefully added')</script><script>window.location.href='products'</script>")
       }
   });

});



app.get('/productallAPI',(req,res)=>{
    var result=ProductModel.find((error,data)=>{
        if (error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIurl1="http://localhost:4000/productallAPI"

app.get('/products',(req,res)=>{
    request(APIurl1,(error,response,body)=>{
        var data=JSON.parse(body);
        res.render('products',{prod:data});

    });
    
});


app.get('/searchproduct',(req,res)=>{
    res.render('searchproduct');
});

app.get('/searchAPI',(req,res)=>{
    var item=req.query.model;
    var result=ProductModel.find({model:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});


const APIurl2="http://localhost:4000/searchAPI"
app.post('/viewsingleproduct',(req,res)=>{
    var item=req.body.model;
    request(APIurl2+"/?model="+item,(error,response,body)=>{
        var data = JSON.parse(body);
        res.render('viewsingleproduct',{prod:data});
    });
});

app.get('/deleteproduct',(req,res)=>{
    res.render('deleteproduct');
});

app.get('/deleteAPI',(req,res)=>{
    var item = req.query.model;
    var result=ProductModel.deleteOne({model:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIurl3="http://localhost:4000/deleteAPI"
app.post('/productdelete',(req,res)=>{
    var item=req.body.model;
    request(APIurl3+"/?model="+item,(error,response,body)=>{
        res.send("<script>alert('Product Deleted')</script><script>window.location.href='/deleteproduct'</script>");
    });
});


app.get('/readmore',(req,res)=>{
    var item=req.query.q;

    var result = ProductModel.findOne({_id:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);                                            //api recieve data from database
        }
        else
        {
            res.send(data);
        }
    });
});

const APIurl4="http://localhost:4000/readmore"


app.get('/more/:id',(req,res)=>{
const x=req.params.id;
    request(APIurl4+"/?q="+x,(error,response,body)=>{
        var data=JSON.parse(body);
        console.log(data)
        res.render('more',{prod:data});

    });
    
});








app.listen(process.env.PORT||4000,()=>{
    console.log("server running on 4000")
});