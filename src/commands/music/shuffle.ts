import { Command, type CommandContext, Declare, Middlewares } from "seyfert";
import { StelleOptions } from "#stelle/decorators";
import { StelleCategory } from "#stelle/types";

@Declare({
    name: "shuffle",
    description: "Shuffle the queue.",
    integrationTypes: ["GuildInstall"],
    contexts: ["Guild"],
    aliases: ["shu", "sh", "shuf"],
})
@StelleOptions({
    cooldown: 5,
    category: StelleCategory.Music,
})
@Middlewares(["checkNodes", "checkVoiceChannel", "checkBotVoiceChannel", "checkPlayer", "checkQueue"])
export default class ShuffleCommand extends Command {
    public override async run(ctx: CommandContext) {
        const { client } = ctx;

        const player = client.manager.getPlayer(ctx.guildId!);
        if (!player) return;

        const { messages } = await ctx.getLocale();

        await player.queue.shuffle();
        await ctx.editOrReply({
            embeds: [
                {
                    description: messages.commands.shuffle,
                    color: client.config.color.success,
                },
            ],
        });
    }
}
