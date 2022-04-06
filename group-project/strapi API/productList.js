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
    console.log('Product URL:' + productUrl)
    let stringResponse = await fetch (urlLocalhost);
    let myobject = await stringResponse.json();
    let output = '';
    let index = 0;
    
    //Kolla om data är en array
    if(Array.isArray(myobject.data)){
        myobject.data.forEach(element => {
            
            let attr = element.attributes;
            // let img;
            console.log(element);
            

            if (attr.image.data === null){
                img = 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1649245136/white_omnxo9.jpg';
                
            }else{
                img = attr.image.data.attributes.formats.thumbnail.url;
            }
            
            output += `
                <a href="index2.html"><div class="grid-item" onclick="getInfo(${element.id})">
                    <div class="laptop-image">
                        <img src="${img}" alt="picture missing"></img>
                    </div>
                    <div class="item-info">
                        <div class="item-title">${attr.title}</div>
                        <div>Price: ${attr.price}</div>
                        <div>Qty: ${attr.qty}</div>
                    </div>
                    
                </div></a>
                
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

