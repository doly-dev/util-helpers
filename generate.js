const fs = require('fs');
const lib = require('./lib');
const pkg = require('./package.json');

// 模块名
const moduleName = pkg.name;

// 输出文件名称
const outputFileName = 'module-config.js';

// 模块入口
const mainEntry = `${moduleName}/lib`;

// 文件映射关系
const filemaps = {};

// 遍历模块
function traverseMod(mod, pathname) {
    for (let prop in mod) {
        if (typeof mod[prop] === 'object' && mod[prop] && mod[prop] !== 'function') {
            traverseMod(mod[prop], pathname + '/' + prop);
        } else {
            filemaps[prop] = pathname + '/' + prop;
        }
    }
}

traverseMod(lib, mainEntry);

// 输出文件
function outputFile(fileName, content) {
    return fs.writeFileSync(fileName, content)
}

console.log(filemaps);

outputFile(outputFileName, `
const filemaps = ${JSON.stringify(filemaps)};

module.exports = function customName(name) {
    if(filemaps[name]){
        return filemaps[name];
    }
    return \`${moduleName}/lib/\${name}\`;
}
`);