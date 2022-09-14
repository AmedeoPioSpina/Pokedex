export const inputValueFormat = () =>
{
    let inputValue = document.querySelector("input").value
    inputValue = inputValue.split("");
    inputValue[0] = inputValue[0].toLowerCase();
    return inputValue.join("");
}