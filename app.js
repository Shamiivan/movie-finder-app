const   express = require("express"),
        app     = express(),
        request = require("request");

app.set("view engine", "ejs");  


app.get("/", (req, res)=>{
    res.render("search");
   
});

app.get("/results", (req, res)=>{
    let query = req.query.search;
    let url = "https://www.omdbapi.com/?s=" + query+"&apikey=thewdb";
    request(url, (error,response,body)=>{
        if(!error && response.statusCode == 200){
            let data = JSON.parse(body);
            res.render("results", {data : data});
        } else {
            console.log(`ERROR GETING THE JSON FILE: ${error}`);
        }
    });
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("THE SERVER IS LISTENING");
});
