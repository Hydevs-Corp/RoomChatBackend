export const getTimeStamp = () => {
    let timestamp = Date.now()
    let date = new Date(timestamp)
    return { "yyyy": date.getFullYear(), 
                "m": date.getMonth()+1, 
                "d": date.getDate(), 
                "h": date.getHours(), 
              "min": date.getMinutes(), 
                "s": date.getSeconds(),
               "ms": date.getMilliseconds()
            }
}