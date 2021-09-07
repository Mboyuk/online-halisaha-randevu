
const createDateTime = (day) => {
    const date = new Date()
    date.setDate(date.getDate() + day);
    const time = date.toLocaleDateString() 
    return time.split("/").join("-");//BURAYA BAK. / YAZAN GARİP. localde farklı productionda farklı
}

const createDynamicDateAndTimeArray = (opening, closing) => {
    const cpyTime = [];
    const cpyDate = [];
    var startTime = parseInt(opening.split(":")[0])
    var finishTime = parseInt(closing.split(":")[0])
    const fark = finishTime-startTime;
    for(let i=0; i<fark; i++) {
        let str = "";
        str = str + (startTime+i) +":00-"+(startTime+i+1)+":00"    
        cpyTime.push(str)
    }
    for(let i=0; i<7; i++) {
        cpyDate.push(createDateTime(i))
    }  
    return {
        cpyTime,
        cpyDate
    }
}

const createDynamicTable = async (opening, closing, price, rezervationInfo, priceInfo) => {
    const timeAndDateObj = await createDynamicDateAndTimeArray(opening, closing);
    const time = timeAndDateObj.cpyTime;
    const date = timeAndDateObj.cpyDate;
    var rezervationArray = [];
    time.forEach(element => {
        var arrIn = []
        date.forEach( async(element2) => {
            var obj = { isEmpty: false, time: "", date: "", };
            const res = await isInculudeRezervation(element, element2, rezervationInfo);
            if(res){
                obj.isEmpty = true;
                obj.time = element;
                obj.date = element2;
                obj.price = price
            } else {
                obj.isEmpty = false;
                obj.time = element;
                obj.date = element2;
                obj.price = price
            }
            const resPrice = isIncludePrice(element,element2, priceInfo);
            if(resPrice == false) {        
                obj.price = price
            } else {
                obj.price = resPrice
            }
            arrIn.push(obj)
        })
        rezervationArray.push(arrIn)

    })
    return rezervationArray
}
const isIncludePrice = (time, date, priceInfo) => {
    var bool = false;
    const price = priceInfo.find(item => {
        
        if(item.rezervationDate === date && item.rezervationTime === time) {
            bool = true;
            return item.price    
        } 
    })
    if(!bool) {
        return false
    } else {

        return price.price
    }


}

const isInculudeRezervation = (time, date, rezervationInfo) => {
    const check = rezervationInfo.some(item => {
        if(item.tarih === date && item.saat === time) {
            return true;
        } else {
            return false;
        }
    })
    return check;
    // rezervationInfo.forEach(element => {
    //     if(element.tarih === date && element.saat === time) {
    //         console.log(element.tarih+" "+date+"--"+element.saat+" "+time)
            
    //         return true;
    //     }
    // })
}

module.exports = {
    createDateTime,
    createDynamicDateAndTimeArray,
    createDynamicTable
}