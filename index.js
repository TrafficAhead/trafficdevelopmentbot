const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Error finding commands!");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} successfully loaded.`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on('ready', () => {
    bot.setInterval(() => {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        bot.user.setActivity(activity.game, { type: activity.type });
    }, 60000);
  
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    let activities = [
      {
          "game": "WFS games",
          "type": "PLAYING"
      },
      {
          "game": "AFS Flight Simulator",
          "type": "PLAYING"
      },
      {
          "game": "Weather Simulator",
          "type": "PLAYING"
      }
  ];
  
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = tt;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

})

bot.login(process.env.BOT_TOKEN);
