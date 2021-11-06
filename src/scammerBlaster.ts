import Discord from "discord.js";
import { BOT_SECRET, MONGO_URI } from "./config";
import { HELP_TRIGGER } from "./constants/triggers";
import { HandleServerJoin } from "./controllers/adminControllers";
import { HandleMessage } from "./controllers/message";
import { connectToDB } from "./utils/connectToMongo";

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

connectToDB(MONGO_URI);

client.on("messageCreate", HandleMessage);
client.on("messageUpdate", (msg) => HandleMessage(msg.reactions.message));
client.on("guildCreate", HandleServerJoin);

client.on("ready", () => {
  console.log("--> Bot is online");
  client.user?.setPresence({
    activities: [{ name: HELP_TRIGGER, type: "LISTENING" }],
  });
});

client.login(BOT_SECRET);
