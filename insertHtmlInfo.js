import { textToUpperCase } from "./textToUpperCase.js";
import { fetchInsider } from "./fetchInsider.js";
import { getGamesAndLocation } from "./getGamesAndLocation.js";
import { searchInsidePokedex } from "./searchInsidePokedex.js";

export const insertHtmlInfo = async(element) => {
    
    const divPokeInfo = document.createElement("div");
    divPokeInfo.className = "pokeInfo";

    const delBtn = document.createElement("button");
    delBtn.className = "delBtn";
    delBtn.textContent = "X";
    divPokeInfo.appendChild(delBtn);

    const divPokeImgs = document.createElement("div");
    divPokeImgs.className = "pkImgs";
    const pkFrontImg = document.createElement("img");
    pkFrontImg.className="pkFrontImg";
    pkFrontImg.src = element.sprites.front_default;
    divPokeImgs.appendChild(pkFrontImg);
    divPokeInfo.appendChild(divPokeImgs);
    
    const divNumber = document.createElement("div");
    divNumber.className = "pkNumber";
    const pNumberField = document.createElement("p");
    pNumberField.className = "field";
    const pCurrNumber = document.createElement("p")
    pCurrNumber.className = "currNumber";
    pNumberField.textContent = "N°";
    divNumber.appendChild(pNumberField);
    pCurrNumber.textContent = element.id;
    divNumber.appendChild(pCurrNumber);
    divPokeInfo.appendChild(divNumber);
    
    const divName = document.createElement("div");
    divName.className = "pkName";
    const pNameField = document.createElement("p");
    pNameField.className = "field";
    const pCurrName = document.createElement("p")
    pCurrName.className = "currName";
    pNameField.textContent = "NAME:";
    divName.appendChild(pNameField);
    pCurrName.textContent = textToUpperCase(element.name);
    divName.appendChild(pCurrName);
    divPokeInfo.appendChild(divName);
    
    const divType = document.createElement("div");
    divType.className = "pkType";
    const pTypeField = document.createElement("p");
    pTypeField.className = "field";
    const pCurrType = document.createElement("p")
    pCurrType.className = "currType";
    pTypeField.textContent = "TYPE:";
    divType.appendChild(pTypeField);
    if(element.types.length === 2){
        pCurrType.textContent = textToUpperCase(element.types[0].type.name) +" / "+ textToUpperCase(element.types[1].type.name);
    }
    else{
        pCurrType.textContent = textToUpperCase(element.types[0].type.name);
    }
    divType.appendChild(pCurrType);
    divPokeInfo.appendChild(divType);

    const fetchLocationArea = await fetchInsider(element.location_area_encounters)
    const divPkLocationArea = document.createElement("div");
    divPkLocationArea.className = "pkLocationArea";
    const pLocationAreaField = document.createElement("p");
    pLocationAreaField.className = "field";
    pLocationAreaField.textContent = "LOCATION AREA:"
    divPkLocationArea.appendChild(pLocationAreaField);
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
                        if(gamesAndLocation[arysIndex+1] !== undefined && gamesAndLocation[arysIndex+1][versIndex] !== undefined){
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
        const pCurrLocationAera = document.createElement("p");
        pCurrLocationAera.className = "currLocationArea"
        pCurrLocationAera.textContent = " None";
        divPkLocationArea.appendChild(pCurrLocationAera);
    }
    divPokeInfo.appendChild(divPkLocationArea);

    
    
    const fetchSpecies = await fetchInsider(element.species.url);
    const divPkEvolveFrom = document.createElement("div");
    divPkEvolveFrom.className = "pkEvolveFrom";
    const pEvolveFromField = document.createElement("p");
    pEvolveFromField.className = "field";
    const pCurrEvolveFrom = document.createElement("p")
    pCurrEvolveFrom.className = "currEvolveFrom";
    pEvolveFromField.textContent = "EVOLVE FROM:";
    divPkEvolveFrom.appendChild(pEvolveFromField);
    if(fetchSpecies.evolves_from_species !== null){
        pCurrEvolveFrom.textContent = textToUpperCase(fetchSpecies.evolves_from_species.name);
        pCurrEvolveFrom.onclick = () => {
            searchInsidePokedex(fetchSpecies.evolves_from_species.name);
        }
    }
    else{
        pCurrEvolveFrom.textContent = "None";
    };
    divPkEvolveFrom.appendChild(pCurrEvolveFrom);
    divPokeInfo.appendChild(divPkEvolveFrom);

    const divPkAbilities = document.createElement("div");
    divPkAbilities.className = "pkAbilities";
    const pAbilitiesField = document.createElement("p")
    pAbilitiesField.className = "field"
    pAbilitiesField.textContent = "ABILITIES:"
    divPkAbilities.appendChild(pAbilitiesField);
    const ulCurrAbilitiesList = document.createElement("ul");
    ulCurrAbilitiesList.className = "currAbilitiesList";
    if(element.abilities.length !== 0){
        const abilities = element.abilities;
        abilities.map(el => {
            const liCurrAbility = document.createElement("li")
            liCurrAbility.className = "currAbility";
            liCurrAbility.textContent = el.ability.name;

            ulCurrAbilitiesList.appendChild(liCurrAbility);
        })
    }
    else
    {
        const liCurrAbility = document.createElement("li")
        liCurrAbility.className = "currAbility";
        liCurrAbility.textContent = "None";
        ulCurrAbilitiesList.appendChild(liCurrAbility);
    }
    divPkAbilities.appendChild(ulCurrAbilitiesList);
    divPokeInfo.appendChild(divPkAbilities);

    
    const searchResult = document.querySelector(".searchResult");
    searchResult.appendChild(divPokeInfo);
}