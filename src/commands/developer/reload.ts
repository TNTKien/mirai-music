import { Command, type CommandContext, Declare } from "seyfert";
import { MiraiOptions } from "#mirai/decorators";

import { EmbedColors } from "seyfert/lib/common/index.js";
import { Configuration } from "#mirai/data/Configuration.js";

@Declare({
  name: "reload",
  description: "Reload Mirai.",
  guildId: Configuration.guildIds,
  integrationTypes: ["GuildInstall"],
  contexts: ["Guild"],
})
@MiraiOptions({ onlyDeveloper: true })
export default class ReloadCommand extends Command {
  async run(ctx: CommandContext): Promise<void> {
    await ctx.deferReply(true);
    await ctx.client
      .reload()
      .then(() =>
        ctx.editOrReply({
          content: "",
          embeds: [
            {
              description: "`✅` Mirai has been reloaded.",
              color: ctx.client.config.color.success,
            },
          ],
        })
      )
      .catch(() =>
        ctx.editOrReply({
          content: "",
          embeds: [
            {
              description: "`❌` Something failed during the reload.",
              color: EmbedColors.Red,
            },
          ],
        })
      );
  }
}
