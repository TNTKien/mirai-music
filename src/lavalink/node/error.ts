import { Lavalink } from "#mirai/classes";
import { getDepth } from "#mirai/utils/functions/utils.js";

export default new Lavalink({
  name: "error",
  type: "node",
  run: (client, node, error) =>
    client.logger.error(
      `Music - The node: ${node.id} has an error. Error: ${getDepth(error)}`
    ),
});
