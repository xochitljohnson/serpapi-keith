
// basic express server setup
require('dotenv').config()
const fs = require('fs');
const express = require('express');
const app = express();

// serapi methods
const { config, getJson, getHtml } = require('serpapi');

// params object to avoid duplication
const params = {
    engine: 'google',
    q: 'van gogh paintings',
    api_key: process.env.SERPAPI_API_KEY
}

// use a single (1) GET request to meet requirements
app.get('/', async (req, res) => {

    try {
        const getVanGoghPaintingsHtml = await getHtml(params);
    
        // render html page in repository
    res.send(getVanGoghPaintingsHtml);

        const getVanGoghPaintingsJson = await getJson(params);

        // push data into array
        const vanGoghArray = Array.from(getVanGoghPaintingsJson.knowledge_graph.artworks);

        //get result page thumbnail images
        const thumbnailsArray = getVanGoghPaintingsJson.inline_images;

        // add result page thumbnail images to main array
        vanGoghArray.push(...thumbnailsArray.map(image => ({
            title: image.title,
            thumbnail: image.thumbnail,})))

            const content = JSON.stringify(vanGoghArray);
            const filePath = 'download.json'
    
            fs.writeFile(filePath, content, err => {
                if (!err) {
                    res.download(filePath)
                }
    
                if (err) {
                    console.log(err)
                } return
            })
    } catch (error) {
        res.status(500).send('Internal error. Something went wrong.')
    }
    
})



// Listen on port 3000
app.listen(process.env.PORT, console.log('express is running'))