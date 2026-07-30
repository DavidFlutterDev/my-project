import { test, only, enforce, omitWhen, staticSuite } from 'vest';

export const createform_33ValidationSuite = staticSuite(
  (model: any, field: string) => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    const ipv6Regex =
      /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))\.){3,3}(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))\.){3,3}(25[0-5]|(2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])))$/;

    only(field);
    test('address', 'Address is required', () => {
      enforce(model.address).isNotBlank();
    });

    // test('address', 'Invalid address', () => {
    //   if (ipv4Regex.test(model.address) || ipv6Regex.test(model.address)) {
    //     return;
    //   } else {
    //     return false;
    //   }
    // });

    test('path', 'Path is required', () => {
      enforce(model.path).isNotBlank();
    });
    test('allowed_verbs', 'Allowed verbs is required', () => {
      enforce(model.allowed_verbs).isNotEmpty();
    });


  },
);
