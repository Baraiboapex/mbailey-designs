/* 
    NOTE: This needs to be a stored proc on the sql 
    database side in order to promote better performance!
*/

import dayjs from "dayjs";

function getPostsByLatestDates({
    arrayToSearch,
    howManyProjectsBackFromLatestDate,
  }) {
    const sortedArray = arrayToSearch.sort((a, b) =>
      dayjs(a.datePosted).isAfter(dayjs(b.datePosted)) ? -1 : 1
    );
    const latestDatesByCount =
      howManyProjectsBackFromLatestDate <= arrayToSearch.length
        ? sortedArray.splice(0, howManyProjectsBackFromLatestDate)
        : sortedArray.splice(0, arrayToSearch.length);
  
    return latestDatesByCount;
  }

  export default getPostsByLatestDates;