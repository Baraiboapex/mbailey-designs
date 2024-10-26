import _ from "lodash";

export function searchPostsByFieldsAndValues({ arrayToSearch, fieldsToSearchBy }) {
  try {
    const foundObject = _.filter(arrayToSearch, (obj) => {
      const copiedSearchFields = { ...fieldsToSearchBy };
      const objectValues = JSON.stringify(Object.values(obj));
      const validationArray = [];
      //-------SEARCH TEXT SOLUTION---------
      if (copiedSearchFields.searchText) {
        const fieldWithSearchText = objectValues.includes(
          copiedSearchFields.searchText
        );
        delete copiedSearchFields.searchText;
        validationArray.push(fieldWithSearchText);
      }
      //-------SEARCH TEXT SOLUTION---------

      //------SEARCH BY FIELDS SOLUTION------
      const searchFieldKeys = Object.keys(copiedSearchFields);
      const searchPair = {};
      const keysLength = searchFieldKeys.length;
      let flattenedFields = [];
      let validatedKeys = 0;

      searchFieldKeys.forEach((key) => {
        flattenedFields = [...flattenedFields, ...copiedSearchFields[key]];
      });

      flattenedFields.forEach((field) => {
        searchPair[field] = objectValues;
      });

      Object.keys(searchPair).forEach((item) => {
        if (searchPair[item].includes(item)) {
          validatedKeys++;
        }
      });

      let validateLength = keysLength === validatedKeys;

      validationArray.push(validateLength);
      console.log(validateLength, keysLength, validationArray);
      //------SEARCH BY FIELDS SOLUTION------
      return validationArray.reduce((acc, currVal) => currVal === true || acc === true);
    });

    console.log(foundObject);
  } catch (ex) {
    console.log("Error :" + ex);
  }
}