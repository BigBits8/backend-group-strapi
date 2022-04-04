


async function renderObjects(){
    let productUrl = localStorage.getItem('objId');
    console.log(productUrl);
    let apiUrl = "http://localhost:1337";
    console.log(apiUrl);

    let urlLocalhost = `http://localhost:1337/api/Laptops${productUrl}?populate=image`;

    let stringResponse = await fetch (urlLocalhost);
    let myobject = await stringResponse.json();
    let output = '';
    let index = 0;
     let title  = '';
    let details  = '';
    let price  = 0;
    let qty  = 0;
    let image = '';
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
               index++;
        });
    }else{
        let object = myobject.data.attributes;
       
         title += `<div class="title"> Title: ${object.title}</div>`;
         details += `<div> Description: ${object.description}</div>`;
         image += `<img src="${object.image.data.attributes.formats.small.url}">`;
         price += `<div> Price: ${object.price}</div>`;
         qty+= `<div> In stock: ${object.qty}</div>`;
    }
     document.getElementById("title").innerHTML = title;
     document.getElementById("details").innerHTML = details;
     document.getElementById("image").innerHTML = image;
     
}

renderObjects();

