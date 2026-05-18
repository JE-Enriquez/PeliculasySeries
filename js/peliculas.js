const createCards = (show) => {
    const cards = document.createElement('div');
    cards.classList.add('card');
    
    const cardImg = document.createElement('div');
    cardImg.classList.add('card__img');
    
    const img = document.createElement('img');
    // "image" es un objeto con sub-propiedades: { medium: "...", original: "..." }
    // Algunos shows pueden no tener imagen, por eso se verifica antes
    img.src = show.image_url? show.image_url : '';
    img.alt = show.title;
    
    cardImg.appendChild(img);
    cards.appendChild(cardImg);
    
    const cardInfo = document.createElement('div');
    cardInfo.classList.add('title');
    
    const titleSerie = document.createElement('h2');
    titleSerie.classList.add('title__serie');
    titleSerie.textContent = `Nombre de la pelicula: ${show.title}`;
    cardInfo.appendChild(titleSerie);
    
    const cardEpisode = document.createElement('p');
    cardEpisode.classList.add('tittle__episode');
    cardEpisode.textContent = `Su genero es: - ${show.genre}`;
    cardInfo.appendChild(cardEpisode);
    
    cards.appendChild(cardInfo);

    
    return cards;
    
};




document.addEventListener('DOMContentLoaded', () => {
    axios.get('https://devsapihub.com/api-movies', {params: {limit: 10}})
    .then((response) => {
        const menuGrid = document.getElementById('cards');
        const {data} = response;

        console.log(data);


        data.forEach(item => {
                const card = createCards(item);
                menuGrid.appendChild(card);
                              
       
            
        });
    });
});

const searchShows = async () => {
    const searchShow = document.getElementById('searchInputP').value.toLowerCase().toString();
    if(searchShow) {
        try {
            const response = await axios.get(`https://devsapihub.com/api-movies/stars/${searchShow}`);
            const menuGrid = document.getElementById('cards');
            menuGrid.innerHTML = '';
            console.log(response.data);
            
            response.data.forEach(item => {
                const card = createCards(item);
                menuGrid.appendChild(card);
            });
            
        
        } catch (error) {
             console.error('Error searching shows:', error);
             alert('Ocurrió un error al buscar pelicula. Por favor, inténtalo de nuevo.');
        };
    };
};

document.getElementById('searchP').addEventListener('click', searchShows);
document.getElementById('searchButtonP').addEventListener('click', searchShows);
document.getElementById('searchInputP').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchShows();
    }else{
        console.log(event);
    
    };
});