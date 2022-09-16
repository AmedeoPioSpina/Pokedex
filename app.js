import { searchInsidePokedex } from "./searchInsidePokedex.js";
import { inputValueFormat } from "./inputValueFormat.js";
import { readMoreBtnFunc } from "./readMoreBtnFunc.js";

const inputEventFunc = async() => {

    document.querySelector(".searchBtn").onclick = async() => {
        await searchInsidePokedex(inputValueFormat(document.querySelector("input").value));
        document.querySelector("input").value = "";
        readMoreBtnFunc();
    }
    
    document.querySelector("input").addEventListener("keypress", async (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            await searchInsidePokedex(inputValueFormat(document.querySelector("input").value));
            document.querySelector("input").value = "";
            readMoreBtnFunc();
        }
    })
};
    
inputEventFunc();
