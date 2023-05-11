import { FormControl } from "@angular/forms";

export class CustomValidators {

    public static passwordValid(control: FormControl) {
        const regularExpression = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%?&#])[A-Za-z\\d@$!%*?&]{16,}$")

        return regularExpression.test(control.value) ? null : { "password-not-valid": true }
    }

    public static nameValid(control: FormControl) {
        const regularExpression = new RegExp("^(^[A-Z][a-z]{2,16})([ ]{0,1})([A-Z][a-z]{2,16})?([ ]{0,1})?([A-Z][a-z]{2,16})?([ ]{0,1})?([A-Z][a-z]{2,16})")

        return regularExpression.test(control.value) ? null : { "name-not-valid": true }
    }


}

