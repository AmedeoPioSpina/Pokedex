import { searchInsidePokedex } from "./searchInsidePokedex.js";
import { inputValueFormat } from "./inputValueFormat.js";

const inputEventFunc = async() => {

    document.querySelector(".searchBtn").onclick = async() => {
        await inputValueFormat();
        await searchInsidePokedex(inputValueFormat(document.querySelector("input").value));
        document.querySelector("input").value = "";
    }

    document.querySelector("input").addEventListener("keypress", async (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            await searchInsidePokedex(inputValueFormat(document.querySelector("input").value));
            document.querySelector("input").value = "";
        }
    })
};

    inputEventFunc();