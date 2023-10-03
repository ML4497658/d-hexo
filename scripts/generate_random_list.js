fs = require('fs');
path = require('path');

hexo.extend.console.register('random_list', 'Generate img.json for random cover', {
    desc: 'Generate img.json for random cover',
    usage: 'Usage: hexo random_list',
    options: [
        {
            name: '-i, --img',
            desc: 'img.txt file path. Default: source/_data_/img.txt'
        }, {
            name: '-m, --md',
            desc: 'Markdown file directory path. Default: source/_posts'
        }, {
            name: '-o, --output',
            desc: 'Output file path. Default: source/img.json'
        }
    ]
}, function (args) {
    const imgFilePath = args.i || args.img || 'source/_data/img.txt';
    const mdDirPath = args.m || args.md || 'source/_posts';
    const outputFilePath = args.o || args.output || 'source/_data/random_cover.json';
    generateCovers(imgFilePath, mdDirPath, outputFilePath);
});

function getImgList(filePath) {
    const {readFileSync} = fs;
    const imgList = readFileSync(filePath, 'utf-8').split('\n').map(line => line.trim());
    return imgList.filter(img => img !== '');
}

function needCover(filePath) {
    const {readFileSync} = fs;
    if (! filePath.endsWith('.md')) {
        return false;
    }

    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let flag = false;

    for (const line of lines) {
        if (line.startsWith('---')) {
            if (flag) {
                break;
            } else {
                flag = true;
                continue;
            }
        }
        if (line.startsWith('cover:') && line.split(':')[1].trim() !== '') {
            return false;
        }
        if (line.startsWith('hidden:') && line.split(':')[1].trim() === 'true') {
            return false;
        }
    }

    return true;
}

function getMdList(dirPath) {
    const {readdirSync, statSync} = fs;
    const mdList = [];

    function searchForMdFiles(currentDir) {
        const files = readdirSync(currentDir);
        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const fileStat = statSync(filePath);

            if (fileStat.isDirectory() && ! file.startsWith('.')) {
                searchForMdFiles(filePath);
            } else if (fileStat.isFile() && filePath.endsWith('.md') && needCover(filePath)) {
                mdList.push(filePath);
            }
        }
    }

    searchForMdFiles(dirPath);
    return mdList;
}
function generateCovers(imgFilePath, mdDirPath, outputFilePath) {
    const {writeFileSync} = fs;
    const imgList = getImgList(imgFilePath);
    const mdList = getMdList(mdDirPath);
    const result = {};
    let coverAddCount = 0;

    // download img.txt
    // downloadImgTxt(imgFileLinks, imgFilePath);

    for (const md of mdList) {
        if (imgList.length === 0) {
            console.log('No more images for ' + md + '!');
        } else {
            const imgCh = imgList.pop();
            // 修改 md 路径为 \ 样式
            const mdCh = md.replace(/\\/g, '/');
            result[mdCh] = imgCh;
            coverAddCount++;
            // console.log('Add: ' + md + ' : ' + imgCh);
        }
    }

    writeFileSync(outputFilePath, JSON.stringify(result, null, 4), 'utf-8');

    console.log('Add ' + Object.keys(result).length + ' images to ' + outputFilePath + '!');
    if (imgList.length !== 0) {
        console.log(imgList.length + ' images left!');
    } else {
        console.log('All images are used!');
    }

    const totalMd = mdList.length;
    console.log('Total markdown files: ' + totalMd);
    console.log('Add ' + coverAddCount + ' covers!');

    if (coverAddCount < totalMd) {
        console.log('There are ' + (
            totalMd - coverAddCount
        ) + ' markdown files that have no cover!');
    }
}
