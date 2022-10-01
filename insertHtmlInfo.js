import { textToUpperCase } from "./textToUpperCase.js";
import { fetchInsider } from "./fetchInsider.js";
import { getGamesAndLocation } from "./getGamesAndLocation.js";

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
    let gamesAndLocation = [[]];
    if(fetchLocationArea.length !== 0){
        
        getGamesAndLocation(element, gamesAndLocation, fetchLocationArea);
        const gameVersionsList = document.createElement("ul");
        gameVersionsList.className = "gameVersionsList"
        gamesAndLocation[0].map((el, index) => {
            if(gamesAndLocation[1][index] !== undefined){
                let li = document.createElement("li");
                li.className = "version"
                li.dataset.clickStatus = "off";
                li.textContent = textToUpperCase(el);
                gameVersionsList.appendChild(li)
            }
            divPkLocationArea.textContent = "LOCATION AREA:";
            divPkLocationArea.appendChild(gameVersionsList);
        })
        let versions = Array.from(gameVersionsList.querySelectorAll(".version"));
        versions.map((liTarget) => {
            liTarget.onclick = () => {
                if(liTarget.dataset.clickStatus === "off"){
                    liTarget.dataset.clickStatus = "on";
                    const versionTarget = liTarget.textContent.toLocaleLowerCase();
                    const versIndex = gamesAndLocation[0].findIndex((vers) => {
                        return vers === versionTarget;
                    })
                    versions.map(litrg => {
                        if(litrg !== liTarget){
                            litrg.style.display = "none";
                        }
                        else{
                            litrg.textContent = litrg.textContent.toUpperCase();
                            litrg.textContent += ":";
                            
                        }
                    })
                    let arysIndex = 1;
                    while(gamesAndLocation[arysIndex][versIndex] !== undefined){
                        let liLocation = document.createElement("li");
                        liLocation.className = "location";
                        if(gamesAndLocation[arysIndex+1][versIndex] !== undefined){
                            liLocation.textContent = textToUpperCase(gamesAndLocation[arysIndex][versIndex]).replaceAll("-", " ") + ", ";
                        }
                        else{
                            liLocation.textContent = textToUpperCase(gamesAndLocation[arysIndex][versIndex]).replaceAll("-", " ") + ".";
                        }
                        arysIndex += 1;
                        gameVersionsList.appendChild(liLocation);
                    }
                }
                else{
                    liTarget.dataset.clickStatus = "off";
                    while(gameVersionsList.lastChild.className !== "version"){
                        gameVersionsList.removeChild(gameVersionsList.lastChild);
                    };
                    liTarget.textContent = textToUpperCase(liTarget.textContent.toLowerCase());
                    let aryWord = liTarget.textContent.split("");
                    aryWord.pop();
                    liTarget.textContent = aryWord.join("");
                    versions.map(litrg => {
                        if(litrg !== liTarget){
                            litrg.style.display = "list-item";
                        }
                    })
                }
            }
        })
    }
    else{
        
        divPkLocationArea.textContent = "LOCATION AREA: None";
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