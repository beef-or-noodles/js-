<template>
  <div style="width:600px; margin:0 auto;">
    <!--页面必要代码,img标签上请务必带上图片真实尺寸px-->
    <div id="showbox">
      <img src="//img12.360buyimg.com/n1/s450x450_jfs/t1/59022/28/10293/141808/5d78088fEf6e7862d/68836f52ffaaad96.jpg" width="450" height="450">
      <img src="//img12.360buyimg.com/n1/s450x450_jfs/t1/80220/18/9892/163090/5d78089cEda2f9674/da3b18358e68cfca.jpg" width="450" height="450">
      <img src="//img12.360buyimg.com/n1/s450x450_jfs/t1/61588/10/9949/164377/5d7808a1E6c3615dd/7c45f7039b9cbae8.jpg" width="450" height="450">
      <img src="//img12.360buyimg.com/n1/s450x450_jfs/t1/74718/37/9744/61289/5d7808adE17d93839/43a1962b41270d97.jpg" width="450" height="450">

    </div><!--展示图片盒子-->
    <div id="showsum" /><!--展示图片里边-->
    <p class="showpage">
      <a id="showlast" href="javascript:void(0);"> < </a>
      <a id="shownext" href="javascript:void(0);"> > </a>
    </p>
  </div>
</template>

<script>
import jQuery from 'jquery'
import './js/common.js'
export default {
    name: 'ImgPreview',
    created() {
        this.$nextTick(() => {
            this.init()
        })
    },
    methods: {
        init() {
            var showproduct = {
                'boxid': 'showbox',
                'sumid': 'showsum',
                'boxw': 400, // 宽度,该版本中请把宽高填写成一样
                'boxh': 400, // 高度,该版本中请把宽高填写成一样
                'sumw': 60, // 列表每个宽度,该版本中请把宽高填写成一样
                'sumh': 60, // 列表每个高度,该版本中请把宽高填写成一样
                'sumi': 7, // 列表间隔
                'sums': 5, // 列表显示个数
                'sumsel': 'sel',
                'sumborder': 1, // 列表边框，没有边框填写0，边框在css中修改
                'lastid': 'showlast',
                'nextid': 'shownext'
            }// 参数定义
            jQuery.ljsGlasses.pcGlasses(showproduct)// 方法调用，务必在加载完后执行
        }
    }
}
</script>

<style scoped>
    /*相关样式*/
    #showbox { background:#eee;}
    #showbox:hover{
        cursor: move;
    }
    #showsum { left:25px; margin-top:10px;}
    #showsum span { border:1px solid #ddd;}
    #showsum span.sel { border:1px solid #f60;}

    .showpage { width:400px; position:relative;}
    .showpage a { display:block; width:15px; border:1px solid #ddd; height:60px; line-height:60px; background:#eee; text-align:center; font-size:18px; position:absolute; left:0; top:-62px; text-decoration:none; color:#999;}
    .showpage a#shownext { left:auto; right:0;}
    .showpage a:hover { background:#ccc; color:#777;}
</style>
