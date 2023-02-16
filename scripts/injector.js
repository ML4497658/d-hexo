// 动态标签页标题

hexo.extend.injector.register(
    "body_end",
    '<script src="/js/dynamicTabTitle.js"></script>',
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
    <div id="aplayer">    
    <meting-js
	server="netease"
	type="playlist"
	id="690702378">
    </meting-js>
    </div>


  `,
    "default"
);
//   <div id="aplayer"></div>
//   <script defer src="/js/aplayer.js"></script>
