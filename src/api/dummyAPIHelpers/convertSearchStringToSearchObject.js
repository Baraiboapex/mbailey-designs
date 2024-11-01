function convertSearchStringToSearchObject({ searchString }) {
    const searchObject = {};
    const nameRegex = /([A-Za-z]*)=/g;
    const valueRegex = /(?<=\=)([\d\-A-Za-z\:\.\,]*)/g;
    const fieldNameRegexMatches = [...searchString.matchAll(nameRegex)];
    const fieldValueRegexMatches = [...searchString.matchAll(valueRegex)];
  
    fieldNameRegexMatches.forEach((match) => {
      const matchName = match[1];
      searchObject[matchName] = null;
    });
  
    fieldValueRegexMatches.forEach((match, index) => {
      const matchValue = match[1];
      const currentearchObjectKey = Object.keys(searchObject)[index];
      const matchValuesArray =
        matchValue.split(",").length > 1 ? matchValue.split(",") : matchValue;
      searchObject[currentearchObjectKey] = matchValuesArray;
    });
  
    return searchObject;
  }

  export default convertSearchStringToSearchObject;