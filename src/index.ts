import "dotenv/config";

import { Logger } from "seyfert";
import { Mirai } from "#mirai/client";
import { customLogger } from "#mirai/utils/Logger.js";
import { validateEnv } from "#mirai/utils/functions/validateEnv.js";

Logger.customize(customLogger);
Logger.saveOnFile = "all";
Logger.dirname = "logs";

validateEnv();

const client = new Mirai();

export default client;
