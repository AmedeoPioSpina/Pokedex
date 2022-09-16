export const inputValueFormat = (inputValue) =>
{
    inputValue = inputValue.split("");
    inputValue[0] = inputValue[0].toLowerCase();
    return inputValue.join("");
}