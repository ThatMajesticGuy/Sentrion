const Discord = require('discord.js');

exports.run = (bot, message) => {
  var endedWithQuestionmark =
      [
          "It is certain",
          "It is decidedly so",
          "Without a doubt",
          "Yes definitely",
          "You may rely on it",
          "As I see it, Yes",
          "Most likely",
          "Outlook seems good",
          "Yeah whatever keeps you smiling",
          "Signs are pointing to yes",
          "Reply is hazy, try again",
          "Ask me again later",
          "It's better not to tell you now",
          "I cannot predict right now",
          "Concentrate and ask me again",
          "Don't count on it",
          "Don't put your hopes on it",
          "My reply is No",
          "My sources are telling me no",
          "Outlook doesn't seem so good",
          "It's very doubtful"
      ]

      const args = message.content.split(" ").slice(1).join(" ");
      if (!args) {
          const embed5 = new Discord.RichEmbed()
          .setAuthor("8ball Command")
          .setDescription(`I cant predict nothing 🤔`)
          .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
          .setColor("#6b93d6")
          message.channel.send({embed: embed5})
          return;
      }

      const embed = new Discord.RichEmbed()
      .setAuthor("8ball Command")
      .setDescription(`:8ball: **||** ${endedWithQuestionmark[Math.floor(Math.random() * endedWithQuestionmark.length)]}`)
      .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
      .setColor("#6b93d6")
      message.channel.send({ embed: embed })
}


exports.help = {
  name: "8ball",
  description: "Tells you your future!",
  usage: "s.8ball"
}

exports.aliases = []
