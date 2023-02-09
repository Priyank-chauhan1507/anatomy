// const calculateAge = (dobString, formDateString) => {

//   let encounterDate = formDateString ? new Date(formDateString) : new Date();
//   let birthDate = new Date(dobString);
//   var ageDifMs = encounterDate - birthDate.getTime();
//   var ageDate = new Date(ageDifMs);
//   const age = ageDate.getUTCFullYear() - 1970;
//   return age <= 0 ? 0 : age;
// };

const calculateAge = (dobString, formDateString) => {
  let encounterDate = formDateString ? new Date(formDateString) : new Date();
  let birthDate = new Date(dobString);
  var ageDifMs = encounterDate - birthDate.getTime();
  var ageDate = new Date(ageDifMs);
  const age = ageDate.getUTCFullYear() - 1970;
  if (!dobString) return "";
  if (Object.prototype.toString.call(birthDate) === "[object Date]") {
    // it is a date
    if (isNaN(birthDate.getTime())) {
      // date is not valid
      return "";
    } else {
      // date is valid
      return age <= 0 ? 0 : age;
    }
  } else {
    // not a date
    return "";
  }
};

export default calculateAge;
