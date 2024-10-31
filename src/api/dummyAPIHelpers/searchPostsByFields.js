function searchString(itemToSearch, stringToCompare){
  if(typeof itemToSearch !== "string"){
    if (itemToSearch.toString().includes(stringToCompare)) {
      return true;
    }
  }else{
    if (itemToSearch.includes(stringToCompare)) {
      return true;
    }
  }

  return false;
}

function searchPostsByFields({ searchText, arrayToSearch, fieldsToSearchBy }) {
    try{
      const selectedEntries = [];
  
      arrayToSearch.forEach((item) => {
        if (fieldsToSearchBy !== null && fieldsToSearchBy !== undefined) {
          fieldsToSearchBy.forEach((field) => {
            if(item[field].length){
              item.field.forEach((entryItem)=>{
                selectedEntries.push(entryItem);
              });
            }else{
              if(searchString(item[field], searchText)){
                selectedEntries.push(item);
              }
            }
          });
        } else {
          Object.keys(item).forEach((key) => {
            if(searchString(item[key], searchText)){
              selectedEntries.push(item);
            }
          });
        }
      });
      return selectedEntries;
    }catch(err){
      console.log(err);
    }
  }

export default searchPostsByFields;