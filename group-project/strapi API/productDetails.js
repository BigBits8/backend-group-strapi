
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
   
    let urlLocalhost = apiUrl +`/api/Laptops${productUrl}?populate=image`;
    console.log('Hello' + productUrl)
    let stringResponse = await fetch (urlLocalhost);
    let myobject = await stringResponse.json();
    let output = '';
    let index = 0;
    
    //Kolla om data är en array
    if(Array.isArray(myobject.data)){
        myobject.data.forEach(element => {
            
            let attr = element.attributes;
            if (attr.image.data === null){
                 img = 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1649245136/white_omnxo9.jpg';
                
            }else{
                img = attr.image.data.attributes.formats.medium.url;
            }
            console.log(element);
            
            output += `
            
            <div class="col-4" onclick="getInfo(${element.id})">
            <div class="card h-100 shadow-sm"> <img src="${img}" class="card-image-top"/>
              <div class="card-body">
                <div class="clearfix mb-3"> <span class="float-start badge rounded-pill bg-primary">Qty:${attr.qty}</span> <span class="float-end price-hp">${attr.price}kr</span> </div>
                    <h5 class="card-title">${attr.title}</h5>                  
                    </div>                               
                </div>
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



