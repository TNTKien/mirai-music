import type { ParseClient, ParseLocales, ParseMiddlewares } from "seyfert";
import type { Mirai } from "#mirai/client";
import type { Options } from "#mirai/types";
import type { MiraiMiddlewares } from "#mirai/middlwares";

import { customContext } from "#mirai/utils/functions/utils.js";

import defaultLocale from "./locales/en-US.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
    }
  }
}

declare module "seyfert" {
  interface InternalOptions {
    withPrefix: true;
  }

  interface Command extends Options {}
  interface SubCommand extends Options {}
  interface ComponentCommand extends Options {}
  interface ModalCommand extends Options {}
  interface ContextMenuCommand extends Options {}

  interface UsingClient extends ParseClient<Mirai> {}
  interface RegisteredMiddlewares
    extends ParseMiddlewares<typeof MiraiMiddlewares> {}
  interface GlobalMetadata extends ParseMiddlewares<typeof MiraiMiddlewares> {}
  interface DefaultLocale extends ParseLocales<typeof defaultLocale> {}
  interface ExtendContext extends ReturnType<typeof customContext> {}
}
