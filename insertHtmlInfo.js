import { fetchInsider } from "./fetchInsider.js";

export const insertHtmlInfo = async(element) => {
    
    const divName = document.createElement("div");
    divName.className = "pkName";
    divName.textContent = "Name: " + element.name;
    
    const divNumber = document.createElement("div");
    divNumber.className = "PkNumber";
    divNumber.textContent = "N°" + element.id;
    
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
    divPokeInfo.appendChild(divName);
    divPokeInfo.appendChild(divNumber);
    divPokeInfo.appendChild(divType);
    // divPokeInfo.appendChild(divPkLocationArea);
    divPokeInfo.appendChild(divPkEvolvesFrom);
    
    const searchResult = document.querySelector(".searchResult");
    searchResult.appendChild(divPokeInfo);
}