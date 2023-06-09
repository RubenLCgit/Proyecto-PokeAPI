window.addEventListener('DOMContentLoaded', (event)=>{
    
    const getListItem = async () => {
        const listItems = async (i) => {
            const randomNumber = Math.floor(Math.random() * 100) + i;//Genera un número aleatorio para mostrar diferentes Items
            const url2 =`https://pokeapi.co/api/v2/item/${randomNumber}`;
            const result2 = await fetch(url2);
            const listResult2 = await result2.json();
            let list2 = listResult2;

            const container = document.querySelector('.container');
            const pokeItem = document.createElement('div');
            container.appendChild(pokeItem);
            pokeItem.setAttribute('class','card');
            pokeItem.setAttribute('id','pokeItem_list'+i);
            const pokeItem_list = document.querySelector('#pokeItem_list'+i);

            const link = document.createElement('a');
            const idItem = list2.id;
            link.setAttribute('href', "details.html?id="+idItem);
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
            let numJap;
            list2.names.forEach((item,index) => {/*Como el idioma japonés no se encuentre en la misma posicion del array names de la base de datos para todos los Items, busco el ese idioma en para localizar su index para cada objeto*/
                let lang= item.language.name
                if(lang=='ja'){
                    numJap=index;
                }
            });
            paragraph4.innerHTML = ('<strong>nombre japonés: &#x21D2;</strong>'+list2.names[numJap].name).toUpperCase();
        }

        const arrayPromises = new Array;

        for (let i = 0; i < 12; i++) {
            arrayPromises.push(listItems(i));
        }
        await Promise.all(arrayPromises);//Metodo usado para evitar un gran retardo que ocurria al cargar los Items en la pagina princila.
        
    }
    getListItem();
});