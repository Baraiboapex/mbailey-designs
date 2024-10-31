import { ITEM_IS_OBJECT } from "../../helpers/dataTypeCheckers/checkDataTypes";

function getAllPostFieldValuesByFieldType({ itemsArray, fieldName }) {
    const baseArray = itemsArray.map((item) => item[fieldName]);
    const flattenedArray = baseArray.flat(2);
    const mappedArray = flattenedArray.map((item) =>{
      return (
        ITEM_IS_OBJECT(item) 
        ? 
        item
        :
        { 
          id: Math.floor(Math.random()*100000), 
          title: item, 
          notIdSelectable:true 
        }
      )
    });
    
    console.log("FFFSFWSG",mappedArray, fieldName);

    return mappedArray;
};

export default getAllPostFieldValuesByFieldType;