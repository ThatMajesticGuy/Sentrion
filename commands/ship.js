const Discord = require('discord.js');

exports.run = (bot, message, args) => {
  const user = message.mentions.users.first();
  var splitter = message.content.split(" ")
  var name1 = splitter[1]
  var name2 = splitter[2]
  if (!name1) return message.channel.send("Who is the first person?")
  if (name1.startsWith("<@")) return message.channel.send("Send the user's name and dont mention them")
  if (!name2) return message.channel.send(`Who do you want to ship **${name1}** with?`)
  if (name2.startsWith("<@")) return message.channel.send("Send the user's name and dont mention them")
  require('unirest').get(`https://love-calculator.p.mashape.com/getPercentage?fname=${name1}&sname=${name2}`)
.header("X-Mashape-Key", "14Z1S5TbKFmsh6xnCxePcZvyFVrBp11s3Adjsn0pr5AbAXQyun")
.header("Accept", "application/json")
.end(function (result) {
var embed = new Discord.RichEmbed()
.setTitle("Result Calculated!")
.setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
.setAuthor("Ship Command")
.setColor("RED")
.setTimestamp()
.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmGdEIA5wYu21jwmUMhUgV42exCIh8aBS4VmrHvBQLc9aLG0bw")
.addField("Couple", `**${name1} and ${name2}**`)
.addField("Percentage", `**${result.body.percentage}%**`)
.addField("Result", `**${result.body.result}**`)
message.channel.send({ embed: embed })
});
}


exports.help = {
  name: "ship",
  description: "Ships 2 users together!",
  usage: "s.ship [user1] [user2]"
}

exports.aliases = ["love", "couple"]
