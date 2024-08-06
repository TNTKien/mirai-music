import {
  LavalinkManager,
  type SearchPlatform,
  type Track,
} from "lavalink-client";

import type { Mirai } from "#mirai/client";
import { MiraiHandler } from "#mirai/utils/classes/client/Handler.js";

import { autoPlayFunction } from "#mirai/utils/functions/autoplay.js";

/**
 * Main music manager class.
 */
export class MiraiManager extends LavalinkManager {
  readonly handler: MiraiHandler;

  /**
   *
   * Create a new instance of the manager.
   * @param client
   */
  constructor(client: Mirai) {
    super({
      nodes: client.config.nodes,
      sendToShard: (guildId, payload) =>
        client.gateway.send(client.gateway.calculateShardId(guildId), payload),
      queueOptions: {
        maxPreviousTracks: 25,
      },
      playerOptions: {
        defaultSearchPlatform: "spsearch",
        onDisconnect: {
          destroyPlayer: true,
        },
        onEmptyQueue: {
          autoPlayFunction,
        },
      },
    });

    this.handler = new MiraiHandler(client);
  }

  /**
   *
   * Search tracks.
   * @param query
   * @returns
   */
  public async search(
    query: string,
    source?: SearchPlatform
  ): Promise<Track[]> {
    const nodes = this.nodeManager.leastUsedNodes();
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    const result = await node.search({ query, source }, null, false);
    return result.tracks;
  }

  /**
   * Load the manager.
   */
  public async load(): Promise<void> {
    //... no.
    await this.handler.load();
    this.handler.client.logger.info("MusicHandler loaded");
  }
}
