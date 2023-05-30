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
  --import <PATH> <DB_HOST> <DB_PORT> <DB_LOGIN> <DB_PASS> <DB_NAME> <PASS_SALT> ${emphasize('# imports data from .tsv-file named "PATH" with database credentials')}
  --version                        ${emphasize('# displays version of the program')}
  --generate <COUNT> <SAVE-PATH> <DATA-URL>  ${emphasize('# makes COUNT entries, saves to SAVE-PATH filename in TSV format, uses data from DATA-URL')}
`
    );
  }

}
