import { searchInsidePokedex } from "./searchInsidePokedex.js";
import { inputValueFormat } from "./inputValueFormat.js";
import { readMoreBtnFunc } from "./readMoreBtnFunc.js";
import { searchClickSoundEffect } from "./searchClickSoundEffect.js";

const inputEventFunc = async() => {

    // searchClickSoundEffect();
    // initBackgroundSoundTheme();

    document.querySelector(".searchBtn").onclick = async() => {
        if(document.querySelector("input").value.replaceAll(" ", "") !== "" ){
            searchClickSoundEffect();
            await searchInsidePokedex(inputValueFormat(document.querySelector("input").value));
            document.querySelector("input").value = "";
            readMoreBtnFunc();
        }
    }
    
    document.querySelector("input").addEventListener("keypress", async (e) => {
        if(e.key === "Enter" && document.querySelector("input").value.replaceAll(" ", "") !== "" ){
            e.preventDefault();
            searchClickSoundEffect();
            await searchInsidePokedex(inputValueFormat(document.querySelector("input").value));
            document.querySelector("input").value = "";
            readMoreBtnFunc();
        }
    })
};
    
inputEventFunc();
