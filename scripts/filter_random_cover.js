// random cover
fs = require('fs')
path = require('path')
src_json_path = 'source/_data/random_cover.json'

function applyRandomCover(data) {
    if (data.layout === 'post') {
        const json = fs.readFileSync(src_json_path, 'utf-8');
        const imgList = JSON.parse(json);
        const sourceKey = 'source/' + data.source.replace(/\\/g, '/');
        if (imgList.hasOwnProperty(sourceKey)) {
            data.cover = imgList[sourceKey];
            console.log(`Applied cover to ${sourceKey}: ${
                data.cover
            }`);
        }
    }
    return data;
}

hexo.extend.filter.register('before_post_render', applyRandomCover, 0)
