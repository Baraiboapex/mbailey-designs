function getAllPostFieldValuesByPostFieldType({
    itemsArray,
    fieldName
}){
    return itemsArray.map(item => ({fieldData:item[fieldName]}));
}

export default getAllPostFieldValuesByPostFieldType;