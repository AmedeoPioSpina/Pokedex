export const delBtnsFunc = () => {
    const btns = document.querySelectorAll(".delBtn");
    btns.forEach((element) => {
        element.onclick = () => {
            const pokeInfoTrg = element.closest(".pokeInfo")
            document.querySelector(".searchResult").removeChild(pokeInfoTrg);
        }
    })
}