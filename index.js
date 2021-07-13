//fs is node's filesystem module
const fs = require('fs');

//Slap that config file right up in there
const 
{
    prefix,           //the prefix users will use to activate the bot
    token,            //token to let the bot log in
    errorMessage,     //error message if something goes wrong
    onlineMessage,    //message to let you know the Cryer is awake and hungry
} 
= require('./config.json');

//get the discord.js module in this party too
const Discord = require('discord.js');
//create new Discord client
const client = new Discord.Client();

//this makes a list of sorts with key-value pairs
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');




//in js, "for" acts the same as c# "foreach"
//kinda wack ngl
for (const folder of commandFolders) 
{
    //makes an array of the commands available. Filters it so only .js files are included
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(File => File.endsWith('.js'));

    //loop through the commandFiles array to add each file to the collection
    for (const file of commandFiles) 
    {
	    const command = require(`./commands/${folder}/${file}`);
	    // set a new item in the Collection
	    // with the key as the command name and the value as the exported module
	    client.commands.set(command.name, command);
    }
}



//when client is ready, run this code once
client.once('ready', () => 
{
	console.log(onlineMessage);
});

client.on('message', message =>
{
    //ignore any messages that do not start with the assigned prefix, or if they come from the bot
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    //make an array out of the message, split apart by the spaces, and delete prefix
    //make the entire message lowercase so it's not case-sensitive
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    //if that command isn't in the command file directory, exit
    if (!client.commands.has(commandName)) return;
    
    const command = client.commands.get(commandName);

    //don't let him slide into anyone's dms
    if (command.guildOnly && message.channel.type === 'dm') 
    {
        return message.reply('I cannot accept commands outside of the domain of the Countess.');
    }

    //returns an error if the command requires args (command.args), but no args are provided (args.length)
    if (command.args && !args.length) 
    {
        let reply = `You didn't provide any additional information, ${message.author}!`;

        if (command.usage)
        {
            reply += `\nThe proper usage for this command would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    //this is a try-catch thingie. Makes it throw an error when it can't execute the command.
    //this is so it doesn't kill the program completely when it runs into an error
    try 
    {
        command.execute(message, args);
    } 
    catch (error) 
    {
        console.error(error);
        message.reply(errorMessage);
    }
});









//login to discord with bot's token
client.login(token);