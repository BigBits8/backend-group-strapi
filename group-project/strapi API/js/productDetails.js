
// Hämtar variabel sparad i localstorage från ProductList för att hämta korrekt id nummer
// i urlLocalhost
productUrl = localStorage.getItem('objId');
productTypeApi = localStorage.getItem('objType');

async function renderObjects(){
    let apiUrl = "http://localhost:1337";
    console.log(apiUrl);

    let urlLocalhost = `http://localhost:1337/api/${productTypeApi}${productUrl}?populate=image`;
    // Fetchar url och gör om till json
    let urlResponse = await fetch (urlLocalhost);
    let productObject = await urlResponse.json();
    let output = '';
    
     
    //För produkt sidan / Flera objekt
    if(Array.isArray(productObject.data)){
        productObject.data.forEach(element => {
            
            let attr = element.attributes;
            console.log(element);

            // Om bild är null(existerar inte i strapi att hämta), visa en vit bild
            // Bilden hämtas från en cloud databas kallad cloudinary
            if (attr.image.data === null){
                img = 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1649245136/white_omnxo9.jpg';
              // Om bild finns  på Strapi hämta bild som url
            }else{
                img = attr.image.data.attributes.formats.thumbnail.url;
            }

             output += `
                <div class="col-4 click" onclick="getInfo(${element.id})">
            <a href="laptop-0"><div class="card h-100 shadow-sm"> <img src="${img}" class="card-image-top"/>
              <div class="card-body">
                <div class="clearfix mb-3"> <span class="float-start badge rounded-pill bg-primary">Qty:${attr.qty}</span> <span class="float-end price-hp">${attr.price}kr</span> </div>
                    <h5 class="card-title">${attr.title}</h5>                  
                    </div>                               
                </div></a>
            </div>
                
            `;
               
        });
    }else{
        // För detaljerad sida / Singel objekt
        let object = productObject.data.attributes;

        if (object.image.data === null){
                img = 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1649245136/white_omnxo9.jpg';
              // Om bild finns  på Strapi hämta bild som url
            }else{
                img = object.image.data.attributes.formats.medium.url;
            }

         output = `
        <div class="container">
        <div class="card mb-6" style="max-width: 1980px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${img}" class="img-fluid rounded-start">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">${object.title}</h5>
              <p class="card-text">${object.description}</p>              
              <p class="card-text"><span class="float-start badge rounded-pill bg-secondary">Qty:${object.qty}</span> <span class="float-end price-hp">Price: ${object.price}kr</span></p>
            </div>
          </div>
        </div>
      </div>
      </div>
  
        `
    }
     document.getElementById("desc").innerHTML = output;
}

renderObjects();











{/* <script>

laptopsUrl = localStorage.getItem('objId');

async function renderObjects(){
    let apiUrl = "http://localhost:1337";
    console.log(apiUrl);

    let urlLocalhost = `http://localhost:1337/api/Laptops${laptopsUrl}?populate=image`;

    let stringResponse = await fetch (urlLocalhost);
    let myobject = await stringResponse.json();
    let output = '';
    
     
    
    //Kolla om data är en array
    if(Array.isArray(myobject.data)){
        myobject.data.forEach(element => {
            
            let attr = element.attributes;
            console.log(element);

            output += `
                <div class="grid-item">
                    <div class="laptop-image">
                        <img src="${images[index].image}"></img>
                    </div>
                    <div class="item-info">
                        <div class="item-title">${attr.title}</div>
                        <div>Price: ${attr.price}</div>
                        <div>Qty: ${attr.qty}</div>
                    </div>
                    
                </div>
                
            `;
               
        });
    }else{
        // Om det bara är ett objekt
        let object = myobject.data.attributes;

         output = `
        <div class="container">
        <div class="card mb-6" style="max-width: 1980px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${object.image.data.attributes.formats.medium.url}" class="img-fluid rounded-start">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">${object.title}</h5>
              <p class="card-text">${object.description}</p>              
              <p class="card-text"><span class="float-start badge rounded-pill bg-secondary">Qty:${object.qty}</span> <span class="float-end price-hp">Price: ${object.price}kr</span></p>
            </div>
          </div>
        </div>
      </div>
      </div>
  
        `
    }
     document.getElementById("desc").innerHTML = output;
}

renderObjects();




</script> */}


















{/* <script>
   let productUrl = '';
 let myId = 0;
//   function getInfo(props){
//     myId = props;
//     laptopsUrl = '/'+ props
//     console.log('laptopsUrl'+ laptopsUrl);
//     console.log('props'+ props);
//     renderObjects();

// }

function getInfo(props){
    myId = props;
   productUrl = '/'+ props
    console.log(productUrl);
    localStorage.setItem('objId', productUrl);
    // renderObjects(laptopsUrl);
    

}

async function renderObjects(){
    
    
    let apiUrl = "http://localhost:1337";
    console.log(apiUrl);
    console.log('test'+productUrl);
   
    let urlLocalhost = apiUrl +`/api/Monitors${productUrl}?populate=image`;
    console.log('Hello' + productUrl)
    let stringResponse = await fetch (urlLocalhost);
    let myobject = await stringResponse.json();
    let output = '';
    let index = 0;
    
    //Kolla om data är en array
    if(Array.isArray(myobject.data)){
        myobject.data.forEach(element => {
            // <img src="${attr.image.data.attributes.formats.medium.url}"></img>
            // <a href="index2.html"><div class="grid-item" onclick="getInfo(${element.id})">
            let attr = element.attributes;
            console.log(element);
            // console.log(attr.image.data.attributes.formats.thumbnail.url);
            output += `
            
            <div class="col-4" onclick="getInfo(${element.id})">
             <a href="laptop-1"><div class="card h-100 shadow-sm"> <img  src="${attr.image.data.attributes.formats.medium.url}" class="card-image-top"/>
              <div class="card-body">
                <div class="clearfix mb-3"> <span class="float-start badge rounded-pill bg-primary">Qty:${attr.qty}</span> <span class="float-end price-hp">${attr.price}kr</span> </div>
                    <h5 class="card-title">${attr.title}</h5>                  
                    </div>                               
                </div></a>
            </div>
            `;
             
               index++;
              
        });
    }else{
        
        let object = myobject.data.attributes;
        
         output += `<div class="grid-item">
                    <div class="laptop-image">
                        <img src="${laptopsImages[myId-1].image}"></img>
                    </div>
                    <div class="item-info">
                        <div class="item-title">${object.title}</div>
                        <div>Price: ${object.price}</div>
                        <div>Qty: ${object.qty}</div>
                    </div>
                    
                </div>`;
    }
    document.getElementById('output').innerHTML = output;
     
}

renderObjects();



</script> */}