const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const path = require('path')
const express = require('express')
const hbs = require('hbs') 

const app = express()

//console.log(path.join(__dirname,'../'))

const port = process.env.PORT || 3000

// define express config path
const public_path = path.join(__dirname,'../public')
const views_path = path.join(__dirname,'../templates/views')
const partial_path = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partial_path)

//setup static directory to serve
app.use(express.static(public_path))


app.get('',(req,res)=>{

    res.render('index',{
        title: 'Weather',
        name: 'Subhradip'
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{
        title: 'HELP',
        name: 'Subradip'
    })
})


app.get('/about',(req,res)=>{

    res.render('about',{
        title: 'ABOUT',
        name: 'Subradip'
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Subradip',
        error: 'HELP PAGE NOT FOUND .'
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address) {
       
       return  res.send({
        error: 'Please provide a valid location to search'
       })
    } 
    var address = req.query.address;
    geocode(address,(err,resp)=>{

    if(err)
    {
        res.send({
            error: err
           })
        // res.render('404',{
        //     title: '404',
        //     name: 'Roop',
        //     error: err
        // })
    }else{
        //  console.log("Lat: "+resp.lat +". Lon: "+resp.long)
        //  console.log(resp.loc)
        forecast(resp.lat,resp.long,(error,data)=>{
            if(error)
            {
                res.send({
                    error: error
                   })
                // res.render('404',{
                //     title: '404',
                //     name: 'Roop',
                //     error: error
                // })
            }else {

                res.send({
                    Temperature : data.temp,
                    Description : data.desp,
                    Feelslike : data.feel,
                    Latitude : resp.lat,
                    Longitude : resp.long,
                    Address : resp.loc
                 })
               //    console.log(data)
            }
        })

    }

})
  
    
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Roop',
        error: 'ERROR. PAGE NOT FOUND .'
    })
})




//subhradipmukherjee/node_weather_app.git

// geocode(addr,(err,resp)=>{

//     if(err)
//     {
//         console.log(err);
//     }else{
//          console.log("Lat: "+resp.lat +". Lon: "+resp.long)
//          console.log(resp.loc)
//         forecast(resp.lat,resp.long,(error,data)=>{
//             if(error)
//             {
//                 console.log(error)
//             }else {
//                 console.log(data)
//             }
//         })

//     }

// }) 

 
app.listen(port,()=>{
    console.log("listeing on port "+ port)
})