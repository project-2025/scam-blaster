import Discord from "discord.js";
import { ServerConfig } from "../schemas/ServerConfig";

const embedMessage = (content: string, success: boolean = true) => {
  return new Discord.MessageEmbed()
    .setTitle(success ? "Success" : "Error")
    .setColor(success ? "GREEN" : "RED")
    .setDescription(content);
};

/**
 * Add a word to the banned list
 *
 * @param {Discord.Message} msg
 */

const addWord = async (msg: Discord.Message) => {
  if (msg.member?.permissions.has("ADMINISTRATOR")) {
    const configExists = await ServerConfig.findOne({ server: msg.guild?.id });
    const word = msg.content.substring(msg.content.indexOf(" ") + 1).trim();
    if (configExists) {
      configExists.words.push(word);
      await configExists.save();
      msg.channel.send({
        embeds: [embedMessage(`successfully updated banned words list`)],
      });
    } else {
      await ServerConfig.create({
        server: msg.guild?.id,
        words: [word],
      });
      msg.channel.send({
        embeds: [embedMessage(`successfully updated banned words list`)],
      });
    }
  }
};

/**
 * remove a word from the banned list
 *
 * @params {Discord.Message} msg
 */

const removeWord = async (msg: Discord.Message) => {
  if (msg.member?.permissions.has("ADMINISTRATOR")) {
    const serverConfig = await ServerConfig.findOne({ server: msg.guild?.id });
    const wordToRemove = msg.content
      .substring(msg.content.indexOf(" ") + 1)
      .trim();
    if (serverConfig) {
      const words = serverConfig.words.filter(
        (word: string) => word !== wordToRemove
      );
      serverConfig.words = words;
      await serverConfig.save();
      msg.channel.send({ embeds: [embedMessage("Updated config")] });
    } else {
      msg.channel.send({
        embeds: [
          embedMessage(
            `Server config does not exist, please add a word first`,
            false
          ),
        ],
      });
    }
  }
};

export { addWord, removeWord };
