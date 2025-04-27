import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "yoursecretusern";
const yourPassword = "yoursecretpassw";
const yourAPIKey = "a54afda8-7686-47b1-b8e9-a99177e2ffac";
const yourBearerToken = "6d53121a-3dfb-4956-bcbb-174516a03487";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/register", async (req, res) => {
  try{
    const response = await axios.post("https://secrets-api.appbrewery.com/register",{
      username: "yoursecretusern",
      password: "yoursecretpassw"
    })
    res.render("index.ejs",{content: "Successful Registration"});
    }
    catch (error) {
    console.error("Failed to make request during /register:", error.message);
    res.render("index.ejs", {
      content: "No activities that match your criteria.",
    });
  }
  
}
);

app.get("/get_api_key", async (req, res) => {
  try{
    const Response = await axios.get("https://secrets-api.appbrewery.com/generate-api-key")
    let key  = Response.data.apiKey;
    console.log("API Key: ", key);
    res.render("index.ejs", { content: "API Key Retrieved." });
  }
  catch(error){
    console.log(error);
    console.log("Failed to make request during /get_api_key:", error.message);
    res.render("index.ejs", {
      content: "Failed to retrieve API Key.",
    });
  }
  
})
app.get("/generate_token", async (req, res) => {
  try{
    const response = await axios.post("https://secrets-api.appbrewery.com/get-auth-token", {
      username : yourUsername,
      password : yourPassword,
    });
    console.log("Bearer Token: ", response.data.token);
    res.render("index.ejs", { content: "Bearer Token Retrieved." });
  }
  catch (error) {
    console.log(error);
    console.error("Failed to make request during /generate_token:", error.message);
    res.render("index.ejs", {
      content: "Failed to retrieve Bearer Token.",
    });
  }
});
app.get("/noAuth", async(req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  }
  catch (error) {
    console.error("Failed to make request during /noAuth:", error.message);
    res.render("index.ejs", {
      content: "Error.",
    });
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async(req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
      auth:{
        username: yourUsername,
        password: yourPassword,
      }
    }
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  }
  catch (error) {
    console.error("Failed to make request during /basicAuth:", error.message);
    res.render("index.ejs", {
      content: "Error.",
    });
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async(req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/filter?score=5", {
      params:{
        apiKey : yourAPIKey,
      }
    }
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  }
  catch (error) {
    console.error("Failed to make request during /apiKey:", error.message);
    res.render("index.ejs", {
      content: "Error.",
    });
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async(req, res) => {
  try{
    const response = await axios.get(`https://secrets-api.appbrewery.com/secrets/${42}`, {
      headers:{
        Authorization: `Bearer ${yourBearerToken}`,
      }
    }
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  }
  catch (error) {
    console.error("Failed to make request during /token:", error.message);
    res.render("index.ejs", {
      content: "Error.",
    });
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
