const Discord= require('discord.js')
const db = require('quick.db')
const {MessageButton, MessageActionRow} = require("discord-buttons")
async function createPages (interaction, message, embeds, duration, buttonStyle, rightEmoji, leftEmoji, cancelEmoji) {
    if (!['red', 'green', 'blurple'].includes(buttonStyle)) throw new TypeError(`Button style provided is not valid. Valid options: red, green, blurple`);
    if (!rightEmoji) throw new TypeError(`An emoji to go to the next page was not provided.`);
    if (!leftEmoji) throw new TypeError(`An emoji to go to the previous page was not provided.`);
    if (!leftEmoji) throw new TypeError(`An emoji to go cancel the embed page was not provided.`);

    const fowardButton = new MessageButton()
        .setLabel(rightEmoji)
        .setStyle(buttonStyle)
       // .setEmoji(rightEmoji)
        .setID('next-page');

    const backButton = new MessageButton()
        .setLabel(leftEmoji)
        .setStyle(buttonStyle)
        //.setEmoji(leftEmoji)
        .setID('back-page');



    const interactiveButtons = new MessageActionRow()
        .addComponent(backButton)
        .addComponent(fowardButton);

    const msg = await message.channel.send({ components: [interactiveButtons], embed: embeds[0] });
    interaction.message = msg;
    interaction.embeds = embeds;
    interaction.currentPage = 0;
    interaction.duration = 60 * 1000;
    interaction.interactor = message.author;
    interaction.buttonStartTime = Date.now();
    interaction.components = interactiveButtons;
}

