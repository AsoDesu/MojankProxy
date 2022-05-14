import 'dotenv/config'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
const app = express()

function router() {
    let config: any = {}
    config[`msapi.${process.env.DOMAIN}`] = "https://api.minecraftservices.com";
    config[`sessionserver.${process.env.DOMAIN}`] = "https://sessionserver.mojang.com"
    config[`api.${process.env.DOMAIN}`] = "https://api.mojang.com"
    config[`authserver.${process.env.DOMAIN}`] = "https://authserver.mojang.com"
    return config;
}

app.use('/', createProxyMiddleware({
    target: 'https://authserver.mojang.com',
    changeOrigin: true,
    router: router()
}));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})