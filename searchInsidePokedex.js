import { checkFetch } from "./checkFetch.js";
import { insertHtmlInfo } from "./insertHtmlInfo.js";

export const searchInsidePokedex = async(pkName) => {
    await fetch("https://pokeapi.co/api/v2/pokemon/" + pkName)
    .then((res) => checkFetch(res))
    .then((data) => insertHtmlInfo(data))
    .catch((e) => alert(e));
}