import { ITEM_IS_ARRAY } from "../dataTypeCheckers/checkDataTypes";

export const checkIfAllValuesInSearchQueryObjectAreNull = ({
    searchQueryObject
}) => {
    const allKeysInObject = Object.keys(searchQueryObject)
    const allKeysInObjectLength = allKeysInObject.length;
    const checkIfSearchQueriesContainArrays = Object.values(searchQueryObject).find(item=>ITEM_IS_ARRAY(item)) !== undefined;
    const notASearchTextOrBlankEntry = allKeysInObjectLength > 1 && checkIfSearchQueriesContainArrays;

    if(notASearchTextOrBlankEntry){
        const filteredKeysInObject = allKeysInObject
        .filter(key => {
            return key !== "searchText";
        });

        const allKeysNullInObject = filteredKeysInObject
        .filter((key)=>{
            return key !== "searchText" && searchQueryObject[key] === "NULL"
        });

        let allValuesInObjectAreNotNull = allKeysNullInObject.length !== filteredKeysInObject.length;

        if(allValuesInObjectAreNotNull){
            return true;
        }else{
            return false;
        }
    }else{
        if(allKeysInObjectLength === 1){
            return true;
        }else{
            return false;
        }
    }
}