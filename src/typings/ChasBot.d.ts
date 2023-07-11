import {Client,Collection,REST} from "discord.js";

export interface ChasBot extends Client {
    cmds: Collection<string, {name:string,description:string,options:[{}], run?:Function}>
    mainCmdDirectories: string[]
    mainCmds: {}

    handlerFiles: string[]

    restCmds: [{}]
    restClient: REST
}