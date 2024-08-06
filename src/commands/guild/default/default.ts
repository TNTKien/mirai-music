import { AutoLoad, Command, Declare, LocalesT } from "seyfert";
import { MiraiOptions } from "#mirai/decorators";

@Declare({
  name: "default",
  description: "Change Mirai default settings.",
  integrationTypes: ["GuildInstall"],
  contexts: ["Guild"],
  defaultMemberPermissions: ["ManageGuild"],
})
@AutoLoad()
@MiraiOptions({ cooldown: 10 })
@LocalesT("locales.default.name", "locales.default.description")
export default class DefaultCommand extends Command {}
