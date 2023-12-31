import {CommandInteraction, CommandInteractionOptionResolver, GuildMember} from "discord.js";
import {ChasBot} from "../../../typings/ChasBot";
import {hasAdminPermissions} from "../../util/hasAdmin";
import {HydratedDocument} from "mongoose";
import {IGuild, MGuild} from "../../../models/guild";

export default {
    name: 'edit',
    description: 'Edits an guild-only action',
    options:[
        {
            name: 'name',
            description: 'Action name',
            type: 3,
            required: true
        },
        {
            name: 'key',
            description: 'Key to change',
            type: 3,
            required: true,
            choices:[
                {
                    name:'Description',
                    value:'description'
                },
                {
                    name:'Prompt',
                    value: 'prompt'
                },
                {
                    name: 'Embed Color',
                    value: 'embed_color'
                }
            ]
        },
        {
            name: 'value',
            description: 'Value to change to',
            type: 3,
            required: true
        },
    ],
    async run(i: CommandInteraction, options: CommandInteractionOptionResolver, c: ChasBot){
        if (!await hasAdminPermissions(i.member as GuildMember,c)) return await i.reply({ content:'You shall not pass!', ephemeral:true })

        let guild:HydratedDocument<IGuild> = await MGuild.findByGuildId(i.guildId)

        const name = options.getString('name',true)
        const key = options.getString('key',true)
        const value = options.getString('value',true)

        let actionCmd = guild.customCommands.action.find(a => a.name == name)
        if (!actionCmd) return await i.reply({content:'Action doesn\'t exist.', ephemeral:true})

        actionCmd[key] = value

        await guild.save()

        return await i.reply({content:`Successfully edited the action command named \`${name}\`.`})
    }
}