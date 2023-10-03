hexo.extend.filter.register('after_init', function () { // console.log("after_init!!!!!!!!!!!!!!!!!!!!!1111");
});

hexo.extend.filter.register('before_exit', function () { // console.log("before_exit!!!!!!!!!!!!!!!!!!!!!1111");
});

hexo.extend.filter.register('before_post_render', function (data) { // console.log("before_post_render!!!!!!!!!!!!!!!!!!!!!1111");
    return data;
});


hexo.extend.filter.register('after_post_render', function (data) { // console.log("after_post_render!!!!!!!!!!!!!!!!!!!!!1111");
    return data;
});


hexo.extend.filter.register('before_generate', function () { // console.log("before_generate!!!!!!!!!!!!!!!!!!!!!1111");
});


hexo.extend.filter.register('after_generate', function () { // console.log("after_generate!!!!!!!!!!!!!!!!!!!!!1111");
});


hexo.extend.filter.register('template_locals', function (locals) { // console.log("template_locals!!!!!!!!!!!!!!!!!!!!!1111");
    return locals;
});


hexo.extend.filter.register('new_post_path', function (data, replace) { // console.log("new_post_path!!!!!!!!!!!!!!!!!!!!!1111");
    return data;
});


hexo.extend.filter.register('post_permalink', function (data) { // console.log("post_permalink!!!!!!!!!!!!!!!!!!!!!1111");
    return data;
});
