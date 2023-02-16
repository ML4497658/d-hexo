// 页脚半透明

hexo.extend.injector.register(
    "head_end",
    '<link rel="stylesheet" href="/css/footerTransp.css?1">',
    "default"
);

// 动态标签页标题

hexo.extend.injector.register(
    "body_end",
    '<script src="/js/dynamicTabTitle.js"></script>',
    "default"
);
// runtime 显示

hexo.extend.injector.register(
    "body_end",
    '<script src="/js/runtimeShow.js"></script>',
    "default"
);

// 文章是否过时
hexo.extend.injector.register(
    "body_end",
    '<script src="/js/isItOutOfTime.js"></script>',
    "default"
);

// metingjs

hexo.extend.injector.register(
    "body_end",
    `
  <!-- require APlayer -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css">
  <script src="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js"></script>
  <!-- require MetingJS -->
  <script src="https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js"></script>
  `,
    "default"
);

//live 2d 看板娘

hexo.extend.injector.register(
    "body_end",
    `
    <script src="https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></script>
    `,
    "default"
);

// 播放器

hexo.extend.injector.register(
    "body_end",
    `
  <meting-js
    server="netease"
    type="playlist"
    order="random"
    id="7290416033"
    fixed=true
    list-folded = "true"
    >
    </meting-js>
  `,
    "default"
);



//<script defer src="/js/aplayer.js"></script>
