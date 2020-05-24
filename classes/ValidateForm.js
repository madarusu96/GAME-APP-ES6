class ValidateForm {
    constructor() {
        this.buildErrorMessage = function (inputEl, errorMessage) {
            console.log("build error message")
            inputEl.classList.add("inputError");
            const errorMsgElement = document.createElement("span");
            errorMsgElement.setAttribute("rel", inputEl.id);
            errorMsgElement.classList.add("errorMsg");
            errorMsgElement.innerHTML = errorMessage;
            inputEl.after(errorMsgElement);
        }
    }


        validateFormElement(inputElement, errorMessage) {
            console.log("validate form")
            if (inputElement.value === "") {
                if (!document.querySelector('[rel="' + inputElement.id + '"]')) {
                    this.buildErrorMessage(inputElement, errorMessage);
                }
            } else {
                if (document.querySelector('[rel="' + inputElement.id + '"]')) {
                    console.log("the error is erased!");
                    document.querySelector('[rel="' + inputElement.id + '"]').remove();
                    inputElement.classList.remove("inputError");
                }
            }
        }
        validateReleaseTimestampElement(inputElement, errorMessage) {
            console.log("validate Release Timestamp Element")
            if (isNaN(inputElement.value) && inputElement.value !== "") {
                this.buildErrorMessage(inputElement, errorMessage);
            }
        }
    }