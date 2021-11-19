import { FormikErrors } from 'formik';
import { t } from 'i18next';

export function FormikValidationFilter<IValues>(err: any) {
  const errors: FormikErrors<IValues> = {};
  if (err.error) {
    err.message.forEach((e: any) => {
      errors[e.param as keyof IValues] = e.message.map((v: string) => t(`backend_error.validation.${v}`)).toString();
    });
  }
  return errors;
}
