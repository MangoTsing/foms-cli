const chalk = require('chalk');
const symbols = require('log-symbols');
const { program } = require('commander');
import { createNewBranch } from './createBranch';
import { copyBranchName } from './copyBranchName';
const packageJson = require('../package.json');
import type { fomsProps } from './types';

(async () => {
  program
  .name('foms-cli')
  .description('Quickly manage your FOMS git repo.')
  .version(packageJson.version);

  program
  .option('-c, --create', 'create new foms branch.');

  program
  .option('-cbn, --copybranchname', 'copy current branch name.');

  program.parse(process.argv);
  const options: fomsProps = program.opts();
  if (options.create) {
    await createNewBranch();
    return;
  }
  if (options.copybranchname) {
    await copyBranchName();
    return;
  }
  console.log(symbols.success, chalk.green('输入 foms -h 查看全部命令.'));
})();