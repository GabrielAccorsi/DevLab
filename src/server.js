import express from 'express'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import config from './config.js'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use("/user",userRoutes)
app.use("/auth",authRoutes)

app.listen(config.port,config.host, ()=>{
    console.log(`Servidor rodando em ${config.host}:${config.port}`)
})
