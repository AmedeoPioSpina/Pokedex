import { searchInsidePokedex } from "./searchInsidePokedex.js";
import { inputValueFormat } from "./inputValueFormat.js";
import { mutedBtnsFunc } from "./mutedBtnsFunc.js";

const inputEventFunc = async() => {

    mutedBtnsFunc();

    document.querySelector(".searchBtn").onclick = async() => {
        if(document.querySelector("input").value.replaceAll(" ", "") !== "" ){
            await searchInsidePokedex(inputValueFormat(document.querySelector("input").value));
            document.querySelector("input").value = "";
        }
    }
    
    document.querySelector("input").addEventListener("keypress", async (e) => {
        if(e.key === "Enter" && document.querySelector("input").value.replaceAll(" ", "") !== "" ){
            e.preventDefault();
            await searchInsidePokedex(inputValueFormat(document.querySelector("input").value));
            document.querySelector("input").value = "";
        }
    })
};

inputEventFunc();
