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
const chalk = require('chalk');
const symbols = require('log-symbols');
const { program } = require('commander');
const createBranch_1 = require("./createBranch");
const copyBranchName_1 = require("./copyBranchName");
const packageJson = require('../package.json');
(() => __awaiter(void 0, void 0, void 0, function* () {
    program
        .name('foms-cli')
        .description('Quickly manage your FOMS git repo.')
        .version(packageJson.version);
    program
        .option('-c, --create', 'create new foms branch.');
    program
        .option('-cbn, --copybranchname', 'copy current branch name.');
    program.parse(process.argv);
    const options = program.opts();
    if (options.create) {
        yield (0, createBranch_1.createNewBranch)();
        return;
    }
    if (options.copybranchname) {
        yield (0, copyBranchName_1.copyBranchName)();
        return;
    }
    console.log(symbols.success, chalk.green('输入 foms -h 查看全部命令.'));
}))();
