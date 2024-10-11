const TEXT_FIELD_VALID_CLASS = "";
const TEXT_FIELD_INVALID_CLASS = "not-valid";

export const DEFAULT_TEXT_VALIDATION_OBJECT_VALUE = {
    fieldName:"",
    isValid:true,
    classValue:TEXT_FIELD_VALID_CLASS,
    invalidText:""
};

export const textRulesNames = {
    REQUIRED_RULE:"required",
    VALID_EMAIL_RULE:"isValidEmail",
};

export const textValidationRules = {
    required:(val) => val !== null && val !== "" && val.length > 0 && val !== undefined,
    isValidEmail:(val)=> /(.*)(@)(.*)/g.test(val),
};

export function validateTextInput({ rules, textValue }) {
  const rulesArrayLength = rules.length;

  let validatedTotal = 0;

  rules.forEach((rule) => {
    const ruleIsValid = textValidationRules[rule](textValue);

    if (ruleIsValid) {
      validatedTotal++;
    }
  });

  let rulesCheckOut = validatedTotal >= rulesArrayLength;

  if (rulesCheckOut) {
    return {
      isValid: true,
      classValue: TEXT_FIELD_VALID_CLASS,
    };
  } else {
    return {
      isValid: false,
      classValue: TEXT_FIELD_INVALID_CLASS,
    };
  }
}

export const validateAllTextFields = (list)=>{
        
    let validatedFields = 0;
    let validFieldsList = [];
    let invalidFieldsList = [];

    list.forEach((field)=>{
        const callValidator = field().validator().isValid;
        if(callValidator){
            validatedFields++;
            validFieldsList.push({
                fieldName:field().fieldName,
                isValid:true,
                classValue:TEXT_FIELD_VALID_CLASS,
                invalidText:field().invalidText
            });
        }else{
            invalidFieldsList.push({
                fieldName:field().fieldName,
                isValid:false,
                classValue:TEXT_FIELD_INVALID_CLASS,
                invalidText:field().invalidText
            });
        }
    });

    let inputsAreValid = validatedFields >= list.length;

    return {
        inputsAreValid,
        validFieldsList,
        invalidFieldsList
    };
}

export const renderTextFieldValidation = ({
    validFieldsList,
    invalidFieldsList,
    valueToValidateFromValidatorObject
})=>{
    const hasValidFields = validFieldsList.length > 0;
    const hasInvalidFields = invalidFieldsList.length > 0;

    if(hasValidFields){
        validFieldsList.forEach(field=>{
            valueToValidateFromValidatorObject[field.fieldName] = field;
        })
    }

    if(hasInvalidFields){
        invalidFieldsList.forEach(field=>{
            valueToValidateFromValidatorObject[field.fieldName] = field;
        })
    }
};