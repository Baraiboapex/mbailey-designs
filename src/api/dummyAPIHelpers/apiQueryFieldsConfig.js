
const fieldsThatCannotBeAnArray = {
    SEARCH_TEXT_QUERY_FIELD:"searchText", 
};

const fieldsThatAreNullable = {
    SEARCH_TEXT_QUERY_FIELD:"searchText", 
};

export const checkIfFieldNotAllowedAsArray = (field)=>Object
.values(fieldsThatCannotBeAnArray).includes(field);

export const checkIfFieldIsNullable = (field)=>Object
.values(fieldsThatAreNullable).includes(field);

export const checkIfNullableQueryFieldIsNull = (field)=> (field !== "NULL" ? field : "NULL");
