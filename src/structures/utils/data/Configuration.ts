import type { MiraiConfiguration } from "#mirai/types";

import ms from "ms";

export const Configuration: MiraiConfiguration = {
  defaultPrefix: "mi!",
  defaultVolume: 60,
  defaultSearchEngine: "spotify",
  prefixes: ["st!"],
  defaultLocale: "en-US",
  disconnectTime: ms("30s"),
  resumeTime: ms("1min"),
  developerIds: [
    "559979358404608001", // <-- JustEvil
  ],
  guildIds: ["889490582072873001"],
  nodes: [
    {
      id: "SN #1", // <--- AKA Stelle Node
      // host: "localhost",
      // port: 2333,
      // authorization: "ganyuontopuwu",
      host: "lava-v4.ajieblogs.eu.org",
      port: 80,
      authorization: "https://dsc.gg/ajidevserver",
      secure: false,
      retryAmount: 5,
      retryDelay: ms("10s"),
    },
  ],
  color: {
    success: 0x8d86a8,
    extra: 0xece8f1,
  },
};
