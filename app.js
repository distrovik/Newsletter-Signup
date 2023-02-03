const express = require("express");
const app = express();
const port = 420;
const heroku = process.env.PORT;
const bodyParser = require("body-parser");
const https = require("https");
const mailChimp = require("@mailchimp/mailchimp_marketing");

app.listen(port || heroku, () => {
    console.log("Server started on port"+port);
  });

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/index.html");
});

mailChimp.setConfig({
  apiKey: "3332ff7dfd344b287f774fdc06e8d55d",
  server: "us8",
});

app.post("/", (req,res) => {

    const userData = {
      firstName: req.body.fn,
      lastName: req.body.ln,
      email: req.body.email,
    }

    const run = async () => {
      const response = await mailChimp.lists.batchListMembers("f9aae767c2",{
        members:[
          {
          email_address: userData.email,
          status:"subscribed",
          merge_fields: {
            FNAME: userData.firstName,
            LNAME: userData.lastName,
          }
        }
      ],});
      if (response.error_count > 0){
        res.sendFile(__dirname+"/bsfailure.html");
        console.log("A User Failed to Signup");
        console.log(userData.firstName,userData.lastName);
        console.log(userData.email);
      }else{
        res.sendFile(__dirname+"/bssuccess.html");
        console.log("New User Signed Up");
        console.log(userData.firstName,userData.lastName);
        console.log(userData.email);
      }};
      run();
     
    });

    // app.get("/successful", (req,res)=>{
    //   res.sendFile(__dirname+"/bssuccess.html")
    // });

    // app.get("/Signupfailure", (req,res)=>{
    //   res.sendFile(__dirname+"/bsfailure.html")
    // });
    app.post("/signfailure", (req,res) =>{
      res.redirect("/");
    });

// TIANYU METHOD
  //   const run = async () => {
  //     try {
  //       const response = await client.lists.addListMember("f9aae767c2", {
  //         email_address: subscribingUser.email,
  //         status: "subscribed",
  //         merge_fields: {
  //           FNAME: subscribingUser.firstName,
  //           LNAME: subscribingUser.lastName,
  //         }
  //       });
  //       console/log(response);
  //       res.sendFile(__dirname+"/success.html") 
  //     } catch (err) {
  //       console.log("======ERROR======");
  //       console.log(err.status);
  //       res.sendFile(__dirname+"/failure.html")
  //     }
  //   };

  //   run();
  // });

  // app.post("/failure", (req,res)=>{
  //   res.redirect("/")
  // });


  // ANGELA METHOD (RETIRED)
    // const data = {
    //   members: [
    //     {
    //       email_address: email,
    //       status: "subscribed",
    //       merge_fields: {
    //         FNAME: fname,
    //         LNAME: lname,
    //       }
    //     }

    //   ]

    // };

    // const jsonData = JSON.stringify(data);

    // const urls = "https://us8.api.mailchimp.com/3.0/lists/f9aae767c2";

    // const options = {
    //   method: "POST",
    //   auth: "V:3332ff7dfd344b287f774fdc06e8d55d-us8"
    // }
    
    // const request = https.request(urls, options, (response) =>{
    //   response.on("data", (data) => {
    //     console.log(JSON.parse(data));
    //   });

    // });

    // request.write(jsonData);
    // request.end



//List ID
//f9aae767c2
// API KEY
// 3332ff7dfd344b287f774fdc06e8d55d-us8