export const fetchInsider = async(url) => {
    const result = await fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => console.log(e));
    return result;
}