export function orderMayMen(array,prop){
    let newArray = array.sort((a,b)=> {
        if(a[prop] < b[prop])return 1;
        if(a[prop] > b[prop])return -1;
        return 0
      })
    return newArray
}
export function orderMenMay(array,prop){
    let newArray = array.sort((a,b)=> {
        if(a[prop] < b[prop])return -1;
        if(a[prop] > b[prop])return 1;
        return 0
      })
    return newArray
}