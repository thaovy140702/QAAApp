import { validateEmail, validatePassword, validateString, validateRepeatPassword } from "../validationConstraints";

export const validateInput = (inputId, inputValue) => {
    if( inputId === 'email') {
        return validateEmail(inputId,inputValue)
    } else if( inputId === 'username') {
        return validateString(inputId,inputValue)      
    } else if ( inputId === 'password') {
        return validatePassword(inputId,inputValue)
    }  else if ( inputId === 'repeatPassword') {
        return validateRepeatPassword(inputId,inputValue)
    } 
}