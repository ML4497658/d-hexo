hexo.extend.injector.register(
    'body_end',
	'<script src="/js/dynamicTabTitle.js"></script>',
	'<script src="/js/isItOutOfTime.js"></script>',
	'default');

hexo.extend.injector.register('body_end', `
  <div id="aplayer"></div>
  <link defer rel="stylesheet" href="https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.css" />
  <script src="https://cdn.staticfile.org/aplayer/1.10.1/APlayer.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/meting@1.2/dist/Meting.min.js"></script>
  <script defer src="/js/aplayer.js"></script>
  `,'default');
