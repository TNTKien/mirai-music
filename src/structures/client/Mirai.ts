import { Client, LimitedCollection } from "seyfert";
import { ActivityType, PresenceUpdateStatus } from "seyfert/lib/types/index.js";

import type {
  InternalRuntime,
  InternalMiraiRuntime,
  MiraiConfiguration,
} from "#mirai/types";

import { MiraiMiddlewares } from "#mirai/middlwares";

import { Configuration } from "#mirai/data/Configuration.js";
import { getWatermark } from "#mirai/utils/Logger.js";
import {
  onBotPermissionsFail,
  onOptionsError,
  onPermissionsFail,
  onRunError,
} from "#mirai/utils/functions/overrides.js";
import { customContext, miraiRC } from "#mirai/utils/functions/utils.js";

import { MiraiDatabase } from "./modules/Database.js";
import { MiraiManager } from "./modules/Manager.js";

import { HandleCommand } from "seyfert/lib/commands/handle.js";
import { Yuna } from "yunaforseyfert";
import { THINK_MESSAGES } from "#mirai/data/Constants.js";

/**
 * Main Mirai class.
 */
export class Mirai extends Client<true> {
  public readonly cooldowns: LimitedCollection<string, number> =
    new LimitedCollection();
  public readonly config: MiraiConfiguration = Configuration;
  public readonly token = "🌟" as const;

  public readyTimestamp: number = 0;

  public readonly manager: MiraiManager;
  public readonly database: MiraiDatabase;

  /**
   * Create a new Mirai instance.
   */
  constructor() {
    super({
      context: customContext,
      globalMiddlewares: ["checkCooldown", "checkVerifications"],
      allowedMentions: {
        replied_user: false,
        parse: ["roles"],
      },
      components: {
        defaults: {
          onRunError,
        },
      },
      commands: {
        reply: () => true,
        prefix: async (message) => {
          const guildPrefix = await this.database.getPrefix(message.guildId!);
          return [
            ...new Set([
              guildPrefix,
              this.config.defaultPrefix,
              ...this.config.prefixes,
            ]),
          ];
        },
        defaults: {
          onBotPermissionsFail,
          onOptionsError,
          onPermissionsFail,
          onRunError,
        },
        deferReplyResponse: ({ client }) => ({
          content: `<a:typing:1214253750093488149> **${client.me.username}** ${
            THINK_MESSAGES[Math.floor(Math.random() * THINK_MESSAGES.length)]
          }`,
        }),
      },
      presence: () => ({
        afk: false,
        since: Date.now(),
        status: PresenceUpdateStatus.Idle,
        activities: [{ name: "Traveling... 🌠", type: ActivityType.Playing }],
      }),
    });

    this.manager = new MiraiManager(this);
    this.database = new MiraiDatabase(this);

    this.run();
  }

  /**
   *
   * Start the main Mirai process.
   * @returns
   */
  private async run(): Promise<typeof this.token> {
    getWatermark();

    this.setServices({
      middlewares: MiraiMiddlewares,
      cache: {
        disabledCache: [
          "bans",
          "emojis",
          "overwrites",
          "stickers",
          "threads",
          "roles",
          "presences",
          "messages",
        ],
      },
      handleCommand: class extends HandleCommand {
        argsParser = Yuna.parser({
          syntax: {
            namedOptions: ["-", "--"],
          },
        });
        resolveCommandFromContent = Yuna.resolver({
          client: this.client,
          afterPrepare: (metadata) =>
            this.client.logger.debug(
              `Client - Ready to use ${metadata.commands.length} commands.`
            ),
        });
      },
      langs: {
        default: this.config.defaultLocale,
        aliases: {
          "es-419": ["es-ES"],
        },
      },
    });

    await this.start();
    await this.manager.load();
    await this.uploadCommands();

    return "🌟";
  }

  /**
   *
   * Overrides the original `runtime configuration`.
   * @returns
   */
  public override getRC<T extends InternalRuntime = InternalRuntime>(): Promise<
    InternalMiraiRuntime<T>
  > {
    return miraiRC();
  }

  /**
   *
   * Reload Mirai..
   * @returns
   */
  public async reload(): Promise<void> {
    this.logger.warn("Attemping to reload...");

    try {
      await this.events?.reloadAll();
      await this.commands?.reloadAll();
      await this.components?.reloadAll();
      await this.manager.handler.reloadAll();

      this.logger.info("Mirai has been reloaded.");
    } catch (error) {
      this.logger.error("Error -", error);
      throw error;
    }
  }
}
