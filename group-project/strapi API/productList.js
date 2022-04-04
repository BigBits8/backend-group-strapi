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
            console.log(element);
            // console.log(attr.Image.data.attributes.formats.thumbnail.url);
            output += `
                <a href="index2.html"><div class="grid-item" onclick="getInfo(${element.id})">
                    <div class="laptop-image">
                        <img src="${attr.image.data.attributes.formats.medium.url}"></img>
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

{/* <script>
let laptopsImages = [
        {
        id: 1,
        image: 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1648042833/medium_asus_zenbook_14x_oled_ux5401_14_barbar_dator_i716512_pdp_zoom_3000_pdp_main_960_a820a16ed0.jpg',
            
        },
        {
            id: 2,
            image: 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1648042852/medium_hp_elitebook_840_g8_14_barbar_dator_i58256gb_silver_pdp_zoom_3000_pdp_main_960_8024476c0a.webp'
        },
        {
            id: 3,
            image: 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1648042874/medium_lenovo_thinkpad_e14_gen2_14_barbar_dator_i58256_gb_svart_pdp_zoom_3000_pdp_main_960_58e29acd64.webp'
        },
        {
            id: 4,
            image: 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1648042874/medium_hp_pavilion_aero_13_be0834no_133_barbar_dator_pdp_zoom_3000_pdp_main_960_3db6b8e193.jpg'
        },
        {
            id: 5,
            image: 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1648319039/acer-aspire-5-156barbar-dator-i716512mx450--pdp_zoom-3000--pdp_main-960_xmdbld.webp'
        },
        {
            id: 6,
            image: 'https://res.cloudinary.com/dfqx0ptfj/image/upload/v1648323088/samsung-galaxy-book-156-barbar-dator-i58gb256gbw11--pdp_zoom-3000--pdp_main-960_lt6hkf.webp'
        },
    ]
</script> */}