const sentjwttoClient = (user,res) => {
    const token = user.generateJwtFromUser();
    const { JWT_COOKIE, NODE_ENV }=process.env;

    
    return res
    .status(200).cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now()+parseInt(JWT_COOKIE)*100*60*10*60),//1 saaat*JWT_COOKIE
        secure: true
    })
    .json({
        success:true,
        access_token:token,
        data: {
            name: user.name,
            email: user.email
        }
    })
 
};

const isTokenIncluded = (req) =>{
    // return req.cookies.access_token;
  
    //console.log( req.headers.authorization.startsWith("Bearer:"))

    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer: ")
        // req.cookies.access_token && 1
    );
}

const getAccessToken = (req) => {
    // const access_token = req.cookies.access_token;
    // return access_token;
    const authorization=req.headers.authorization;
 
    const access_token=authorization.split(" ")[1];
    return access_token;
}


module.exports={
    sentjwttoClient,
    isTokenIncluded,
    getAccessToken
}