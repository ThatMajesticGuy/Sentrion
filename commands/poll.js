const Discord = require('discord.js');

exports.run = (bot, message) => {
  if (!message.author.permissions.has("ADMINISTRATOR")) return message.channel.send("You do not have permission to run this command!")
  const args = message.content.split(" ").slice(1).join(" ")
  if (!args) return message.channel.send("What are you trying to have a poll on?")
  message.delete()
  var embed = new Discord.RichEmbed()
  .setTitle("New Poll!")
  .setColor("#24F212")
  .setThumbnail("https://pbs.twimg.com/profile_images/841718793210605568/KYWYOYtE_400x400.png")
  .setTimestamp()
  .setDescription(`${message.author.username} made a poll`)
  .addField("Topic:", args)
  message.channel.send({ embed: embed }).then(msg => {
    msg.react("👍").then(() => msg.react("👎"))
  })
};


exports.help = {
  name: "poll",
  description: "Make a poll to vote on!",
  usage: "s.poll [topic]"
}

exports.aliases = ["vote"]
