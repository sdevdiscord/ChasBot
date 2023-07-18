import {CommandInteraction, CommandInteractionOptionResolver, GuildMember, ChannelType} from "discord.js";
import {ChasBot} from "../../../typings/ChasBot";
import {hasAdminPermissions} from "../../util/hasAdmin";

export default {
    name: 'channel',
    description: 'Sets the channel for different things',
    options:[
        {
            name: 'channel_name',
            description: 'channel to change',
            required: true,
            type: 3,
            choices: [
                {
                    name:'Welcome channel',
                    value:'welcome'
                },
                {
                    name:'Goodbye channel',
                    value: 'goodbye'
                }
            ]
        },
        {
            name: 'channel',
            description: 'The actual channel you want to set it to',
            required: true,
            type: 7
        }
    ], // https://discord.com/developers/docs/interactions/application-commands#slash-commands
    async run(i: CommandInteraction, options: CommandInteractionOptionResolver, c: ChasBot){
        if (!await hasAdminPermissions(i.member as GuildMember,c)) return await i.reply({ content:'You shall not pass!', ephemeral:true })

        let channel_name = options.getString('channel_name')
        let channel = options.getChannel('channel',true,[ChannelType.GuildText])
        await c.GuildDB.push(`/${i.guild?.id}/channels/${channel_name}`,channel.id)

        await i.reply({content:`Successfully changed the \`${channel_name}\` to <#${channel.id}>.`})
    }
}