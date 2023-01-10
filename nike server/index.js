


//1. import express

const express = require('express')

//impport data service

const dataService = require('./services/data.service')


//impoert cors

const cors = require('cors')

// import jsonwebtoken

const jwt = require('jsonwebtoken')
const { Router } = require('express')



//2. create a server app using express

const app = express()

//using cors define origin to server app

app.use(cors({
    origin:['http://localhost:4200']
}))

//to parse json data

app.use(express.json())



//3. setup port for server app

app.listen(3000,()=>{
    console.log('server started at port 3000');
})

//application specific middleware

const appMiddleware = (req,res,next)=>{
    console.log('This is application specific middleware');
    next()
}
 app.use(appMiddleware)

 //router specific middleware
//token validation

const jwtMiddleware = (req,res,next)=>{
    console.log('inside router specific middleware');
    //get token from req headers x-access-token key

    let token = req.headers['x-access-token']

    //verify token using jsonwebtoken

    try{
        let data = jwt.verify(token,'supersecretkey123')
        req.currentMember = data.currentMember
        next();
    }
    catch{
        res.status(404).json({
            status:false,
            message:" Authentication failed... Please Log In...."
        })
    }
}



// 4 http request REST api - BANK API

//1. login api

app.post('/login',(req,res)=>{
    console.log('inside login function');
    console.log(req.body);
    //asynchronus
    dataService.login(req.body.email,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
    
})

//2. register api

app.post('/register',(req,res)=>{
    console.log('inside register function');
    console.log(req.body);
    //asynchronus
    dataService.register(req.body.email,req.body.pswd,req.body.uname)
    .then((result)=>{
        res.status(result.statusCode).json(result);
    })
    
})



//getAllProducts API

app.get('/allproducts',(req,res)=>{
    console.log('inside getAllProducts function');
    dataService.getAllProducts()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//product by id


app.get('/pdetails/:id',(req,res)=>{
    console.log('inside getAllProducts function');
    dataService.getProduct(req.params.id)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//add-to-wishlist

app.post('/add-to-wishlist',(req,res)=>{
    console.log(('inside add-to-wishlist function'));
    console.log(req.body);
    dataService.addToWishList(req.body.id,req.body.title,req.body.price,req.body.description,req.body.image,req.body.type)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })

})

//getWishlist

app.get('/get-wishlist',(req,res)=>{
    console.log(('inside getWishlist function'));
    console.log(req.body);
    dataService.getWishlist()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })

})

//delete-item-wishlist api

app.delete('/delete-item-wishlist/:id',(req,res)=>{
    console.log(('inside deleteWishlist function'));
    dataService.deleteWishlist(req.params.id)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })


})
