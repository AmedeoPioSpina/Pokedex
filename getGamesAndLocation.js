export const getGamesAndLocation = (element, gamesAndLocation, fetchLocationArea) => {
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
}