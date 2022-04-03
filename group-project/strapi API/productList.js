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
   
    let urlLocalhost = apiUrl +`/api/Laptops${productUrl}?populate=`;
    console.log('Hello' + productUrl)
    let stringResponse = await fetch (urlLocalhost);
    let myobject = await stringResponse.json();
    let output = '';
    let index = 0;
    
    //Kolla om data är en array
    if(Array.isArray(myobject.data)){
        myobject.data.forEach(element => {
            
            let attr = element.attributes;
            console.log(element);

            output += `
                <a href="index2.html"><div class="grid-item" onclick="getInfo(${element.id})">
                    <div class="laptop-image">
                        <img src="${laptopsImages[index].image}"></img>
                    </div>
                    <div class="item-info">
                        <div class="item-title">${attr.Title}</div>
                        <div>Price: ${attr.Price}</div>
                        <div>Qty: ${attr.Qty}</div>
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
                        <div class="item-title">${object.Title}</div>
                        <div>Price: ${object.Price}</div>
                        <div>Qty: ${object.Qty}</div>
                    </div>
                    
                </div>`;
    }
    document.getElementById('output').innerHTML = output;
     
}

renderObjects();

