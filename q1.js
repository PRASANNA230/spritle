var express = require('express')
const axios = require('axios')

let app = express()
let port = 4000;

app.listen(port, function(req,res) {
    console.log('server running in port :', port)
})

app.get('/',function (req,res){
    res.redirect('/q1')
})

app.get('/q1',async function(req,res){
    let sampleData =await getData();
    res.send(sampleData)
})

async function getData(){
    console.log('called')
    try {
        var dataa =await axios.get('https://random-data-api.com/api/address/random_address?size=10');
        // console.log(dataa.data);
        let test = dataa.data
        console.log(test)
        return test
    } catch (error) {
        console.log(error,'err')
    }
}