let $ = require('jquery')
const _ = require("lodash");



$('#compare').on('click', () => {
   let array1 = $('#array1').val()
   let array2 = $('#array2').val()

    compare(array1, array2);
})

function isRemoveSpaces() {
    return $(":checkbox[value='spaces']").prop("checked");
}

function isIgnoreCase() {
    return $(":checkbox[value='case']").prop("checked");
}

function isRemoveDuplicates() {
    return $(":checkbox[value='duplicates']").prop("checked");
}

function compare(array1, array2) {
    array1 = _.split(array1, "\n");
    array2 = _.split(array2, "\n");

    if(isRemoveSpaces()) {
        removeSpacesFromArray(array1);
        removeSpacesFromArray(array2);
    }

    let ignoreCase = isIgnoreCase();

    setArrayAndLength('#array1', array1);
    setArrayAndLength('#array2', array2);

    if(isRemoveDuplicates()) {
        array1 = removeDuplicates(array1, ignoreCase);
        array2 = removeDuplicates(array2, ignoreCase);
    }

    let array1or2 = union(array1, array2, ignoreCase);
    setArrayAndLength('#array1or2', array1or2);

    let array1and2 = intersection(array1, array2, ignoreCase);
    setArrayAndLength('#array1and2', array1and2);

    let array1only = difference(array1, array2, ignoreCase);
    setArrayAndLength('#array1only', array1only);

    let array2only = difference(array2, array1, ignoreCase);
    setArrayAndLength('#array2only', array2only);
}

function removeDuplicates(array, isIgnoreCase) {
    if(!isIgnoreCase) {
        return _.uniq(array);
    } else {
        let result = _.cloneDeep(array);
        array = _.join(array, "\n").toLowerCase();
        array = array.split("\n");
        let sortedArray = _.sortBy(array);
        let removed = 0;
        for (let index = 1; index < array.length; index++) {
            const element = array[index];
            if(sortedArray[index-1] === sortedArray[index]) {
                let removeIndex = _.indexOf(sortedArray[index]);
                result.splice(removeIndex-removed, 1);
            }
        }
        return result
    }
}

function setArrayAndLength(id, array) {

    $(id).val(_.join(array, "\n"));

    let element = $(id).siblings("p");
    let value = element.text();
    value = value.split(":");
    value = value[0];
    element.text(`${value} : (${array.length})`);
}

function removeSpacesFromArray(array) {
    for (let index = 0; index < array.length; index++) {
        array[index] = array[index].trim();
    }
    array = _.remove(array, function(data) {
        return data === "";
    })
    return array;
}

function difference(a1, a2, isIgnoreCase) {
    a1 = _.cloneDeep(a1);
    a2 = _.cloneDeep(a2);
    if(!isIgnoreCase) {
        return _.difference(a1, a2);
    } else {
        a2 = _.join(a2, "\n").toLowerCase();
        a2 = a2.split("\n");
        let result = _.cloneDeep(a1);
        let removedIndex = 0;
        for (let index = 0; index < a1.length; index++) {
            if(a2.indexOf(a1[index].toLowerCase())>-1) {
                result.splice(index-removedIndex, 1);
                ++removedIndex;
            }
        }
        return result;
    }
}

function union(a1, a2, isIgnoreCase) {
    a2 = _.cloneDeep(a2);
    if(!isIgnoreCase) {
        return _.union(a1, a2);
    } else {
        a2 = difference(a1, a2);
        return _.union(a1, a2);
    }
}

function intersection(a1, a2, isIgnoreCase) {
    a2 = _.cloneDeep(a2);
    if(!isIgnoreCase) {
        return _.intersection(a1, a2);
    } else {
        a2 = _.join(a2, "\n").toLowerCase();
        a2 = a2.split("\n");
        let result = [];
        for (let index = 0; index < a1.length; index++) {
            if(a2.indexOf(a1[index].toLowerCase())>-1) {
                result.push(a1[index]);
            }
        }
        return result;
    }
}