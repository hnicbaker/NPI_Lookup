const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', async (req, res) => {
    try {
        request('https://npiregistry.cms.hhs.gov/api/?version=2.1&number=1710149620', function (error, response, body) {
        if (!error && response.statusCode == 200) {
   

    const parsedData = JSON.parse(response.body);
    const firstName = parsedData.results[0].basic.first_name;
    const lastName = parsedData.results[0].basic.last_name;

    console.log(firstName);
    console.log(lastName);
    res.send(parsedData);
  }
}) 
        
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

app.get('/lookupNPI/:npi', async (req, res) => {
        try {
            request('https://npiregistry.cms.hhs.gov/api/?version=2.1&number=' + `${req.params.npi}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
    
                const parsedData = JSON.parse(response.body);
           
                res.send(parsedData);
            }
            }) 
                    
                } catch (e) {
                    res.status(500).json({
                        message: e.message
                    })
                }
            })
    
app.listen(process.env.PORT || 8080);