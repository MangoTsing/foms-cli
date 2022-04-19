"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts = require('prompts');
const chalk = require('chalk');
const symbols = require('log-symbols');
const execSync = require('child_process').execSync;
const consts_1 = require("./consts");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const masterBranch = yield prompts({
        type: 'text',
        name: 'branch',
        message: '请输入想要checkout出的主分支',
        initial: consts_1.MASTER_BRANCH_ARRAY[0],
        validate: (branch) => {
            if (!consts_1.MASTER_BRANCH_ARRAY.includes(branch)) {
                console.log('\n', symbols.warning, chalk.yellow('当前checkout分支非主要live分支，请仔细核对'));
            }
            const allBranch = execSync('git branch').toString().trim().replace('* ', '').split('\n').filter(Boolean);
            if (!allBranch.includes(branch)) {
                return false;
            }
            return true;
        }
    });
    const branchType = yield prompts({
        type: 'select',
        name: 'branchType',
        initial: 0,
        message: `请选择想要的分支类型\n`,
        choices: consts_1.BRANCH_TYPE_ARRAY.map((item) => {
            return {
                title: item,
                value: item,
                description: `这是创建 ${item} 分支`
            };
        }),
    });
    const devTaskNumber = yield prompts({
        type: 'number',
        name: 'devTaskNumber',
        message: `请输入DEV-TASK的SVS单号`,
    });
    const devTaskDesc = yield prompts({
        type: 'text',
        name: 'devTaskDesc',
        message: `请输入DEV-TASK的描述（${chalk.yellow('英文')}和数字），用_分割单词`,
        validate: (devTaskDesc) => consts_1.SVS_DEV_TASK_DESC_REG.test(devTaskDesc)
    });
    const params = Object.assign(Object.assign(Object.assign(Object.assign({}, masterBranch), branchType), devTaskNumber), devTaskDesc);
    execSync(`git checkout ${params.branch}`);
    execSync(`git checkout -b ${params.branchType}-SPFOMS-${params.devTaskNumber}_${params.devTaskDesc}`);
}))();
