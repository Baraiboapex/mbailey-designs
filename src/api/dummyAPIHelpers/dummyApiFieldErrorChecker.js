
/*///
    SUMMARY:
    =======================================================
    
    To evaluate fields with this method, use the following 
    schema:

    validateAllIncommingApiFields({
        dataObject:someObject,
        rules:{
            someObjectField1:(field)=> field !== null,
            someObjectField2:(field)=> field !== null
        }
    })
    ///
*/
function validateAllIncommingApiFields({
    dataObject,
    rules
}){
    const allObjectFieldKeys = Object.keys(dataObject);
    
    let fieldsThatAreCorrect = 0;

    allObjectFieldKeys.forEach((key)=>{
        const evaluateIfFieldIsValid = rules[key](dataObject[key]);
        if(evaluateIfFieldIsValid){
            fieldsThatAreCorrect++;
        }
    })

    let allFieldsAreCorrect = fieldsThatAreCorrect === allObjectFieldKeys.length;

    return allFieldsAreCorrect;
}

export default validateAllIncommingApiFields;