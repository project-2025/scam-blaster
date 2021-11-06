import Discord from "discord.js";
import { BANNED_WORDS } from "../config";

/**
 * Check if the message contains one of the banned words
 *
 * @param {string} messageText
 * @param {string[]} spamCollection
 * @returns {boolean}
 */

const checkForSpam = (messageText: string, spamCollection: string[]) => {
  for (const word of spamCollection) {
    if (messageText.toLowerCase().includes(word.toLowerCase())) {
      return true;
    }
  }
  return false;
};

/**
 * Handle message creation event
 *
 * @param {Discord.Message} msg
 * @returns {void}
 */

const HandleMessage = (msg: Discord.Message) => {
  if (!msg.member?.permissions.has("ADMINISTRATOR")) {
    checkForSpam(msg.content, BANNED_WORDS) && msg.delete();
  }
};

export { HandleMessage };
