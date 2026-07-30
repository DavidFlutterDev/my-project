import { test, only, enforce, staticSuite, omitWhen } from "vest";

export function createform_10ValidationSuite(componentName: string) {
  return staticSuite(
    (model: any, field: string) => {
      only(field);

      omitWhen((componentName === 'jasypt_encrypt' || componentName === 'jasypt_decrypt'), () => {
        test('aes_mode', 'AES mode is required', () => {
          enforce(model.aes_mode).isNotBlank();
        });
        test('aes_key', 'AES key is required', () => {
          enforce(model.aes_key).isNotBlank();
        });
      });

      omitWhen((componentName === 'aes_encrypt' || componentName === 'aes_decrypt'), () => {
        test('password', 'Password is required', () => {
          enforce(model.password).isNotBlank();
        });
      });
    }
  )
};
