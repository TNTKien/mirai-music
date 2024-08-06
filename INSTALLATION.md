### 📋 Configuration

- Mirai has a configuration to save a specific data.

> 1. Go to [the configuration](/src/structures/utils/data/Configuration.ts#L16-L19)
> 2. Replace the IDs with your IDs.

> Example:

```js
guildIds: [
    "123", // Example Guild
    "456", // Example Guild 2
    ...
];
```

### 📋 Traspile and Run

- Mirai is made in `Typescript` but runs in `Javascript`.

```bash
#This is necessary for typescript.
pnpm prisma generate #Generate types for prisma.

#You can use the test command
pnpm test #It will do everything for you!

#Or you can do it step-by-step
pnpm clean #Will re-create the dist folder
pnpm start #Will start the bot
```

### 🔎 Looking for a lavalink node?

> Mirai needs a [`Lavalink node`](https://github.com/lavalink-devs/Lavalink) to play music.
> See [self hosting a node](/LAVALINK.md) for more.
