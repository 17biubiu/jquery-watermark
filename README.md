# jquery-watermark
基于jquery的watermark插件

**jquery.watermark.js是一个在网页中实现水印效果的jQuery插件**

###文档

**1**.第一步引入本插件的js文件,需要和jQuery一起引用。

```javascript
<script src="./jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="../jquery.watermark.js"></script>
```

---

**2**.新建一个canvas

```html
<canvas class="canvas"></canvas>
```

**3**.在初始化水印插件之前，先介绍以下其属性：
```javascript
text——水印文本内容。
options:
    text_height -- 文本高度
    rgba -- 文本颜色及透明度
    angle -- 文本旋转角度

```

举例：

```javascript
  $('.canvas').watermark('哈利波特',{
    text_height: 40,
    rgba: 'rgba(0, 0, 0, 0.03)',
    angle: 45
  })

```
