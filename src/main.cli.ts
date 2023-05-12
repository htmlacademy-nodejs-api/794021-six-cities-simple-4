import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/help.command.js';

const cliManager = new CLIApplication();

cliManager.registerCommands([
  new HelpCommand,
]);

cliManager.processCommand(process.argv);
