import { CliCommandInterface } from '../core/cli-command/cli-command.interface';

type ParsedCommand = {
  [ key: string ]: string[] // TODO make with Record?
}

export default class CLIApplication {
  private commands: {[ propertyName: string ]: CliCommandInterface } = {};
  private defaultCommandName = '--help';


  private parseCommand(cliArguments: string[]): ParsedCommand {
    let lastCommand = '';

    return cliArguments.reduce((accu, cliArgument) => {
      if (cliArgument.startsWith('--')) {
        accu[cliArgument] = [];
        lastCommand = cliArgument;
      } else if (lastCommand && cliArgument) {
        accu[lastCommand].push(cliArgument);
      }

      return accu;
    }, {} as ParsedCommand);
  }


  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommandName];
  }


  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }


  public registerCommands(commands: CliCommandInterface[]): void {
    commands.reduce((accu, command) => {
      accu[command.name] = command;
      return accu;
    }, this.commands);
  }

}
