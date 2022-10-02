import { checkFetch } from "./checkFetch.js";
import { insertHtmlInfo } from "./insertHtmlInfo.js";
import { delBtnsFunc } from "./delBtnsFunc.js";
import { searchClickSoundEffect } from "./searchClickSoundEffect.js";

export const searchInsidePokedex = async(pkName) => {
    await fetch("https://pokeapi.co/api/v2/pokemon/" + pkName)
    .then((res) => checkFetch(res))
    .then((data) => insertHtmlInfo(data))
    .catch((e) => alert(e));
    delBtnsFunc();
    searchClickSoundEffect();
}