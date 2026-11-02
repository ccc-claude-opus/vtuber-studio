# 產生單檔版 dist/vtuber-standalone.html：把 css/style.css 與 js/*.js 內嵌進 index.html
import re, pathlib
root = pathlib.Path(__file__).parent
html = (root / 'index.html').read_text(encoding='utf-8')
css = (root / 'css/style.css').read_text(encoding='utf-8')
html = html.replace('<link rel="stylesheet" href="css/style.css">', '<style>\n' + css.rstrip() + '\n</style>')
html = re.sub(r'<script src="(js/[^"]+)"></script>',
              lambda m: '<script>\n' + (root / m.group(1)).read_text(encoding='utf-8').rstrip() + '\n</script>', html)
(root / 'dist').mkdir(exist_ok=True)
(root / 'dist/vtuber-standalone.html').write_text(html, encoding='utf-8')
print('dist/vtuber-standalone.html')
