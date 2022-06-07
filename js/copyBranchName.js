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
exports.copyBranchName = void 0;
const ncp = require('copy-paste');
const chalk = require('chalk');
const symbols = require('log-symbols');
const execSync = require('child_process').execSync;
const copyBranchName = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentBranchNameBuffer = execSync('git rev-parse --abbrev-ref HEAD');
    const currentBranchName = currentBranchNameBuffer.toString().trim();
    ncp.copy(currentBranchName, () => {
        console.log(symbols.success, chalk.green(`成功复制当前分支名: ${currentBranchName}`));
    });
});
exports.copyBranchName = copyBranchName;
