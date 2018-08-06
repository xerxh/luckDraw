<template>
<div refs="lottery" id="lottery">
    <table border="0" cellpadding="0" cellspacing="0">
        <tr :key="index" v-for="(item, index) in imgs">
            <!-- 奖品列 -->
            <td :key="classMark" v-for="(img, classMark) in item"
            class="lottery-unit" :class="classMark">
                <a v-if="img=='抽奖按钮'" href="#" @click.prevent="handClick">
                </a>
                <img v-if="img!=='抽奖按钮'" :src="img">
                <div v-if="img!=='抽奖按钮'" class="mask"></div>
            </td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
  mounted () {
      this.init('lottery');
  },
  methods : {
      init (id) { // 初始化方法
        if ($("#"+id).find(".lottery-unit").length>0) {
            var lottery = $("#"+id);
            var units = lottery.find(".lottery-unit");
            this.lottery.obj = lottery;
            this.lottery.count = units.length;
            lottery.find(".lottery-unit-"+this.index).addClass("active");
        };
      },
      roll () { // 转动方法
        var index = this.lottery.index;
        var count = this.lottery.count;
        var dom = this.lottery.obj;
        $(lottery).find(".lottery-unit-"+index).removeClass("active");
        index += 1;
        if (index>count-1) {
            index = 0
        };
        $(lottery).find(".lottery-unit-"+index).addClass("active");
        this.lottery.index=index;
        return false;
      },
      stop (index) {
          this.lottery.prize = index;
          return false;
      },
      move () {
          this.lottery.times += 1;
          this.roll();
          if (this.lottery.times > this.lottery.cycle+10 && this.lottery.prize==this.lottery.index) {
                clearTimeout(this.lottery.timer);
                this.lottery.prize=-1;
                this.lottery.times=0;
                this.click=false;
            }else{
                if (this.lottery.times<this.lottery.cycle) {
                    this.lottery.speed -= 10;
                }else if(this.lottery.times==this.lottery.cycle) {
                    //var index = Math.random()*(lottery.count)|0;//中奖物品通过一个随机数生成
                    var index = parseFloat(Math.random()).toFixed(2);
                    console.log(index);
                    if(index<0.01) index = 0;
                    else if(index<0.05) index = 1;
                    else if(index<0.1) index = 2;
                    else if(index<0.2) index = 3;
                    else if(index<0.35) index = 4;
                    else if(index<0.6) index = 5;
                    else if(index<0.8) index = 6;
                    else if(index<1) index = 7;
                    this.lottery.prize = index;

                }else{
                    if (this.lottery.times > this.lottery.cycle+10 && ((this.lottery.prize==0 && this.lottery.index==7) || this.lottery.prize==this.lottery.index+1)) {
                        this.lottery.speed += 110;
                    }else{
                        this.lottery.speed += 20;
                    }
                }
                if (this.lottery.speed<40) {
                    this.lottery.speed=40;
                };
                //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
                this.lottery.timer = setTimeout(this.move,this.lottery.speed);//循环调用
            }
            return false;
      },
      handClick () {
        if (this.click) {//click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
            return false;
        }else{
            this.lottery.speed=100;
            this.move();    //转圈过程不响应click事件，会将click置为false
            this.click=true; //一次抽奖完成后，设置click为true，可继续抽奖
            return false;
        }
      }
  },
  data () {
    return {
        lottery : {  // 抽奖初始化数据
            index:-1,   //当前转动到哪个位置，起点位置
            count:8,    //总共有多少个位置
            timer:0,    //setTimeout的ID，用clearTimeout清除
            speed:10,    //初始转动速度
            times:0,    //转动次数
            cycle:30,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize:-1,    //中奖位置
            obj: null,  // 保存dom目标
        },
        imgs : [ // 奖品图片
            {  // 第一行奖品
                // key  标记的className vlaue 奖品图片

                'lottery-unit-0':'static/img/gift0.jpg',
                'lottery-unit-1':'static/img/gift1.jpg',
                'lottery-unit-2':'static/img/gift2.jpg',
            },
            {   // 第二行奖品
                'lottery-unit-7':'static/img/gift3.jpg',
                '':'抽奖按钮', // 按钮
                'lottery-unit-3':'static/img/gift7.jpg',
            },
            {   // 第三行奖品
                'lottery-unit-6':'static/img/gift6.jpg',
                'lottery-unit-5':'static/img/gift5.jpg',
                'lottery-unit-4':'static/img/gift4.jpg',
            }
        ],
        click:false  //点击开关 保证在抽奖完成前点击无效
    };
  }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
#lottery{
    width:570px;
    height:510px;
    margin:0px auto;
    border:4px solid #ba1809;
}
#lottery table{
    background-color:yellow;
}
#lottery table td{
    position:relative;
    width:190px;
    height:170px;
    text-align:center;
    color:#333;
    font-index:-999
}
#lottery table td img{
    display:block;
    width:190px;
    height:170px;
}
#lottery table td a{
    width:190px;
    height:170px;
    display:block;
    text-decoration:none;
    background:url('../../asset/img/lottery1.jpg') no-repeat top center;
}
#lottery table td a:hover{
    background-image:url('../../asset/img/lottery2.jpg');
}
#lottery table td.active .mask{
    display:block;
}
.mask{
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    background-color: rgba(229, 243, 34, 0.431);
    display:none;
}
</style>
