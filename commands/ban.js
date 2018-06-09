const Discord = require('discord.js');


exports.run = (bot, message, args) => {
  if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("You do not have permission to run this command!")
  const member = message.mentions.members.first();
  if (!member) return message.channel.send("Who are you trying to ban?")
  const reason = message.content.split(" ").slice(2).join(" ")
  if (!reason) return message.channel.send("What is the reason that they are being banned for?")
  if (!member.bannable) return message.channel.send("I cannot ban this user! Maybe I dont have permission or this person is a higher role than me!")
  member.ban(reason)
  .catch(err => message.channel.send(`ERROR! Contact ThatMajesticGuy IMMEDIATLY!\n\n${err.stack}`))
  message.channel.send(`**${message.author.username}** has banned **${member.user.username}** for **${reason}**`)
  var embed = new Discord.RichEmbed()
  .setAuthor("Ban Command")
  .setColor("#ff1919")
  .setThumbnail(member.user.displayAvatarURL)
  .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
  .addField("Member Banned", `**${member.user.username}**`)
  .addField("Their ID", `**${member.user.id}**`)
  .addField("Mod who banned them", `**${message.author.username}**`)
  .addField("Reason", `**${reason}**`)
  bot.channels.get("455054845146169365").send({ embed: embed })
}


exports.help = {
  name: "ban",
  description: "Bans a user",
  usage: "s.ban [user] [reason]            MODERATORS ONLY!"
}

exports.aliases = []
