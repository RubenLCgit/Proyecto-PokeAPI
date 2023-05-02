window.addEventListener('DOMContentLoaded', (event)=>{
    
    function getId() {
        const idItemSearch = window.location.search;
        const urlIdParams = new URLSearchParams(idItemSearch);
        const Id = urlIdParams.get('id');
        return Id;
    }

    const fetchItem = async () => {
        await getListItem();
    }

    //Metodo para hacer llamadas a la API
    const getListItem = async () => {
        const url = 'https://pokeapi.co/api/v2/item/'+getId();
        const result = await fetch(url);
        const listResult = await result.json();
        createItemShopPokemon(listResult);
    }

    const createItemShopPokemon = (list) => {
        
        const container = document.querySelector('.itemDetail');
        const pokeItem = document.createElement('div');
        container.appendChild(pokeItem);
        pokeItem.setAttribute('class','bigCard');
        pokeItem.setAttribute('id','pokeItem_list');

        const pokeItem_list = document.querySelector('#pokeItem_list');
        const item = document.createElement('h1');
        item.classList.add('nameDetail_item');
        pokeItem_list.appendChild(item)
        item.innerText = (list.name).toUpperCase();

        const paragraph1 = document.createElement('p');
        pokeItem.appendChild(paragraph1);
        paragraph1.classList.add('description_item');
        pokeItem.appendChild(paragraph1);
        paragraph1.innerHTML = (list.flavor_text_entries[0].text).toUpperCase();

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
        paragraph4.innerHTML = ('<strong>nombre japonés: &#x21D2;</strong>'+list.names[8].name).toUpperCase();

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
            paragraph6.innerText = ("No cuenta con ningún atributo").toUpperCase();
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
        paragraph8.innerHTML = (list.effect_entries[0].effect).toUpperCase();
        
    }
    fetchItem();
});