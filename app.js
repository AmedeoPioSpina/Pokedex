import { searchInsidePokedex } from "./searchInsidePokedex.js";

const inputEventFunc = async() => {

    document.querySelector(".searchBtn").onclick = async() => {
        await searchInsidePokedex(document.querySelector("input").value);
        document.querySelector("input").value = "";
    }

    document.querySelector("input").addEventListener("keypress", async (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            await searchInsidePokedex(document.querySelector("input").value);
            document.querySelector("input").value = "";
        }
    })
};

inputEventFunc();