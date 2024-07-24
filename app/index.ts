import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import knex from 'knex'
import { Model } from 'objection';
import session from 'express-session';
import routes from '../config/routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();

const knexInstance = knex({
    client: process.env.DB_CLIENT || "pg",
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432')
    }
})

Model.knex(knexInstance);

app.use(cors());
app.use("/public", express.static(path.resolve(__dirname, 'public')));
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

// session
app.set('trust proxy', true)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/v1", routes.apiRouter)

export default app;