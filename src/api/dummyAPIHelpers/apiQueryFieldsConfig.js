
const fieldsThatCannotBeAnArray = {
    SEARCH_TEXT_QUERY_FIELD:"searchText", 
};

export const checkIfFieldNotAllowedAsArray = (field)=>Object
.values(fieldsThatCannotBeAnArray).includes(field);
