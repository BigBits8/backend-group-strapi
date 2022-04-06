// Fetch data from strapi API

async function getDataFromStrapi(){
    // Url för att hämta alla produkter från strapi
    let url = 'http://localhost:1337/api/Laptops';

    // Hämtar JSON API och konverterar till json objekt
    let apiResponse = await fetch(url);
    let strapiObject = await apiResponse.json();
    console.log(strapiObject);

    // Kolla om det är singular eller plural
    let output = '';
    if(Array.isArray(strapiObject.data)){
        strapiObject.data.forEach(element => {
            let obj = element.attributes;

            output += 
            `<div>Title: 
            ${obj.title}
            </div>`;
        });

        
    }else{
        let obj = strapiObject.data.attributes;
        output += 
        `<div>
            ${obj.title};
        </div>`
    }
    document.getElementById('output').innerHTML = output;
}

function generateRow(obj, objId, header){
    let output = '<table>';

    let forbiddenParameters = ["createdAt", "updatedAt", "publishedAt"];
    if(!header){
        let postURL = `http://localhost:1337/api/Laptops/${objId}`;
         output += `<td><button onclick="deletePost('${postURL}');">Delete Post</button></td>`;
    }
   output += `</table>`;

   return output;
}