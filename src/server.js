
import express from 'express'
import bodyParser from 'body-parser'
import citiesController from './controllers/citiesController'

const app = express();

app.use(bodyParser.json())


app.use('/api/v1.0/cities', citiesController)

export default app