export const checkFetch = (response) => {
    if(!response.ok){
        if(response.status === 404){
            throw new Error(response.status + " - '" + document.querySelector("input").value + "' not found or it isn't a valid pokémon name.");
        }
    }
    return response.json();
}