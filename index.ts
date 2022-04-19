const prompts = require('prompts');
const chalk = require('chalk');
const symbols = require('log-symbols');
const execSync = require('child_process').execSync;
import {
    MASTER_BRANCH_ARRAY,
    BRANCH_TYPE_ARRAY,
    SVS_DEV_TASK_DESC_REG
} from './consts';
import type { processProps } from './types';
(async () => {
  const masterBranch = await prompts({
    type: 'text',
    name: 'branch',
    message: '请输入想要checkout出的主分支',
    initial: MASTER_BRANCH_ARRAY[0],
    validate: (branch: string) => {
        if (!MASTER_BRANCH_ARRAY.includes(branch)) {
            console.log('\n', symbols.warning, chalk.yellow('当前checkout分支非主要live分支，请仔细核对'));
        }
        const allBranch = execSync('git branch').toString().trim().replace('* ', '').split('\n').filter(Boolean);
        if (!allBranch.includes(branch)) {
            return false;
        }
        return true;
    }
  });

  const branchType = await prompts({
    type: 'select',
    name: 'branchType',
    initial: 0,
    message: `请选择想要的分支类型\n`,
    choices: BRANCH_TYPE_ARRAY.map((item) => {
        return {
            title: item,
            value: item,
            description: `这是创建 ${item} 分支`
        }
    }),
  });

  const devTaskNumber = await prompts({
    type: 'number',
    name: 'devTaskNumber',
    message: `请输入DEV-TASK的SVS单号`,
  });

  const devTaskDesc = await prompts({
    type: 'text',
    name: 'devTaskDesc',
    message: `请输入DEV-TASK的描述（${chalk.yellow('英文')}和数字），用_分割单词`,
    validate: (devTaskDesc: string) => SVS_DEV_TASK_DESC_REG.test(devTaskDesc)
  });

  const params: processProps = {
      ...masterBranch,
      ...branchType,
      ...devTaskNumber,
      ...devTaskDesc,
  };

  execSync(`git checkout ${params.branch}`);
  execSync(`git checkout -b ${params.branchType}-SPFOMS-${params.devTaskNumber}_${params.devTaskDesc}`);


})();