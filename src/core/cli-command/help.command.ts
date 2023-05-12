import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
The program prepares data for the REST API server.

Usage:
  main.js --<command> [--arguments]

Commands:
  --help:            # displays this help message
  --import <PATH>:   # imports data from .tsv-file with name "PATH"
  --version:         # displays version of the program
`
    );
  }
}
