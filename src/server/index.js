const path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv')
const express = require('express')
const app = express()

dotenv.config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'))

const API_DATA = {
    API_URL: "https://api.meaningcloud.com/sentiment-2.1",
    API_KEY: process.env.API_KEY
}

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/view/index.html'))
})

app.post('/check', async function (req, res) {
    const {getUrl} = req.body
    analyze_url = `${API_DATA.API_URL}?key=${API_DATA.API_KEY}&url=${getUrl}&lang=en`
    const result = await fetch(analyze_url);
    const article_analsys = await result.json()
    try {
        const newsData = {
            score_tag : article_analsys.score_tag,
            agreement : article_analsys.agreement,
            confidence : article_analsys.confidence,
          }
        res.send(newsData)
    }
    catch(error) {
        console.log(error);
    }
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.listen(8000, function () {
    console.log(`Server run on port 8000`)
})