async function buttonInteractions (button, interaction)  {
    if (interaction.interactor !== button.clicker.user || Date.now - interaction.buttonStartTime >= interaction.duration || button.message.id !== interaction.message.id) return;
    if (button.id == 'next-page') {
        (interaction.currentPage + 1 == interaction.embeds.length ? interaction.currentPage = 0 : interaction.currentPage += 1);
        interaction.message.edit({ embed: interaction.embeds[interaction.currentPage], components: [interaction.components] });
        button.reply.defer(true);
    } else if (button.id == 'back-page') {
        (interaction.currentPage - 1 < 0 ? interaction.currentPage = interaction.embeds.length - 1 : interaction.currentPage -= 1);
        interaction.message.edit({ embed: interaction.embeds[interaction.currentPage], components: [interaction.components] });
        button.reply.defer(true);
    } 
}
module.exports = {
    name: 'help',
    aliases: [],
    run: async (client, message, args) => {
let prefix =  db.get(` ${process.env.owner}.prefix`)
if(prefix === null) prefix = process.env.prefix;
  let color = db.get(`${process.env.owner}.color`) 
   if(color === null  ) color = process.env.color
 
if(process.env.owner ===message.author.id || db.get(`ownermd.${message.author.id}`) === true || db.get(`${message.guild.id}.${message.author.id}.wlmd`) === true) {
       
    const mod = new Discord.MessageEmbed()
    .setTitle('Modération👔')
    .setColor(color)
    .addField(`\`${prefix}sanctions <membre>\``)
    .addField(`\`${prefix}warn <membre>\``)
    .addField(`\`${prefix}del sanctions <id> <membre>\``)
    .addField(`\`${prefix}clear sanctions <membre>\``)
    .addField(`\`${prefix}clear [nombre]\``)
    .addField(`\`${prefix}mute <membre> [raison] [durée]\``)
    .addField(`\`${prefix}unmute <membre>\``)
    .addField(`\`${prefix}mutelist\``)
    .addField(`\`${prefix}kick <membre> [raison]\``)
    .addField(`\`${prefix}ban <membre> [raison] [durée]\``)
    .addField(`\`${prefix}unban <membre/all>\``)
    .addField(`\`${prefix}lock/unlock [salon/all]\``)
    .addField(`\`${prefix}derank <membre>\``)
    .addField(`\`${prefix}renew [salon/all]\``)
    .addField(`\`${prefix}muterole\``)
    .addField(`\`${prefix}set muterole <rôle>\``)

    .setFooter(`CapsuleProtect • Prefix actuel : ${prefix}`)

    


const log = new Discord.MessageEmbed()
.setTitle('Logs📲')
.setColor(color)
.addField(`\`${prefix}settings\``)
.addField(`\`${prefix}modlog <on/salon>\``)
.addField(`\`${prefix}modlog off\``)
.addField(`\`${prefix}messagelog <on/salon>\``)
.addField(`\`${prefix}messagelog off\``)
.addField(`\`${prefix}voicelog <on/salon>\``)
.addField(`\`${prefix}voicelog off\``)
.addField(`\`${prefix}raidlog <on/salon>\``)

.setFooter(`CapsuleProtect • Prefix actuel : ${prefix}`)
const gestion = new Discord.MessageEmbed()
.setTitle('Gestion')
.setColor(color)
.setFooter(`CapsuleProtect • Prefix actuel : ${prefix}`)
.addField(`\`${prefix}slowmode <durée> [salon]\``)
.addField(`\`${prefix}<serveur/emoji> backup <nom>\``)
.addField(`\`${prefix}backup list <serveur/emoji>\``)
.addField(`\`${prefix}delete <serveur/emoji> backup <nom>\``)
.addField(`\`${prefix}load <serveur/emoji> backup <nom>\``)
.addField(`\`${prefix}antispam <on/off>\``)
.addField(`\`${prefix}antilink <on/off>\``)
.addField(`\`${prefix}antispam <nombre de messages>/<durée>\``)
.addField(`\`${prefix}antilink invite/all\``)


const antiraid = new Discord.MessageEmbed()
.setTitle('Antiraid⚔')
.setColor(color)
.setFooter(`CapsuleProtect • Prefix actuel : ${prefix}`)
.addField(`\`${prefix}raidlog on [salon]\``)
.addField(`\`${prefix}raidlog off\``)
.addField(`\`${prefix}raidlog off\``)
.addField(`\`${prefix}antitoken <on/off>\``)
.addField(`\`${prefix}antitoken <nombre de personnes>/<temps>\``)
.addField(`\`${prefix}secur\``)
.addField(`\`${prefix}secur <off/on/max>\``)
.addField(`\`${prefix}antichannel <on/off>\``)
.addField(`\`${prefix}antirole <off/on>\``)
.addField(`\`${prefix}antiwebhook <off/on>\``)
.addField(`\`${prefix}clear webhooks\``)
.addField(`\`${prefix}antiunban <off/on>\``)
.addField(`\`${prefix}antibot <off/on>\``)
.addField(`\`${prefix}antiban <off/on>\``)
.addField(`\`${prefix}antieveryone <off/on>\``)
.addField(`\`${prefix}punition <derank/kick/ban>\``)
.addField(`\`${prefix}creation limit <durée>\``)
.addField(`\`${prefix}wl <@membre/ID>\``)
.addField(`\`${prefix}wl\``)
.addField(`\`${prefix}unwl <@membre/ID>\``)
.addField(`\`${prefix}clear wl\``)

const bot = new Discord.MessageEmbed()
.setTitle('Bot control💻')
.setColor(color)
.setFooter(`CapsuleProtect • Prefix actuel : ${prefix}`)
.addField(`\`${prefix}set <name/pic> [nom/lien]\``)
.addField(`\`${prefix}<stream/play/watch/listen> [text]\``)
.addField(`\`${prefix}remove activity\``)
.addField(`\`${prefix}<online/idle/dnd/invisible>\``)
.addField(`\`${prefix}server list\``)
.addField(`\`${prefix}invites <ID/nom>\``)
.addField(`\`${prefix}leave [ID]\``)
.addField(`\`${prefix}owner <@membre/ID>\``)
.addField(`\`${prefix}owner\``)
.addField(`\`${prefix}unowner <@membre/ID>\``)
.addField(`\`${prefix}clear owners\``)
.addField(`\`${prefix}bl <@membre/ID>\``)
.addField(`\`${prefix}bl\``)
.addField(`\`${prefix}unbl <@membre/ID>\``)
.addField(`\`${prefix}clear bl\``)
.addField(`\`${prefix}secur invite <on/off>\``)
       
const embedPages = [ mod, log, gestion,antiraid,bot];
createPages(client.interaction, message, embedPages, 60 * 1000, "blurple", "▶", "◀");

} else {

}

    }
}