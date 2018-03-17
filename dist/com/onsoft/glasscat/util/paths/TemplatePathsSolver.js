"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MappedPathUtil_1 = require("./MappedPathUtil");
const TemplatePaths_1 = require("./TemplatePaths");
const jec_commons_1 = require("jec-commons");
class TemplatePathsSolver {
    constructor() { }
    fixFilePath(path) {
        let result = path;
        let id = -1;
        let len = 0;
        if (path) {
            len = result.length;
            if (len > 1 && path.indexOf(jec_commons_1.UrlStringsEnum.SLASH) === 0) {
                result = result.substr(1);
            }
            id = result.lastIndexOf(jec_commons_1.UrlStringsEnum.SLASH);
            if (id !== len)
                result += jec_commons_1.UrlStringsEnum.SLASH;
        }
        else
            result = jec_commons_1.UrlStringsEnum.SLASH;
        return result;
    }
    resolveRelativePath(path) {
        let count = this.countOccurrences(path, jec_commons_1.UrlStringsEnum.SLASH) + 3;
        let result = jec_commons_1.UrlStringsEnum.EMPTY_STRING;
        while (count--) {
            result += jec_commons_1.UrlStringsEnum.RELATIVE_PATH;
        }
        return result;
    }
    resolveProjectPath(project) {
        const projectPath = TemplatePathsSolver.WORKSPACE_PATH + project;
        return MappedPathUtil_1.MappedPathUtil.getInstance().resolve(projectPath);
    }
    resolveDirPath(projectPath, path) {
        const dirPath = projectPath + jec_commons_1.JecStringsEnum.SRC + path;
        return dirPath;
    }
    resolveFilePath(dirPath, fileName, extention) {
        const filePath = dirPath + fileName + jec_commons_1.UrlStringsEnum.DOT + extention;
        return filePath;
    }
    countOccurrences(string, subString, allowOverlapping = false) {
        if (subString.length <= 0)
            return (string.length + 1);
        let n = 0;
        let pos = 0;
        const step = allowOverlapping ? 1 : subString.length;
        while (true) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            }
            else
                break;
        }
        return n;
    }
    resolve(fileName, fileExtension, projectPath, filePath) {
        const fixedPath = this.fixFilePath(filePath);
        const fixedProjectPath = this.resolveProjectPath(projectPath);
        let resolved = new TemplatePaths_1.TemplatePaths();
        let dirPath = null;
        resolved.projectPath = fixedProjectPath;
        resolved.relativePathPattern = this.resolveRelativePath(fixedPath);
        dirPath = this.resolveDirPath(fixedProjectPath, fixedPath);
        resolved.directoryPath = dirPath;
        resolved.filePath = this.resolveFilePath(dirPath, fileName, fileExtension);
        return resolved;
    }
}
TemplatePathsSolver.WORKSPACE_PATH = "${root}/workspace/";
exports.TemplatePathsSolver = TemplatePathsSolver;
;
