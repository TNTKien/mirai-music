import { Lavalink } from "#mirai/classes";

export default new Lavalink({
  name: "reconnecting",
  type: "node",
  run: (client, node) =>
    client.logger.warn(`Music - The node: ${node.id} is reconnecting...`),
});
