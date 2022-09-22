import { mutedUnmutedFunc } from "./mutedUnmutedFunc.js";

export const mutedBtnsFunc = () => {
    const muteBtns = document.querySelectorAll(".muteBtn");

    muteBtns.forEach((btn , index) => {
        btn.onclick = () =>{
            const mutedBtnStatus = mutedUnmutedFunc(index);
            if(mutedBtnStatus === true){
                btn.style.backgroundColor = "gray"
            }
            else{
                btn.style.backgroundColor = "rgb(199, 199, 199)"
            }
        }
    })
}