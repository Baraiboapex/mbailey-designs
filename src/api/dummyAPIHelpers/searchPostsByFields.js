function searchPostsByFields({ searchText, arrayToSearch, fieldsToSearchBy }) {
    const selectedEntries = [];
  
    arrayToSearch.forEach((item) => {
      if (fieldsToSearchBy !== null && fieldsToSearchBy !== undefined) {
        fieldsToSearchBy.forEach((field) => {
          if (item[field] === searchText) {
            selectedEntries.push(item);
          }
        });
      } else {
        Object.keys(item).forEach((key) => {
          if (item[key] === searchText) {
            selectedEntries.push(item);
          }
        });
      }
    });
  
    return selectedEntries;
  }

export default searchPostsByFields;