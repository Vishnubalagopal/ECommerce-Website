//import model account

const db = require('./db')

// import jsonwebtoken

const jwt = require('jsonwebtoken')




//1 login function

const login = (email,pswd)=>{
    //check acno and pswd is present in mongo db
    return db.Member.findOne({
        email,
        pswd
    }).then((result)=>{
        if(result){
            //acno n password is present in db
            console.log('login successful');
            //current acno
            let currentEmail = email

            //generate token
            const token = jwt.sign({
                currentEmail:email},
                'supersecretkey123')
            return{
                status:true,
                message:'Login Successfull',
                username:result.username,
                statusCode:200,
                token,
                currentEmail

            }
        }
        else{
            console.log('invalid account/password');
            return{
                status:false,
                message:'Invalid account/password',
                statusCode:404

            }

        }
    })
}


//register function

const register = (email,pswd,uname)=>{
    console.log('inside register functinon definition');
    //check acno and pswd is present in mongo db
    return db.Member.findOne({
        email,
        pswd
    }).then((result)=>{
        if(result){
            //acno n password is present in db
            console.log(' already registered ');
            return{
                status:false,
                message:'Account already exist.. Please Login',
                statusCode:404

            }
        }
        else{
            console.log('Registered Successfully');
            let newMember = new db.Member({
                email,
                pswd,
                username:uname,
                balance:0,
                transaction:[]
            })
            newMember.save()
            return{
                status:true,
                message:'Registered successfully',
                statusCode:200

            }

        }
    })
}



//getAllProducts function

const getAllProducts = ()=>{
    return db.Footware.find()
    .then((data)=>{
        if(data){
            return{
                statusCode:200,
                result:data
            }
        }
        else{
            return{
                statusCode:404,
                message:'failed to fetch the data from database'
            }
        }
    })
}

//getProducts function

const getProduct = ( id)=>{
    return db.Footware.findOne({
        id

    
    })
    .then((data)=>{
        if(data){
            return{
                statusCode:200,
                result:data
            }
        }
        else{
            return{
                statusCode:404,
                message:'failed to fetch the data from database'
            }
        }
    })
}

//add-to-wishlist

const addToWishList = (id,title,price,description,image,type)=>{
    return db.Wishlist.findOne({
        id
    }).then((result)=>{
        if(result){
            return{
                statusCode:404,
                message:'Product already in your wishlist'
            }
        }
        else{
            const newProduct = new db.Wishlist({
                id,
                title,
                price,
                description,
                image,
                type
             
            })
            newProduct.save()
            return{
                statusCode:200,
                message:'Product Successfully added in your Wishlist '
            }
        }
    })
}

//getWishlist

const getWishlist = ()=>{
    return db.Wishlist.find()
    .then((data)=>{
        if(data){
            return{
                statusCode:200,
                result:data
            }
        }
        else{
            return{
                statusCode:404,
                message:'Your wishlist is empty'
            }
        }
    })
}

//deleteWishlist

const deleteWishlist = (id)=>{
    return db.Wishlist.deleteOne({
        id
    })
    .then((data)=>{
        if(data){
            return db.Wishlist.find()
            .then((data)=>{
                if(data){
                    return{
                        statusCode:200,
                        wishlist:data,
                        message:'Product removed from your wishlist'
                    }
                }
                else{
                    return{
                        statusCode:404,
                        message:'Your wishlist is empty'
                    }
                }
            })
        
        }
        else{
            return{
                statusCode:404,
                message:'Product not available'
            }
        }
    })
}

module.exports = {
    login,
    register,
    getAllProducts,
    getProduct,
    addToWishList,
    getWishlist,
    deleteWishlist
}