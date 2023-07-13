import validate from "validate.js";

export const validateString = (id, value) => {
    const constraints = {
        presence: { allowEmpty: false}
    }

    if( value !== "") {
        constraints.format = {
            pattern: "[a-z0-9]+",
            flags: "i",
            message: "username can only contain letters"
        }
    }
    const validationResult = validate({[id]: value}, {[id]: constraints})
    return validationResult
}

export const validateEmail = (id, value) => {
    const constraints = {
        presence: { allowEmpty: false}
    }

    if( value !== "") {
        constraints.email = true
        }

    const validationResult = validate({[id]: value}, {[id]: constraints})
    return validationResult
}

export const validatePassword = (id, value) => {
    const constraints = {
        presence: { allowEmpty: false}
    }

    if( value !== "") {
        constraints.length = {
            minimum: 6,
            message: "must be at least 6 characters"
        }
        }

    const validationResult = validate({[id]: value}, {[id]: constraints})
    return validationResult
}

export const validateRepeatPassword = (id, value) => {
    const constraints = {
        presence: { allowEmpty: false}
    }
    const validationResult = validate({[id]: value}, {[id]: constraints})
    return validationResult
}