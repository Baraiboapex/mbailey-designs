import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const formattableFields = {
    datePosted:(val)=> dayjs(val).format("MM/DD/YYYY"),
    defaultTitle:(stringToFormat) => {
        const regex = /([A-Z])/g;
        let firstReplace = stringToFormat.replace(
          stringToFormat[0],
          stringToFormat.slice(0, 1).toUpperCase()
        );
      
        let matchedCapitalLetters;
        const matches = [];
      
        while ((matchedCapitalLetters = regex.exec(stringToFormat)) !== null)
          matches.push(regex.lastIndex);
      
        const isOnlyCapitalLetters = matches.length === stringToFormat.length;
      
        if (isOnlyCapitalLetters) {
          return stringToFormat;
        } else {
          const newString = firstReplace.replace(/([A-Z])/g, " $1");
          return newString;
        }
      }
};

export function textFormatterMethod(stringToFormat, fieldName){
    return(formattableFields[fieldName] ? formattableFields[fieldName](stringToFormat) : formattableFields.defaultTitle(stringToFormat));
}