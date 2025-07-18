import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    // pass control to the next middleware function
    //comment this and uncomment the try-catch block to enable rate limiting
    // this is just a placeholder to avoid errors in the code
    next();

    /*try {
        //change the "my-limit-key" to something unique for your application
        //you can use req.ip or req.user.id if you have user authentication
        const {success} = await ratelimit.limit("my-limit-key");

        if(!success) {
            return res.status(429).json({message: "Too many requests, please try again later."});
        }

        next(); // pass control to the next middleware function
        
    } catch (error) {
        
        console.log("Error in rateLimiter middleware:", error);
        next(error); // pass the error to the next middleware

    }*/
};

export default rateLimiter;