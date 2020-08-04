import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const { Utils } = require("erela.js");
const ms = require("ms");

export default class equalizer implements IBotCommand {
    
    public readonly _command = "equalizer";
    public readonly aliases : string[] = ["eq","eqz"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command sets equalizer settings for player";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?equalizer <on/off>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        //@ts-ignore
        const player = client.music.players.get(msgObject.guild.id);
        if(!player) return msgObject.channel.send("No song/s currently playing").then(msg=>{msg.delete({timeout: 3000})});
        let embed = new Discord.MessageEmbed()
            .setTitle('🎵EQ command Help🎵')
            .setTimestamp()
            .addField(`Presets:`,`party, bass, trablebass (tb), radio, soft, bassboost (bb),hd(HD)`)
            .addField(`Custom eq:`,`usage there are 14 bands and value is between -1 to 1`)
            .addField(`EQ OFF:`,`Usage .eq off`)
            .addField(`Example:`,`.eq bass\n.eq tb`)
            .addField(`Example for Custom eq`,`EX 1] .eq manual 0 0 0 0 0 0 0 0 0 0 0 0 0 0 \nEX 2] .eq custom 0 0 0 0 0 0 0 0 0 0 0 0 0 0\nEX 3] .eq manual 1 0.24 \nhere there are 13 zeros \nso each 0 repersents 1 band in eq and its value ranges from -1 to 1\n in Example 3 there are only 2 bands so it will change first two bands other will be 0`)
            .setFooter(`${client.user.username} Help`)
        msgObject.channel.send(embed)
            .then(msg=>{msg.delete({timeout: 3000})});
        if(args[0] == 'ON' || args[0] == 'on' || args[0] == 'party'){
            player.setEQ([
                { band: 0, gain: -1.16 },
                { band: 1, gain: 0.28 },
                { band: 2, gain: 0.42 },
                { band: 3, gain: 0.5 },
                { band: 4, gain: 0.36 },
                { band: 5, gain: 0 },
                { band: 6, gain: -0.3 },
                { band: 7, gain: -0.21 },
                { band: 8, gain: -0.21 }    
        ]);
        if(args[0] == 'party') return msgObject.channel.send('Party Mode ON').then(msg=>{msg.delete({timeout: 3000})});
        msgObject.channel.send(`EQ on !!🎵`).then(msg=>{msg.delete({timeout: 3000})});
        msgObject.delete();
        }else if(args[0] == 'off' || args[0] == 'of' || args[0] == 'OFF') {
        player.setEQ(Array(13).fill(0).map((n, i) => ({ band: i, gain: 0 })));
        msgObject.channel.send('All Mode OFF').then(msg=>{msg.delete({timeout: 3000})});
        msgObject.delete();
        }else if(args[0] == 'bass' || args[0] == 'Bass'){
            player.setEQ([
                { band: 0, gain: 0.6 },
                { band: 1, gain: 0.7 },
                { band: 2, gain: 0.8 },
                { band: 3, gain: 0.55 },
                { band: 4, gain: 0.25 },
                { band: 5, gain: 0 },
                { band: 6, gain: -0.25 },
                { band: 7, gain: -0.45 },
                { band: 8, gain: -0.55 },
                { band: 9, gain: -0.7 },    
                { band: 10, gain: -0.3 },    
                { band: 11, gain: -0.25 },
                { band: 12, gain: 0 },  
                { band: 13, gain: 0 }    
        ]);
        msgObject.channel.send('bass Mode ON').then(msg=>{msg.delete({timeout: 3000})});
        msgObject.delete();
        }else if(args[0] == 'radio' || args[0] == 'Radio'){
            player.setEQ([
                { band: 0, gain: 0.65 },
                { band: 1, gain: 0.45 },
                { band: 2, gain: -0.45 },
                { band: 3, gain: -0.65 },
                { band: 4, gain: -0.35 },
                { band: 5, gain: 0.45 },
                { band: 6, gain: 0.55 },
                { band: 7, gain: 0.6 },
                { band: 8, gain: 0.6 },
                { band: 9, gain: 0.6 },    
                { band: 10, gain: 0 },    
                { band: 11, gain: 0 },
                { band: 12, gain: 0 },  
                { band: 13, gain: 0 }    
            ]);
            msgObject.channel.send('Radio Mode ON').then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
        }else if(args[0] == 'pop' || args[0] == 'POP'){
            player.setEQ([
                { band: 0, gain: -0.25 },
                { band: 1, gain: 0.48 },
                { band: 2, gain: 0.59 },
                { band: 3, gain: 0.72 },
                { band: 4, gain: 0.56 },
                { band: 5, gain: 0.15 },
                { band: 6, gain: -0.24 },
                { band: 7, gain: -0.24 },
                { band: 8, gain: -0.16 },
                { band: 9, gain: -0.16 },    
                { band: 10, gain: 0 },    
                { band: 11, gain: 0 },
                { band: 12, gain: 0 },  
                { band: 13, gain: 0 }    
            ]);
            msgObject.channel.send('Pop Mode ON').then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
        }else if(args[0] == 'trablebass' || args[0] == 'tb'){
            player.setEQ([
                { band: 0, gain: 0.6 },
                { band: 1, gain: 0.67 },
                { band: 2, gain: 0.67 },
                { band: 3, gain: 0 },
                { band: 4, gain: -0.5 },
                { band: 5, gain: 0.15 },
                { band: 6, gain: -0.45 },
                { band: 7, gain: 0.23 },
                { band: 8, gain: 0.35 },
                { band: 9, gain: 0.45 },    
                { band: 10, gain: 0.55 },    
                { band: 11, gain: 0.6 },
                { band: 12, gain: 0.55 },  
                { band: 13, gain: 0 }    
            ]);
            msgObject.channel.send('trable and bass Mode ON').then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
            }else if(args[0] == 'hd' || args[0] == 'HD'){
                player.setEQ([
                    { band: 0, gain: 0.31 },
                    { band: 1, gain: 0.3 },
                    { band: 2, gain: 0 },
                    { band: 3, gain: -0.5 },
                    { band: 4, gain: 0.5 },
                    { band: 5, gain: 0 },
                    { band: 6, gain: 0 },
                    { band: 7, gain: 0.05 },
                    { band: 8, gain: 0.13 },
                    { band: 9, gain: 0.24 },    
                    { band: 10, gain: 0.25 },    
                    { band: 11, gain: -0.35 },
                    { band: 12, gain: 0.45 },  
                    { band: 13, gain: -0.20 }    
                ]);
                msgObject.channel.send('HD Mode ON').then(msg=>{msg.delete({timeout: 3000})});
                msgObject.delete();
        }else if(args[0] == 'soft' || args[0] == 'Soft'){
            player.setEQ([
                { band: 0, gain: 0 },
                { band: 1, gain: 0 },
                { band: 2, gain: 0 },
                { band: 3, gain: 0 },
                { band: 4, gain: 0 },
                { band: 5, gain: 0 },
                { band: 6, gain: 0 },
                { band: 7, gain: 0 },
                { band: 8, gain: -0.25 },
                { band: 9, gain: -0.25 },    
                { band: 10, gain: -0.25 },    
                { band: 11, gain: -0.25 },
                { band: 12, gain: -0.25 },  
                { band: 13, gain: -0.25 }    
            ]);
            msgObject.channel.send('Soft Mode ON').then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
        }else if(args[0] == 'custom' || args[0] == 'manual'){
            Array(13).forEach(i => {
                let num = Number(args[i+1])
                if(num > 1 || num < -1) return msgObject.channel.send(embed).then(msg=>{msg.delete({timeout: 3000})});
            });
            player.setEQ([
                { band: 0, gain: args[1] },
                { band: 1, gain: args[2] },
                { band: 2, gain: args[3] },
                { band: 3, gain: args[4] },
                { band: 4, gain: args[5] },
                { band: 5, gain: args[6] },
                { band: 6, gain: args[7] },
                { band: 7, gain: args[8] },
                { band: 8, gain: args[9] },
                { band: 9, gain: args[10] },    
                { band: 10, gain: args[11] },    
                { band: 11, gain: args[12] },
                { band: 12, gain: args[13] },  
                { band: 13, gain: args[14] }    
            ]);
            msgObject.channel.send('custom/manual EQ Mode ON').then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
        }else if(args[0] == 'help' || args[0] == 'manual' || !args){
            msgObject.channel.send(embed).then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
        }else if(args[0] == 'bassboost' || args[0] == 'bb'){
            player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: 0.5 })));
        
            msgObject.channel.send('Bassboost ON!!').then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
        }else{
            msgObject.channel.send(embed).then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
        }
    }
}