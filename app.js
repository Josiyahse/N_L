const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =  require("https");

const app = express();

const Port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/singup.html");
})

app.post("/",function(req,res){

    const FirstName = req.body.FirstName;
    const SecondName = req.body.SecondName;
    const email = req.body.email;
   
   const data = {
        members : [
            {
                email_address : email,
                status: "subscribed",
                merge_fields :{
                    FNAME: FirstName,
                    LNAME : SecondName,
                }
            }
        ]
   };

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/ea4da10121";
        const option = {
            method :'POST',
            auth: 'josiayahse:f0efad8139c69a66c58a3ec6fd5012c9-us7',
        }

        const request = https.request(url,option,function(response){

            if (response.statusCode===200){
                res.sendFile(__dirname + "/success.html")
            } else{
                res.sendFile(__dirname + "/failure.html")
            }

            response.on("data",function(data){
                console.log(JSON.parse(data));
            })

        });

    request.write(jsonData);
   request.end();
});

app.post("/failure.html",function(req,res){
    res.redirect("/")
})
 

app.listen(process.env.PORT || Port,function(){
    console.log("Server started at port : " + Port +" with success");
});

//API KEY of mailChimp : 
//f0efad8139c69a66c58a3ec6fd5012c9-us7

//List id : ea4da10121