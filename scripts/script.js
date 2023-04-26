window.addEventListener('DOMContentLoaded', (event)=>{
    
    const fetchItem = async (url) => {
        await getListItem(url);
    }

    //Metodo para hacer llamadas a la API
    const getListItem = async (url) => {
        const result = await fetch(url);
        const listResult = await result.json();
        console.log(listResult.results);
        createItemShopPokemon(listResult.results);
    }

    const createItemShopPokemon = (list) => {
        for (let i = 0; i<list.length; i++){
            const container = document.querySelector('.container');
            const pokeItem = document.createElement('div');
            container.appendChild(pokeItem);
            pokeItem.setAttribute('class','card');
            pokeItem.setAttribute('id','pokeItem_list'+i);
            const pokeItem_list = document.querySelector('#pokeItem_list'+i);
            const item = document.createElement('p');
            item.classList.add('list_item');
            pokeItem_list.appendChild(item)
            item.innerText = (list[i].name).toUpperCase();
        }
    }

    fetchItem('https://pokeapi.co/api/v2/item?limit=10&offset=0');
});