import Discord, { Message } from "discord.js";
import {
  ADD_WORD_TRIGGER,
  HELP_TRIGGER,
  REMOVE_WORD_TRIGGER,
  VIEW_WORDS,
} from "../constants/triggers";
import { ServerConfig } from "../schemas/ServerConfig";
import { addWord, removeWord } from "./adminControllers";
import { createHelpEmbed, viewWords } from "./helpControllers";
import { checkForSpam } from "./moderate";

/**
 * Handle message creation event
 *
 * @param {Discord.Message} msg
 * @returns {void}
 */

const HandleMessage = async (msg: Discord.Message) => {
  const serverConfig = await ServerConfig.findOne({ server: msg.guild?.id });
  if (serverConfig && !msg.member?.permissions.has("ADMINISTRATOR")) {
    checkForSpam(msg, serverConfig.words);
  } else {
    switch (msg.content.split(" ")[0]) {
      case ADD_WORD_TRIGGER:
        return addWord(msg);
      case REMOVE_WORD_TRIGGER:
        return removeWord(msg);
      case VIEW_WORDS:
        return viewWords(msg);
      case HELP_TRIGGER:
        return createHelpEmbed(msg);
    }
  }
};

export { HandleMessage };
