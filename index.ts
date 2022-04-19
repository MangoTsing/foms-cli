const chalk = require('chalk');
const symbols = require('log-symbols');
const { program } = require('commander');
import { createNewBranch } from './createBranch';
(async () => {
  program
  .option('-c, --create', 'create new foms branch');
  program.parse(process.argv);
  const options = program.opts();
  if (options.create) {
    await createNewBranch(options);
    return;
  }
  console.log(symbols.error, chalk.red('其他功能还在开发中...'));
})();