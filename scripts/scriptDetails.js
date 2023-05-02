window.addEventListener('DOMContentLoaded', (event)=>{
    
    function getId() {
        const idItemSearch = window.location.search;
        const urlIdParams = new URLSearchParams(idItemSearch);
        const Id = urlIdParams.get('id');
        return Id;
    }

    const getIdForName = async () => {//Metodo que recibe el nombre introducido en el buscador de la página principal y localiza y devuelve el id que tiene asignado en la pokeAPI
        const nameItemSearch = window.location.search;
        const urlNameParams = new URLSearchParams(nameItemSearch);
        const name = urlNameParams.get('name');
        let list = await callAPI(`https://pokeapi.co/api/v2/item?limit=100000&offset=0`);
        let urlItem;
        list.results.forEach(element => {
            if(element.name==name){
                urlItem=element.url;
            }
        });
        list = await callAPI(urlItem);
        const idNameItem = list.id;
        return idNameItem;
    }

    const callAPI = async (url) => {
        const result = await fetch(url);
        const listResult = await result.json();
        return listResult;
    }

    const fetchItem = async () => {
        await getListItem();
    }
    const getListItem = async () => {//Metodo que asigna el id correcto a la llamada a la api ya sea obteniendolo, del nombre introducido en el buscador o de enlace de un item, de la pagina principal.
        let id;
        let url;
        if(getId()!=null){
            id = await getId();
        }else{
            id = await getIdForName();
        }
        url = 'https://pokeapi.co/api/v2/item/'+id;
        const result = await fetch(url);
        const listResult = await result.json();
        createItemShopPokemon(listResult);
    }

    const createItemShopPokemon = async (list) => {

        const container = document.querySelector('.itemDetail');

        let randomNumber = Math.floor(Math.random() * 20+1);
        let list0 = await callAPI(`https://pokeapi.co/api/v2/pokemon/`+randomNumber);
        console.log(list0);
        const pokeImage0 = document.createElement('div');
        container.appendChild(pokeImage0);
        pokeImage0.setAttribute('class','pokeImage');
        const img0 = document.createElement('img');
        img0.classList.add('imgPokemon');
        pokeImage0.appendChild(img0);
        img0.setAttribute('src',list0.sprites.front_default);
        img0.setAttribute('alt',list.name);
        
        
        const pokeItem = document.createElement('div');
        container.appendChild(pokeItem);
        pokeItem.setAttribute('class','bigCard');
        pokeItem.setAttribute('id','pokeItem_list');

        const pokeItem_list = document.querySelector('#pokeItem_list');
        const item = document.createElement('h1');
        item.classList.add('nameDetail_item');
        pokeItem_list.appendChild(item)
        item.innerText = (list.name);

        const paragraph1 = document.createElement('p');
        pokeItem.appendChild(paragraph1);
        paragraph1.classList.add('description_item');
        pokeItem.appendChild(paragraph1);
        if(list.flavor_text_entries.length === 0){//Al no tener este tipo de información disponible para todos los items de la api, se usa este condicional para que en el caso de que no cuente con él, muestre un mensaje y permita al código seguir ejecutandose.
            paragraph1.innerText = ('NO INFORMATION AVAILABLE');
        }else{
            paragraph1.innerText = (list.flavor_text_entries[0].text).toUpperCase();
        }
        const img = document.createElement('img');
        img.classList.add('imgDetail_item');
        pokeItem_list.appendChild(img);
        img.setAttribute('src',list.sprites.default);
        img.setAttribute('alt',list.name);

        const pokeItem2 = document.createElement('div');
        pokeItem.appendChild(pokeItem2);
        pokeItem2.setAttribute('class','div_category');


        const paragraph2 = document.createElement('p');
        pokeItem2.appendChild(paragraph2);
        paragraph2.classList.add('category_item');
        pokeItem2.appendChild(paragraph2);
        paragraph2.innerHTML = ('<strong>category: &#x21D2;</strong>'+list.category.name).toUpperCase();

        const paragraph3 = document.createElement('p');
        pokeItem2.appendChild(paragraph3);
        paragraph3.classList.add('effect_item');
        pokeItem2.appendChild(paragraph3);
        paragraph3.innerHTML = ('<strong>cost: &#x21D2; </strong>'+list.cost+' Pokedólares').toUpperCase();

        const paragraph4 = document.createElement('p');
        pokeItem2.appendChild(paragraph4);
        paragraph4.classList.add('japones_item');
        pokeItem2.appendChild(paragraph4);
        let numJap;
        list.names.forEach((item,index) => {/*Como el idioma japonés no se encuentre en la misma posicion del array names de la base de datos para todos los Items, busco el ese idioma en para localizar su index para cada objeto*/
            let lang= item.language.name
            if(lang=='ja'){
                numJap=index;
            }
        });
        paragraph4.innerHTML = ('<strong>nombre japonés: &#x21D2;</strong>'+list.names[numJap].name).toUpperCase();

        const bigCard = document.querySelector('.bigCard');
        const atributes = document.createElement('div');
        bigCard.appendChild(atributes);
        atributes.setAttribute('class','features');
        const paragraph5 = document.createElement('p');
        atributes.appendChild(paragraph5);
        paragraph5.classList.add('listAtrib');
        paragraph5.classList.add('underline');
        paragraph5.innerHTML = ('<strong>AVAILABLE ATTRIBUTES</strong>').toUpperCase();

        const atributeItem = list.attributes;
        if(atributeItem.length === 0){
            const paragraph6 = document.createElement('p');
            paragraph6.classList.add('Atrib');
            atributes.appendChild(paragraph6);
            paragraph6.innerText = ("NO INFORMATION AVAILABLE").toUpperCase();
        }else{
            atributeItem.forEach((item,index) => {
                const paragraph6 = document.createElement('p');
                paragraph6.classList.add('Atrib');
                atributes.appendChild(paragraph6);
                paragraph6.innerText = (index+1+'- '+item.name).toUpperCase();
            });
        }

        const effects = document.createElement('div');
        bigCard.appendChild(effects);
        effects.setAttribute('class','features');
        const paragraph7 = document.createElement('p');
        effects.appendChild(paragraph7);
        paragraph7.classList.add('listEffects');
        paragraph7.classList.add('underline');
        paragraph7.innerHTML = ('<strong>ITEM EFFECTS</strong>').toUpperCase();
        const paragraph8 = document.createElement('p');
        effects.appendChild(paragraph8);
        paragraph8.classList.add('listEffects');
        if(list.effect_entries.length === 0){
            paragraph8.innerText = ('NO INFORMATION AVAILABLE');
        }else{
            paragraph8.innerHTML = (list.effect_entries[0].effect).toUpperCase();
        }

        randomNumber = Math.floor(Math.random() * 20+1);
        let list3 = await callAPI(`https://pokeapi.co/api/v2/pokemon/`+randomNumber);
        console.log(list3);
        const pokeImage = document.createElement('div');
        container.appendChild(pokeImage);
        pokeImage.setAttribute('class','pokeImage');
        const img2 = document.createElement('img');
        img2.classList.add('imgPokemon');
        pokeImage.appendChild(img2);
        img2.setAttribute('src',list3.sprites.front_default);
        img2.setAttribute('alt',list.name);
        
    }
    fetchItem();
});