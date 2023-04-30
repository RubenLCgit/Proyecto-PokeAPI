window.addEventListener('DOMContentLoaded', (event)=>{
    
    //Metodo para hacer llamadas a la API
    const getListItem = async () => {
        const listItems = async (i) => {
            const randomNumber = Math.floor(Math.random() * 100) + i;
            const url2 =`https://pokeapi.co/api/v2/item/${randomNumber}`;
            const result2 = await fetch(url2);
            const listResult2 = await result2.json();
            console.log(listResult2);
            let list2 = listResult2;

            const container = document.querySelector('.container');
            const pokeItem = document.createElement('div');
            container.appendChild(pokeItem);
            pokeItem.setAttribute('class','card');
            pokeItem.setAttribute('id','pokeItem_list'+i);
            const pokeItem_list = document.querySelector('#pokeItem_list'+i);

            const link = document.createElement('a');
            link.setAttribute('href', "details.html");
            link.classList.add('name_item');
            pokeItem_list.appendChild(link);
            link.innerText = (list2.name).toUpperCase();
            
            const img = document.createElement('img');
            img.classList.add('img_item');
            pokeItem_list.appendChild(img);
            img.setAttribute('src',list2.sprites.default);
            img.setAttribute('alt',list2.name);

            const pokeItem2 = document.createElement('div');
            pokeItem.appendChild(pokeItem2);
            pokeItem2.setAttribute('class','div_category');


            const paragraph2 = document.createElement('p');
            pokeItem2.appendChild(paragraph2);
            paragraph2.classList.add('category_item');
            pokeItem2.appendChild(paragraph2);
            paragraph2.innerHTML = ('<strong>category: &#x21D2;</strong>'+list2.category.name).toUpperCase();

            const paragraph3 = document.createElement('p');
            pokeItem2.appendChild(paragraph3);
            paragraph3.classList.add('effect_item');
            pokeItem2.appendChild(paragraph3);
            paragraph3.innerHTML = ('<strong>cost: &#x21D2; </strong>'+list2.cost+' Pokedólares').toUpperCase();

            const paragraph4 = document.createElement('p');
            pokeItem2.appendChild(paragraph4);
            paragraph4.classList.add('japones_item');
            pokeItem2.appendChild(paragraph4);
            paragraph4.innerHTML = ('<strong>nombre japonés: &#x21D2;</strong>'+list2.names[8].name).toUpperCase();
        }

        const arrayPromises = new Array;

        for (let i = 0; i < 12; i++) {
            arrayPromises.push(listItems(i));
        }
        await Promise.all(arrayPromises);
        
    }
    getListItem();
});