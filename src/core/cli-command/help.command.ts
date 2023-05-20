import { CliCommandInterface } from './cli-command.interface.js';
import { Chalk } from 'chalk';

const { green: emphasize } = new Chalk();


export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';


  public async execute(): Promise<void> {
    console.log(`
${emphasize('The program prepares data for the REST API server.')}

${emphasize('Usage:')}
  main.js --<command> [--arguments]

${emphasize('Commands')}:
  --help                           ${emphasize('# displays this help message')}
  --import <PATH>                  ${emphasize('# imports data from .tsv-file with name "PATH"')}
  --version                        ${emphasize('# displays version of the program')}
  --generate <COUNT> <PATH> <URL>  ${emphasize('# makes COUNT entries and saves to PATH-filename in TSV format, uses samples data from URL')}
`
    );
  }

}
