const prompts = require('prompts');
const chalk = require('chalk');
const symbols = require('log-symbols');
const execSync = require('child_process').execSync;
const ora = require('ora');
import {
    MASTER_BRANCH_ARRAY,
    BRANCH_TYPE_ARRAY,
    SVS_DEV_TASK_DESC_REG
} from './consts';
import type { processProps } from './types';
export const createNewBranch = async () => {
    const masterBranch = await prompts({
        type: 'text',
        name: 'branch',
        message: '请输入想要checkout出的主分支',
        initial: MASTER_BRANCH_ARRAY[0],
        validate: (branch: string) => {
            if (!MASTER_BRANCH_ARRAY.includes(branch)) {
                console.log('\n', symbols.warning, chalk.yellow('当前checkout分支非主要live分支，请仔细核对'));
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
        validate: (devTaskNumber: number) => !!devTaskNumber
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

    const createLoading = ora('正在创建...')
    createLoading.start();
    
    if (!params.branch || !params.branchType || !params.devTaskNumber || !params.devTaskDesc) {
        console.log(symbols.error, chalk.red(`请确认填写必填项:`));
        console.log(chalk.yellow(`当前分支: ${params.branch} \n分支类型: ${params.branchType} \ndevTask单号: ${params.devTaskNumber} \ndevTask描述: ${params.devTaskDesc}`));
        createLoading.fail();
        return false;
    }

    try {
        execSync(`git checkout ${params.branch}`);
        execSync(`git checkout -b ${params.branchType}-SPFOMS-${params.devTaskNumber}_${params.devTaskDesc}`);
    } catch (err) {
        console.log(chalk.red(err));
        createLoading.fail();
        return false;
    }
    createLoading.succeed();
    console.log(symbols.success, chalk.green(`成功创建分支！`));
    return;
}
