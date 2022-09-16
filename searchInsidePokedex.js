import { insertHtmlInfo } from "./insertHtmlInfo.js";

export const searchInsidePokedex = async(pkName) => {
    await fetch("https://pokeapi.co/api/v2/pokemon/" + pkName)
    .then((res) => res.json())
    .then((data) => insertHtmlInfo(data))
    .catch((e) => alert(e));
}