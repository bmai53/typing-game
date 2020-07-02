
// return string in format M:SS
export const timeConvert = (seconds) => {


    let sec = `${Math.floor(seconds)}`
    const remainingSeconds = seconds % 60
    if (remainingSeconds < 10) { sec = '0' + sec }

    
    const secondsInMinutes = (seconds - remainingSeconds) / 60
    const min = `${Math.floor(secondsInMinutes)}`

    return(`${min}:${sec}`)
} 