window.addEventListener('DOMContentLoaded', (event)=>{

    function getName() {
        const nameItemSearch = window.location.search;
        const urlNameParams = new URLSearchParams(nameItemSearch);
        const name = urlIdParams.get('name');
        return name;
    }
    
    const fetchItem = async () => {
        await getListItem();
    }

    const getListItem = async () => {
        const url = `https://pokeapi.co/api/v2/item?limit=1000`;
        const result = await fetch(url);
        const listResult = await result.json();
        const urlItem = [];
        listResult.array.forEach(element => {
            if(element.name==getName()){
                urlItem.push(element.url);
            }
        });
        console.log(urlItem);
    }

    fetchItem('https://pokeapi.co/api/v2/item?limit=10&offset=0');
});