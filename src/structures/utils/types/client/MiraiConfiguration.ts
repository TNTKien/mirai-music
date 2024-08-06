import type { LavalinkNodeOptions, SearchPlatform } from "lavalink-client";

interface MiraiColors {
  /** The success color. */
  success: number;
  /** The success color. */
  extra: number;
}

export interface MiraiConfiguration {
  /**
   * Mirai default prefix.
   * @default "mirai"
   */
  defaultPrefix: string;
  /**
   * Mirai default player volume.
   * @default 60
   */
  defaultVolume: number;
  /**
   * Mirai default player search engine.
   * @default "spotify"
   */
  defaultSearchEngine: SearchPlatform;
  /**
   * Mirai prefixes.
   * @default ["st!"]
   */
  prefixes: string[];
  /**
   * Mirai default locale.
   * @default "en-US"
   */
  defaultLocale: string;
  /**
   * Mirai disconnect time.
   * @default ms("30s")
   */
  disconnectTime: number;
  /**
   * Mirai default resume time.
   * @default ms("1min")
   */
  resumeTime: number;
  /** Mirai developer id(s). */
  developerIds: string[];
  /** Mirai developer guild id(s). */
  guildIds: string[];
  /** Mirai nodes. */
  nodes: LavalinkNodeOptions[];
  /** Mirai spotify data. */
  /** Mirai colors. */
  color: MiraiColors;
}
