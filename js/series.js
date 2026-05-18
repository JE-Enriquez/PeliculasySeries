const createCards = (show) => {
    const cards = document.createElement('div');
    cards.classList.add('card');
    
    const cardImg = document.createElement('div');
    cardImg.classList.add('card__img');
    
    const img = document.createElement('img');
    // "image" es un objeto con sub-propiedades: { medium: "...", original: "..." }
    // Algunos shows pueden no tener imagen, por eso se verifica antes
    img.src = show.image? show.image.medium : '';
    img.alt = show.name;
    
    cardImg.appendChild(img);
    cards.appendChild(cardImg);
    
    const cardInfo = document.createElement('div');
    cardInfo.classList.add('title');
    
    const titleSerie = document.createElement('h2');
    titleSerie.classList.add('title__serie');
    titleSerie.textContent = `Nombre de la pelicula: ${show.name}`;
    cardInfo.appendChild(titleSerie);
    
    const cardEpisode = document.createElement('p');
    cardEpisode.classList.add('tittle__episode');
    cardEpisode.textContent = `Su genero es: - ${show.genres.join(', ')}`;
    cardInfo.appendChild(cardEpisode);
    
    cards.appendChild(cardInfo);
    // cardInfo.appendChild(titleSerie);
    // menu.appendChild(cardInfo);
    
    
    return cards;
    
};

// console.log(menu); // Verificar que la función se ha definido correctamente


document.addEventListener('DOMContentLoaded', () => {
    axios.get('https://api.tvmaze.com/search/shows?q=girls', {params: {limit: 10}})
    .then((response) => {
        const menuGrid = document.getElementById('cards');
        const {data} = response;

        console.log(data);

        // Cada elemento del arreglo tiene la forma: { score: ..., show: { name, image, genres, ... } }
        // Los datos del show están dentro de la propiedad "show"
        data.forEach(item => {
            const card = createCards(item.show);
            menuGrid.appendChild(card);
        
        });
    });
});

const searchShows = async () => {
    const shearchShow = document.getElementById('searchInput').value.toLowerCase();
    if(shearchShow) {
        try {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${shearchShow}`);
            const menuGrid = document.getElementById('cards');
            menuGrid.innerHTML = '';

            const card = createCards(response.data[0].show);
            menuGrid.appendChild(card);

        } catch (error) {
            console.error('Error searching shows:', error);
            alert('Ocurrió un error al buscar la serie. Por favor, inténtalo de nuevo.');
        };
    };
};

document.getElementById('search').addEventListener('click', searchShows);
document.getElementById('searchButton').addEventListener('click', searchShows);
document.getElementById('searchInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchShows();
    }else{
        console.log(event);
    
    };
});