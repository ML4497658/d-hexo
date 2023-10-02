// random cover
'use strict'

hexo.extend.filter.register('before_post_render', function (data) {
    const {config} = this
    if (config.post_asset_folder) {
        const imgTestReg = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/
        const topImg = data.top_img
        const cover = data.cover
        if (topImg && topImg.indexOf('/') === -1 && imgTestReg.test(topImg)) {
            data.top_img = data.path + topImg
        }
        if (cover && cover.indexOf('/') === -1) {
            data.cover = data.path + cover
        }

    }
    if ((data.cover === undefined || data.cover === null || data.cover === '') && hexo.theme.config.cover.random_cover && data.layout === 'post') {
        // let coverList = getCoverList()
        // data.cover = randomCover(coverList)
        let source = data.source
        var fs = require('fs')
        let json = fs.readFileSync('img.json', 'utf-8')
        let imgList = JSON.parse(json)
        data.cover = imgList[source]
        return data
    }
    // console.log(data)
    return data
}, 0)

function getCoverList() {
    const theme = hexo.theme.config
    let coverList = []
    if (theme.cover) { // get the txt file path
        let path = 'source/img.txt'
        var fs = require('fs')
        let txt = fs.readFileSync(path, 'utf-8')
        coverList = txt.split('\n')
    }
    return coverList
}

function randomCover(coverList) {
    const theme = hexo.theme.config
    let cover
    let num
    if (coverList.length > 0) {
        num = Math.floor(Math.random() * coverList.length)
        cover = coverList[num]
    } else {
        cover = theme.default_top_img
    }

    return cover
}
