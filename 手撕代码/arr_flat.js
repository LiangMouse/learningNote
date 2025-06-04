// arrFlat([1,[2,3,[4,5,6]]]) => [1,2,3,4,5,6]
function arrFlat(arr) {
    return arr.reduce((acc, val) => {
        if (Array.isArray(val)) {
            return acc.concat(arrFlat(val));
        } else {
            return acc.concat(val);
        }
    },[])
}
console.log(arrFlat([1,[2,3,[4,5,6]]])); // [1,2,3,4,5,6]

function arrFlat2(arr) {
    return arr.toString()
}
