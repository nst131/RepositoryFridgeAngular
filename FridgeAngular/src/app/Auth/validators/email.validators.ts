import { FormControl, ValidationErrors } from "@angular/forms";

export function emailValidator(control: FormControl): ValidationErrors | null {
    let emailRegex = /[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
    let value = control.value;

    let result = emailRegex.test(value);

    if (result) {
        return null;
    }

    return {
        "emailValidator": { valid: false }
    }
}