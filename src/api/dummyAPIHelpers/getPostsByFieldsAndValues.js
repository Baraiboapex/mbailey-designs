import _ from "lodash";

export function searchPostsByFieldsAndValues({ arrayToSearch, fieldsToSearchBy }) {
  try {
    
    const foundObject = _.filter(arrayToSearch, (obj) => {
      const copiedSearchFields = { ...fieldsToSearchBy };
      const objectValues = JSON.stringify(Object.values(obj));
      const validationArray = [];

      //-------SEARCH TEXT SOLUTION---------
      if (copiedSearchFields.searchText) {
        if (copiedSearchFields.searchText !== "NULL") {
          const fieldWithSearchText = objectValues.includes(
            copiedSearchFields.searchText
          );
          delete copiedSearchFields.searchText;
          validationArray.push(fieldWithSearchText);
        } else {
          delete copiedSearchFields.searchText;
          validationArray.push(true);
        }
      }
      //-------SEARCH TEXT SOLUTION---------

      const hasOtherFieldsThanSearchText =
        Object.keys(copiedSearchFields).filter((key) => key !== "searchText")
          .length > 0;

      //------SEARCH BY FIELDS SOLUTION------
      if (hasOtherFieldsThanSearchText) {

        const searchFieldKeys = Object.keys(copiedSearchFields);
        const searchPair = {};
        const keysLength = searchFieldKeys.length;
        
        let flattenedFields = [];
        let validatedKeys = 0;

        searchFieldKeys.forEach((key) => {
          if(copiedSearchFields[key] !== "NULL"){
            flattenedFields = [...flattenedFields, ...copiedSearchFields[key]];
          }
        });

        flattenedFields.forEach((field) => {
          searchPair[decodeURIComponent(field)] = objectValues;
        });

        Object.keys(searchPair).forEach((item) => {
          if (searchPair[item].includes(item)) {
            validatedKeys++;
          }
        });

        let validateLength = keysLength === validatedKeys;

        validationArray.push(validateLength);
      }
      
      return validationArray.reduce(
        (acc, currVal) => currVal === true && acc === true
      );
      //-----SEARCH BY FIELDS SOLUTION--------
      
    });

    return foundObject;
  } catch (ex) {
    console.log("Error :" + ex);
  }
}