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
(() => __awaiter(void 0, void 0, void 0, function* () {
    program
        .option('-c, --create', 'create new foms branch');
    program.parse(process.argv);
    const options = program.opts();
    if (options.create) {
        yield (0, createBranch_1.createNewBranch)(options);
        return;
    }
    console.log(symbols.error, chalk.red('其他功能还在开发中...'));
}))();
