import Discord from "discord.js";
import { BOT_SECRET } from "./config";
import { HandleMessage } from "./controllers/message";

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

client.on("messageCreate", HandleMessage);
client.on("messageUpdate", (msg) => HandleMessage(msg.reactions.message));

client.on("ready", () => {
  console.log("--> Bot is online");
});

client.login(BOT_SECRET);
