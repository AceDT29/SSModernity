export let validFunc = validateFields

function validateFields(emailInfo, passInfo, inputEmail, inputPass){
    const patternValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let confirmValue = false

    if(patternValid.test(emailInfo.trim())) {
        inputEmail.style.borderColor = "green"
    } else {
        inputEmail.style.borderColor = "red"
    }

    if(passInfo.trim().length < 6) {
        inputPass.style.borderColor = "red"
        inputPass.nextElementSibling.textContent = "La contraseña ingresada es muy corta"
    } else {
        inputPass.style.borderColor = "green"
        inputPass.nextElementSibling.textContent = ""
    }
    confirmValue = patternValid.test(emailInfo) && passInfo.length >= 6
    return confirmValue
}   