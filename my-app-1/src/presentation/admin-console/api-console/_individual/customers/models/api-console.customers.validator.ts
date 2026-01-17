import { FormValidator, Validator, Violations } from '@/presentation/_system/validation/validation.types';
import { required } from '@/presentation/_system/validation/validators.presence';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';

const requiredNumber10: Validator = (value, label) => {
    let errors: string[] = [];
    errors = required(value, label);
    if (errors.length > 0) {
        return errors;
    }
    const num = Number(value);
    if (isNaN(num)) {
        errors.push(`数値10桁を入力してください。`);
        return errors;
    }
    if (value.length !== 10) {
        errors.push(`数値10桁を入力してください。`);
        return errors;
    }
    return errors;
};

function validateCustomerId(customerId: string) {
    return requiredNumber10(customerId, 'customerId');
}

export const validate: FormValidator<FormKeys> = (formData) => {
    const errors: Violations<FormKeys> = [];
    errors.push({
        field: FormKeys.customerId,
        violation: validateCustomerId(formData.customerId),
    });
    return errors;
};
