
const getInputValue = () => {
    const inputValue = document.querySelector("input").value
    return inputValue;
};

const searchInsidePokedex = async(pkName) => {
    await fetch("https://pokeapi.co/api/v2/pokemon/" + pkName)
    .then((res) => res.json())
    .then((data) => inrInfo(data))
    .catch((e) => console.log(e));
}

const fetchInsider = async(url) => {
    const result = await fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => console.log(e));
    console.log(result);
    return result;
}

const inrInfo = async(element) => {
    
    const divNumber = document.createElement("div");
    divNumber.className = "PkNumber";
    divNumber.textContent = "N°" + element.id;
    
    const divName = document.createElement("div");
    divName.className = "pkName";
    divName.textContent = "Name: " + element.name;

    const divType = document.createElement("div");
    divType.className = "pkType";
    if(element.types.length === 2){
        divType.textContent = "Type: " + element.types[0].type.name +" / "+ element.types[1].type.name;
    }
    else{
        divType.textContent = "Type: " + element.types[0].type.name;
    }

    // const fetchLocationArea = await fetchInsider(element.location_area_encounters)
    // const divPkLocationArea = document.createElement("div");
    // divPkLocationArea.className = "PkLocationArea";
    // if(fetchLocationArea.length !== 0){
    //     divPkLocationArea.textContent = "Location area: " + fetchLocationArea.location_area.name;
    // }
    // else{
    //     divPkLocationArea.textContent = "Location area: none";
    // }
    
    const fetchSpecies = await fetchInsider(element.species.url);
    const divPkEvolvesFrom = document.createElement("div");
    divPkEvolvesFrom.className = "pkEvolvesFrom";
    if(fetchSpecies.evolves_from_species !== null){
        divPkEvolvesFrom.textContent = "Evolve from: " + fetchSpecies.evolves_from_species.name;
    }
    else{
        divPkEvolvesFrom.textContent = "Evolve from: none";
    };

    const divPokeInfo = document.createElement("div");
    divPokeInfo.className = "pokeInfo";
    divPokeInfo.appendChild(divNumber);
    divPokeInfo.appendChild(divName);
    divPokeInfo.appendChild(divType);
    // divPokeInfo.appendChild(divPkLocationArea);
    divPokeInfo.appendChild(divPkEvolvesFrom);
    
    const searchResult = document.querySelector(".searchResult");
    searchResult.appendChild(divPokeInfo);
}

const inputEventFunc = async() => {

    document.querySelector(".searchBtn").onclick = async() => {
        await searchInsidePokedex(getInputValue());
        document.querySelector("input").value = "";
    }

    document.querySelector("input").addEventListener("keypress", async (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            await searchInsidePokedex(getInputValue());
            document.querySelector("input").value = "";
        }
    })
};

inputEventFunc();