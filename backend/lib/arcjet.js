import arcjet, {detectBot , shield , tokenBucket} from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

console.log("Loaded ARCJET_API_KEY:", process.env.ARCJET_KEY);

//init arcjet
export const aj = arcjet({
    apiKey: process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        //shield protects  your app from common attacks 
        shield({mode:"LIVE"}),
        
        detectBot({
            mode:"LIVE",
            //block all bots except search engine
            allow: ["CATEGORY:SEARCH_ENGINE","UA:PostmanRuntime", ],
        }),

        tokenBucket({
            mode:"LIVE",
            refillRate: 1,
            capacity: 5,
            interval : 5,
            window: 10, //seconds
            key: (req) => req.ip, //rate limit based on IP address
        })
    ]
});