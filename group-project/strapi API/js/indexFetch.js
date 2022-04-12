//Function to fetch data from Strapi
async function getDataFromStrapi() {
  
  //Skapar en array med produkter-typ som ska fetchas genom en for-loop
  let arr = [
    'Laptops',
    'Monitors',
    'Keyboards'];
    //En for lopp för att gå igenom varje produkt typ.
  for (let i = 0; i < arr.length; i++) {
    //Url till Strapi API för hämtning av produkter
       let url = `http://localhost:1337/api/${arr[i]}?populate=*`;

  //Fetches JSON from SPI and convert to JS object
  let stringResponse = await fetch(url);
  let myObject = await stringResponse.json();

  console.log(myObject);

  let output = "";

  //Checks if one or more objects are fetched
  if (Array.isArray(myObject.data)) {

    //Loops through every element in array
    myObject.data.forEach((element) => {

      //A pointer to attributes
      let obj = element.attributes;
     
      //Skriver Output string med typ av produkt
    
      output += `<div>${arr[i]}: ${obj.title}</div>`;
    
    });
  } else {
    //Gör en pekare till attribut objektet
    let obj = myObject.data.attributes;
   
     //Output to string
    output += `<div>Title: ${obj.title}</div>`;
  }

  //Output string to div
  //document.write(output);
  document.getElementById("laptopFetched").innerHTML += output;
  
  }
 
}

//Fetches token if user and pass is correct
async function getToken() {

    let valid = true;

    //Validate user and pass
    if (!validateLogin()) valid = false;

    if (!valid) return null;

  //Url to Strapi.js UserList
  const urlUser = "http://localhost:1337/api/auth/local/";

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  //object created from user and pass
  let userObject = {
    identifier: user,
    password: pass,
  };

  //Calls API with login data
  let userResponse = await fetch(urlUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  //Converts API response JSON string to object
  let userJson = await userResponse.json();
  console.log(userJson);

 //Checks if object has Token.
  if (userJson.jwt) postData(userJson.jwt);
  else {
    //Failed login = error message
    let errMessage = userJson.error.message;

    document.getElementById("userError").innerText = errMessage;

    return null;
  }
}

async function postData(token) {

  // Hämtar vald produkt typ och används i urlProduct
  const productType = document.getElementById("productType").value;
  console.log(productType);

  //URL to Strapi database
  const urlProduct = `http://localhost:1337/api/${productType}`;

  //Fetches data from input
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const qty = document.getElementById("qty").value;

  //Creates object from data
  let laptopObject = {
    data: {
      title: title,
      description: description,
      price: price,
      qty: qty,
    },
  };

  //Calls API with object
  let laptopResponse = await fetch(urlProduct, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, //Inkluderar Token från inloggning tidigare.
    },
    body: JSON.stringify(laptopObject),
  });

  let laptopJson = await laptopResponse.json();

  console.log(laptopJson);
}

//Validation
function userValidate(comp) {
     //Must have input

    let valid = true;

    if (comp.value.length == 0) {
         //Failed validation
        valid = false;
    }

    //Error message
    if (!valid) {
        document.getElementById("userError").innerText = "Du måste fylla i ett användarnamn!";
        return false;
    } else {
        document.getElementById("userError").innerText = "";
        return true;
    }
}

//Validation password
function passValidate(comp) {
   //Must be longer than 5

    let valid = true;

    if (comp.value.length <= 4) {
        //Failed validation
        valid = false;
    }

     //Error message
    if (!valid) {
        document.getElementById("passwordError").innerText = "Lösenordet måste vara minst 5 tecken långt!";
        return false;
    } else {
        document.getElementById("passwordError").innerText = "";
        return true;
    }
}

//Validate login
function validateLogin() {
    //Variabel
    let valid = true;

    //Validate user
    if (!userValidate(document.getElementById("user"))) {
        valid = false;
    }

    //Validate password
    if (!passValidate(document.getElementById("pass"))) {
        valid = false;
    }

    return valid;
}











