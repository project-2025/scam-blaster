import Discord from "discord.js";

const createHelpEmbed = (msg: Discord.Message) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("Bot Help")
    .setDescription(
      "ScamBlaster is a bot intended to suppress messages from non-admins that contain a banned phrase"
    )
    .setColor("GREEN")
    .setFields([
      { name: ".blaster-add <word>", value: "Add a word to the banned list" },
      {
        name: ".blaster-remove <word>",
        value: "Remove a word from the banned list",
      },
    ]);
  msg.channel.send({ embeds: [embed] });
};

export { createHelpEmbed };
