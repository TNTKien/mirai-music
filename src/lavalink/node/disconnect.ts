import { Lavalink } from "#mirai/classes";

export default new Lavalink({
  name: "disconnect",
  type: "node",
  run: (client, node) =>
    client.logger.error(`Music - The node: ${node.id} is disconnected.`),
});
