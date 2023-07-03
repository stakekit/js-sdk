import "i18next";

import { localResources } from ".";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: (typeof localResources)["en"];
  }
}
