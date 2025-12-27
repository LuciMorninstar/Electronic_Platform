import Redis from "ioredis"
import "dotenv/config"


const redis = new Redis(process.env.UPSTASH_REDIS_URL);

// to handle erors

// redis.on("error", (err)=>{
//     console.error("Redis connection error:", err);
// })

// redis.on("ready", ()=>{
//     console.log("Redis is ready");
// })

export default redis;