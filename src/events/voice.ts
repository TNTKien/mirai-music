import { createEvent } from "seyfert";
import { playerListener } from "#mirai/utils/functions/playerListener.js";

export default createEvent({
  data: { name: "voiceStateUpdate" },
  run: async ([newState, oldState], client) => {
    await playerListener(client, newState, oldState);
  },
});
