import { checkCooldown } from "./commands/cooldown.js";
import { checkVerifications } from "./commands/verifications.js";

export const MiraiMiddlewares = {
  checkCooldown,
  checkVerifications,
};
