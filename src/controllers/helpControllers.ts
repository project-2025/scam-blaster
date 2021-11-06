import Discord from "discord.js";
import {
  ADD_WORD_TRIGGER,
  REMOVE_WORD_TRIGGER,
  VIEW_WORDS,
} from "../constants/triggers";
import { ServerConfig } from "../schemas/ServerConfig";
import { embedMessage } from "./adminControllers";

const createHelpEmbed = (msg: Discord.Message) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("Bot Help")
    .setDescription(
      "ScamBlaster is a bot intended to suppress messages from non-admins that contain a banned phrase"
    )
    .setColor("GREEN")
    .setFields([
      {
        name: `${ADD_WORD_TRIGGER} <word>`,
        value: "Add a word to the banned list",
      },
      {
        name: `${REMOVE_WORD_TRIGGER} <word>`,
        value: "Remove a word from the banned list",
      },
      {
        name: VIEW_WORDS,
        value: "view current list of banned words",
      },
    ]);
  msg.channel.send({ embeds: [embed] });
};

const viewWords = async (msg: Discord.Message) => {
  if (msg.member?.permissions.has("ADMINISTRATOR")) {
    const serverConfig = await ServerConfig.findOne({ server: msg.guild?.id });
    if (serverConfig) {
      msg.channel.send({
        embeds: [embedMessage(serverConfig.words.join(", "))],
      });
    } else {
      msg.channel.send({
        embeds: [
          embedMessage(`Server config does not exist, add a word first`, false),
        ],
      });
    }
  }
};

export { createHelpEmbed, viewWords };
