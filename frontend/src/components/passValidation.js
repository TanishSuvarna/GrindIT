import { useState, useEffect } from "react";

export const UsePasswordValidation = ({
  
firstPassword = "",
secondPassword = "",
emailVal ="",
name,
requiredLength = 8,
  
}) => {
const [validLength, setValidLength] = useState(null);
const [hasNumber, setHasNumber] = useState(null);
const [upperCase, setUpperCase] = useState(null);
const [lowerCase, setLowerCase] = useState(null);
const [specialChar, setSpecialChar] = useState(null);
const [eVal , seteVal] = useState(null);
const [match, setMatch] = useState(null);
const [isDisabled,setisDisabled] = useState(false);

useEffect(() => {

setValidLength(firstPassword.length >= requiredLength ? true : false);
setUpperCase(firstPassword.toLowerCase() !== firstPassword);
setLowerCase(firstPassword.toUpperCase() !== firstPassword);
setHasNumber(/\d/.test(firstPassword));
setMatch(firstPassword && firstPassword === secondPassword);
setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword));
seteVal(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailVal))

setisDisabled(validLength && hasNumber && upperCase && lowerCase && specialChar && eVal && match && name.length > 0)
console.log(name.length > 0,isDisabled,match , upperCase, lowerCase , validLength ,specialChar , eVal)
}, [firstPassword, secondPassword, requiredLength ,emailVal,name]);

return [validLength, hasNumber, upperCase, lowerCase, match, specialChar,eVal ,isDisabled];
};