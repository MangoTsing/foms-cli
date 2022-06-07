const ncp = require('copy-paste');
const chalk = require('chalk');
const symbols = require('log-symbols');
const execSync = require('child_process').execSync;
export const copyBranchName = async () => {
    const currentBranchNameBuffer = execSync('git rev-parse --abbrev-ref HEAD');
    const currentBranchName = currentBranchNameBuffer.toString().trim();
    ncp.copy(currentBranchName, () => {
        console.log(symbols.success, chalk.green(`成功复制当前分支名: ${currentBranchName}`));
    });
};
