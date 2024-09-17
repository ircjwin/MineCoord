# MineCoord
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fircjwin%2FMineCoord%2Fmain%2Fpackage-lock.json&query=%24%5B%22packages%22%5D%5B%22%22%5D%5B%22dependencies%22%5D%5B%22discord.js%22%5D&style=plastic&label=discord.js&color=mediumorchid)
 ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fircjwin%2FMineCoord%2Fmain%2Fpackage-lock.json&query=%24%5B%22packages%22%5D%5B%22%22%5D%5B%22dependencies%22%5D%5B%22sequelize%22%5D&style=plastic&label=sequelize&color=dodgerblue)
 ![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fircjwin%2FMineCoord%2Fmain%2Fpackage-lock.json&query=%24%5B%22packages%22%5D%5B%22%22%5D%5B%22dependencies%22%5D%5B%22sqlite3%22%5D&style=plastic&label=sqlite3&color=indianred)

 A Minecraft Discord bot that stores the names and coordinates of server landmarks with more features to come.

 ## Instructions
 The [discord.js Guide](https://discordjs.guide/) was referenced frequently while creating this project, and much of the code is adapted or copied from examples.
 
 ### packages
 Open the project's root directory in a terminal and run `npm install` to load all dependencies.
 
 ### config.json
 Also at the root, create *config.json* and paste the below text into the file:
 ```
{
    "token":    <Your Token>,
	"clientId": <Your Client ID>,
	"guildId":  <Your Guild ID>
}
```
Your *Client ID* and *Token* can be retrieved from the [Discord Developer Portal](https://discord.com/developers/applications). Use a new or existing application and open the *OAuth2* menu.

*Guild ID* is another name for *Server ID*. This [Discord Support article](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID) breaks down the steps for retrieving it.

### invite
Invite the bot to your Discord server. Refer to this [discord.js Guide page](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links) for help.

### launch
Run `npm run start` in the same terminal as before. A *read*y message will appear when the bot has successfully logged in. The bot can now be interacted with in your Discord server.

## License
Copyright &copy; 2024 Chris "C.J." Irwin<br>
This project is [GNU AGPLv3](LICENSE) licensed.

**MineCoord is not affiliated with Mojang AB or Microsoft in any way.**
