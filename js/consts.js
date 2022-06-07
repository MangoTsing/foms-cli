"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVS_DEV_TASK_DESC_REG = exports.BRANCH_TYPE_ARRAY = exports.MASTER_BRANCH_ARRAY = void 0;
exports.MASTER_BRANCH_ARRAY = [
    'master',
    'master_th',
];
exports.BRANCH_TYPE_ARRAY = [
    'feature',
    'hotfix',
];
exports.SVS_DEV_TASK_DESC_REG = /^(?![\d_]+$)\w+$/;
