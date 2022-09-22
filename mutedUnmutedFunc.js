export const mutedUnmutedFunc = (index) => {
    const audios = document.querySelectorAll("audio");
    if(audios[index].muted === false){
        audios[index].muted = true;
        return audios[index].muted;
    }
    else{
        audios[index].muted = false;
        return audios[index].muted;
    }
}