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
    divName.textContent = "NAME: " + textToUpperCase(element.name);
    divPokeInfo.appendChild(divName);
    
    const divType = document.createElement("div");
    divType.className = "pkType";
    if(element.types.length === 2){
        divType.textContent = "TYPE: " + textToUpperCase(element.types[0].type.name) +" / "+ textToUpperCase(element.types[1].type.name);
    }
    else{
        divType.textContent = "TYPE: " + textToUpperCase(element.types[0].type.name);
    }
    divPokeInfo.appendChild(divType);
    
    const fetchLocationArea = await fetchInsider(element.location_area_encounters)
    const divPkLocationArea = document.createElement("div");
    divPkLocationArea.className = "pkLocationArea";
    const p = document.createElement("p");
    if(fetchLocationArea.length !== 0){

        let gamesAndLocation = [[]];
        const gameIndices =  element.game_indices;
        gameIndices.map((el) => {
            gamesAndLocation[0].push(el.version.name);
        })
        fetchLocationArea.map((el) => {
            const areaName = el.location_area.name;
            const gameVersions = el.version_details;
            gameVersions.map((item) => {
                const versionName = item.version.name;
                gamesAndLocation[0].map((trg, ind) =>{
                    if(trg === versionName){
                        let gamesAndLocationIndex = 1;
                        do{
                            if(gamesAndLocation[gamesAndLocationIndex] === undefined){
                                gamesAndLocation[gamesAndLocationIndex] = [];
                                gamesAndLocation[gamesAndLocationIndex][ind] = areaName;
                                gamesAndLocationIndex = 0;
                            }
                            else{
                                if(gamesAndLocation[gamesAndLocationIndex][ind] === undefined){
                                    gamesAndLocation[gamesAndLocationIndex][ind] = areaName;
                                    gamesAndLocationIndex = 0;
                                }
                                else{
                                    gamesAndLocationIndex +=1
                                }
                            }
                        }while(gamesAndLocationIndex !== 0)
                    }
                })
            })
        })
        console.log(gamesAndLocation);
        const ul = document.createElement("ul");
        gamesAndLocation[0].map((el, index) => {
            if(gamesAndLocation[1][index] !== undefined){
            let li = document.createElement("li");
            li.textContent = textToUpperCase(el);
            ul.appendChild(li)
        }
        divPkLocationArea.textContent = "LOCATION AREA:";
        divPkLocationArea.appendChild(ul);

        })
    }
    else{
        
        divPkLocationArea.textContent = "LOCATION AREA: None";
        divPkLocationArea.appendChild(ul);
    }
    divPokeInfo.appendChild(divPkLocationArea);

    
    
    const fetchSpecies = await fetchInsider(element.species.url);
    const divPkEvolvesFrom = document.createElement("div");
    divPkEvolvesFrom.className = "pkEvolvesFrom";
    if(fetchSpecies.evolves_from_species !== null){
        divPkEvolvesFrom.textContent = "EVOLVE FROM: " + textToUpperCase(fetchSpecies.evolves_from_species.name);
    }
    else{
        divPkEvolvesFrom.textContent = "EVOLVE FROM: None";
    };
    divPokeInfo.appendChild(divPkEvolvesFrom);

    
    const searchResult = document.querySelector(".searchResult");
    searchResult.appendChild(divPokeInfo);
}