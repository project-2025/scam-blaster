import Discord, { Message } from "discord.js";
import {
  ADD_WORD_TRIGGER,
  HELP_TRIGGER,
  REMOVE_WORD_TRIGGER,
} from "../constants/triggers";
import { ServerConfig } from "../schemas/ServerConfig";
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
        return;
      case REMOVE_WORD_TRIGGER:
        return;
      case HELP_TRIGGER:
        return;
    }
  }
};

export { HandleMessage };
