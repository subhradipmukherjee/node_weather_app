const request = require('request')




const forecast = (lat,lon,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3f20b3bae7d75df71dcdb5e45ff5e1d5&query="+lat+","+lon
    
     request({url: url, json:true}, (err, response)=>{
        if(err)
        {
            callback('Unable to connect to server')
            
        } else if(response.body.error) {
           
            callback('Unable to fetch Location')
          
        } else {
            const data = {
                temp: response.body.current.temperature,
                feel: response.body.current.feelslike,
                desp: response.body.current.weather_descriptions[0]

            }
            callback(undefined,data)
        }
    
    })

}

// forecast(28.57,77.32,(error,data)=>{
//     if(error)
//     {
//         console.log(error)
//     }else {
//         console.log(data)
//     }
// })

module.exports = forecast