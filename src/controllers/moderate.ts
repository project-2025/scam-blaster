import Discord from "discord.js";

interface ISpamCheckResult {
  result: boolean;
  word?: string;
}

/**
 * Check if the message contains one of the banned words
 *
 * @param {string} messageText
 * @param {string[]} spamCollection
 * @returns {ISpamCheckResult}
 */

const containsBannedWord = (
  messageText: string,
  spamCollection: string[]
): ISpamCheckResult => {
  for (const word of spamCollection) {
    if (messageText.toLowerCase().includes(word.toLowerCase())) {
      return { result: true, word };
    }
  }
  return { result: false };
};

/**
 * Check a message for banned phrase and delete it
 *
 * @param {Discord.Message} msg
 * @param {string[]} words
 */

const checkForSpam = (msg: Discord.Message, words: string[]) => {
  const checkResult = containsBannedWord(msg.content, words);
  if (checkResult.result) {
    msg.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle("Removed Message")
      .setDescription(
        `${msg.author.username}#${msg.author.discriminator} Scam-Blaster zapped your message because it contained unauthorised content! Are you a Scammer?`
      )
      .setColor("RED");
    msg.channel.send({ embeds: [embed] });
  }
};

export { checkForSpam };
