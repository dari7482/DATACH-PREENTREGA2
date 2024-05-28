let base_url = "https://api.sampleapis.com/simpsons/episodes";
let base_fake = "/img/01.png";
const cardsContainer = document.getElementById("card-container");
const dropdownOptions = document.getElementById("options");

let data = [];

const handleGetData = async () => {
    try {
        const res = await fetch(base_url);
        const personajes = await res.json();
        data = personajes;
        const temporadasFiltrados = personajes.map((item) => item.season);
        const uniqueTemporadas = [...new Set(temporadasFiltrados)];
        console.log(uniqueTemporadas);
        handleDropdownData(uniqueTemporadas);
        dropdownOptions.value = "1";
        handleEpisode("1");
    } catch (error) {
        console.log(error);
    }
};

const handleDropdownData = (uniqueTemporadas) => {
    const containerOptionDrop = document.getElementById("options");

    containerOptionDrop.innerHTML = "";

    uniqueTemporadas.forEach((element) => {
        const optionDropdown = document.createElement("option");
        optionDropdown.value = element;
        optionDropdown.textContent = element;
        containerOptionDrop.appendChild(optionDropdown);
    });

    containerOptionDrop.addEventListener("change", (evento) => {
        evento.preventDefault();
        const selectedValue = evento.target.value;
        console.log(selectedValue);
        handleEpisode(selectedValue);
    });
};

const handleEpisode = (value) => {
    console.log(value);
    const personajesFiltrados = data.filter((item) => item.season === parseInt(value));
    renderData(personajesFiltrados);
};

function renderData(data) {
    cardsContainer.innerHTML = "";
    console.log(data);
    data.forEach((element) => {
        const imageUrl = element.thumbnailUrl;
        console.log(imageUrl);
        const cardBody = document.createElement("div");
        cardBody.innerHTML = `
        <div class="container-episode">  
            <div class="img-container">
                <img src="${imageUrl}" alt="${element.name}" onerror="this.onerror=null;this.src='${base_fake}';">
            </div>
            <h2>${element.name}</h2>    
            <p>RAITNG: ${element.rating}</p>
            <p>SEASON: ${element.season}</p>
            <p>EPISODE: ${element.episode}</p>
        </div>`;
        cardsContainer.appendChild(cardBody);
    });
}

handleGetData();