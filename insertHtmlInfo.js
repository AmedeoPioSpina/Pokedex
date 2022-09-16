import { textToUpperCase } from "./textToUpperCase.js";
import { fetchInsider } from "./fetchInsider.js";

export const insertHtmlInfo = async(element) => {
    const divPokeInfo = document.createElement("div");
    divPokeInfo.className = "pokeInfo";
    
    const divNumber = document.createElement("div");
    divNumber.className = "pkNumber";
    divNumber.textContent = "N°" + element.id;
    divPokeInfo.appendChild(divNumber);
    
    const divName = document.createElement("div");
    divName.className = "pkName";
    divName.textContent = "Name: " + textToUpperCase(element.name);
    divPokeInfo.appendChild(divName);
    
    const divType = document.createElement("div");
    divType.className = "pkType";
    if(element.types.length === 2){
        divType.textContent = "Type: " + textToUpperCase(element.types[0].type.name) +" / "+ textToUpperCase(element.types[1].type.name);
    }
    else{
        divType.textContent = "Type: " + textToUpperCase(element.types[0].type.name);
    }
    divPokeInfo.appendChild(divType);
    
    const fetchLocationArea = await fetchInsider(element.location_area_encounters)
    const divPkLocationArea = document.createElement("div");
    divPkLocationArea.className = "pkLocationArea";
    const p = document.createElement("p");
    if(fetchLocationArea.length !== 0){
        let locations = [];
        fetchLocationArea.map(area => {
            let areaTarget = area.location_area.name;
            locations.push(areaTarget.split("-").join(" "));
        });
        p.textContent = "Location area: " + (locations.join(", "));
        const readMoreBtn = document.createElement("button");
        readMoreBtn.className ="readMoreBtn";
        readMoreBtn.dataset.stateButton = "off";
        readMoreBtn.textContent = "Read more"
        p.style = "overflow: hidden; height: 1rem;"
        divPkLocationArea.appendChild(p);
        divPkLocationArea.appendChild(readMoreBtn);
    }
    else{
        
        p.textContent = "Location area: none";
        divPkLocationArea.appendChild(p);
    }
    divPokeInfo.appendChild(divPkLocationArea);

    
    
    const fetchSpecies = await fetchInsider(element.species.url);
    const divPkEvolvesFrom = document.createElement("div");
    divPkEvolvesFrom.className = "pkEvolvesFrom";
    if(fetchSpecies.evolves_from_species !== null){
        divPkEvolvesFrom.textContent = "Evolve from: " + textToUpperCase(fetchSpecies.evolves_from_species.name);
    }
    else{
        divPkEvolvesFrom.textContent = "Evolve from: none";
    };
    divPokeInfo.appendChild(divPkEvolvesFrom);

    
    const searchResult = document.querySelector(".searchResult");
    searchResult.appendChild(divPokeInfo);
}