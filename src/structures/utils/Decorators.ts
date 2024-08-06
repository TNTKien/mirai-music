import type { BaseCommand } from "seyfert";
import type { NonCommandOptions, Options } from "#mirai/types";

type Instantiable<T> = { new (...arg: any[]): T };

export function MiraiOptions<A extends Instantiable<any>>(
  options: A extends Instantiable<BaseCommand> ? Options : NonCommandOptions
) {
  return (target: A) =>
    class extends target {
      constructor(...args: any[]) {
        super(...args);
        Object.assign(this, options);
      }
    };
}
