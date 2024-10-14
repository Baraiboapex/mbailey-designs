function getAllPostFieldValuesByPostFieldType({
    itemsArray,
    fieldName
}){
    return itemsArray.map(item => item[fieldName]);
}

export default getAllPostFieldValuesByPostFieldType;