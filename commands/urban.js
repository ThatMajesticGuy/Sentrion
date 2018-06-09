const Discord = require('discord.js');
const urban = require('urban');

exports.run = (bot, message) => {
  const args = message.content.split(' ').slice(1).join(' ');

  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

            let search = urban(args);
            search.first(json => {
              if (!json) return message.channel.send("There were no results for " + `**${args}**` + " are you speaking english?");

              json.definition = json.definition.length > 2040 ? json.definition.slice(0, 2039) : json.definition
              json.example = json.example.length > 1020 ? json.example.slice(0, 1019) : json.example

              if (!args) {
              var embed = new Discord.RichEmbed()
              .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
              .setAuthor("Urban Command")
              .setTitle("ERROR!")
              .setColor(0x7442B6)
              .setDescription("No word was found for me to search!")
              .setFooter("Powered By Urban Dictionary", "http://www.extension.zone/wp-content/uploads/2015/11/Urban-Dictionary-logo.png")

              message.channel.send({embed : embed});
                  return;
              }

              if (!json.definition)
              {

                var embed = new Discord.RichEmbed()
              .setTitle("`"+args+"`")
              .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
              .setAuthor("Urban Command")
              .setColor(0x7442B6)
              .setDescription("No definition was found!")
              .addField("**Example(s)**", "No definition = no example :(")
              .setFooter("Powered By Urban Dictionary", "http://www.extension.zone/wp-content/uploads/2015/11/Urban-Dictionary-logo.png")

              message.channel.send({embed : embed});


              }

              if (!json.example)
              {

                var embed = new Discord.RichEmbed()
              .setTitle("`"+args+"`")
              .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
              .setAuthor("Urban Command")
              .setColor(0x7442B6)
              .setDescription(json.definition)
              .addField("**Example(s)**", "No examples were found!")
              .setFooter("Powered By Urban Dictionary", "http://www.extension.zone/wp-content/uploads/2015/11/Urban-Dictionary-logo.png")

              message.channel.send({embed : embed});

              }

              else {
                var embed = new Discord.RichEmbed()
              .setTitle("`"+args+"`")
              .setFooter("Created by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
              .setAuthor("Urban Command")
              .setColor(0x7442B6)
              .setDescription(json.definition)
              .addField("**Example(s)**", json.example)
              .setFooter("Powered By Urban Dictionary", "http://www.extension.zone/wp-content/uploads/2015/11/Urban-Dictionary-logo.png")

              message.channel.send({embed : embed});
              }
            })
          };


exports.help = {
  name: "urban",
  description: "Gets definitions from the Urban Dictionary",
  usage: "s.urban [definition]"
}


exports.aliases = ["definition"]
