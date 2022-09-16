export const readMoreBtnFunc = () => {
    const readMoreBtns = document.querySelectorAll(".readMoreBtn");
    readMoreBtns.forEach((btn) => {
        btn.onclick = () => {
            const pokeInfo = btn.closest(".pokeInfo");
            const pTarget = pokeInfo.querySelector("p");

            if(btn.dataset.stateButton === "off"){
                pTarget.style = "overflow: none; min-height: 1rem;"
                btn.textContent = "Read less"
                btn.dataset.stateButton = "on";
            }
            else{
                pTarget.style = "overflow: hidden; height: 1rem;"
                btn.textContent = "Read more";
                btn.dataset.stateButton = "off";
                };
        };
    })
}