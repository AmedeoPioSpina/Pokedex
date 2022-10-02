import { searchInsidePokedex } from "./searchInsidePokedex.js";
import { inputValueFormat } from "./inputValueFormat.js";
import { searchClickSoundEffect } from "./searchClickSoundEffect.js";
import { mutedBtnsFunc } from "./mutedBtnsFunc.js";
import { delBtnsFunc } from "./delBtnsFunc.js";

const inputEventFunc = async() => {

    mutedBtnsFunc();

    document.querySelector(".searchBtn").onclick = async() => {
        if(document.querySelector("input").value.replaceAll(" ", "") !== "" ){
            searchClickSoundEffect();
            await searchInsidePokedex(inputValueFormat(document.querySelector("input").value));
            document.querySelector("input").value = "";
            delBtnsFunc();
        }
    }
    
    document.querySelector("input").addEventListener("keypress", async (e) => {
        if(e.key === "Enter" && document.querySelector("input").value.replaceAll(" ", "") !== "" ){
            e.preventDefault();
            searchClickSoundEffect();
            await searchInsidePokedex(inputValueFormat(document.querySelector("input").value));
            document.querySelector("input").value = "";
            delBtnsFunc();
        }
    })
};

inputEventFunc();
