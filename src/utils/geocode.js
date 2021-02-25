const request = require('request')

const geocode = ( addr, callback) => {
  
    const geourl= "https://api.mapbox.com/geocoding/v5/mapbox.places/" + addr + ".json?access_token=pk.eyJ1Ijoic3ViaHJhZGlwNTU4MyIsImEiOiJja2t2YzRzNXQxMzhtMnVsbTB5cXllb24wIn0.AxietwCwHZ-mj1CZsTg5Bw&limit=1"    
    request({url: geourl, json:true}, (err,resp)=>{
        if(err)
        {
            callback('Unable to connect to server')
            
        } else if(resp.body.features.length === 0) {
            callback('Unable to fetch cordinates')
           
        }else {
            const data = {
                lat : resp.body.features[0].center[1],
                long  : resp.body.features[0].center[0],
                loc : resp.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })    

}

module.exports = geocode

