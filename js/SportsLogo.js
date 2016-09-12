/**
 * Created by rain on 2015/10/12.
 */
$(function(){
    //点击预览大图，弹出一个遮罩层和弹出层
    $('.toBig').click(function(){
        $('.viewBig').show();
        //添加遮罩层
        var maskWidth = $(document).width();
        var maskHeight = $(document).height();
        $('<div class="mask"></div>').appendTo($('body'));
        $('.mask').css({
            "opacity":"0.4",
            "background":"grey",
            "position":"absolute",
            "left":0,
            "top":0,
            "width":maskWidth,
            "height":maskHeight,
            "z-index":10
        });
    });



    //鼠标移动到大图上，右边弹出一个图层
    $('.bigImg>img').hover(function(){
        $('.viewBigR').show();
        $('.viewBigR>img').css({
            "width":"100%",
            "height":"100%"
        });
    },function(){
        $('.viewBigR').hide();
    });



    //点击五个为一组进行滑动
    var smallMiddleLen = $('.smallMiddle').width();
    console.log(smallMiddleLen);
    var liLen = $('.smallImg>li').length;
    console.log(liLen);
    var n = liLen / 5;
    console.log(n);
    var now = 0;
    console.log($('.smallImg').position().left);  //position()相对于父元素的距离[用这个]
                                                  //offset()相对于整个文档的距离

        $('.next1').click(function(){
            if($('.smallImg').position().left > -(n-1)*smallMiddleLen){
                now++;
                $('.smallImg').animate({
                    "left":-now*smallMiddleLen
                });
                if(now == n-1){
                    $('.smallImg').animate({
                        "left":-(n-1)*smallMiddleLen
                    });

                    $('.next1').css("opacity","0.5");
                }
                $('.prev1').css("opacity","1");
            }

        });

    $('.prev1').click(function(){
        if($('.smallImg').position().left < 0){
            now--;
            $('.smallImg').animate({
                "left":-now*smallMiddleLen
            });
            if(now == 0){
                $('.smallImg').animate({
                    "left":0
                });
                $('.prev1').css("opacity","0.5");

            }
            $('.next1').css("opacity","1");
        }


    });


    //11.tabs功能
    $('.tab2 .navContent2>li').click(function(){
        $(this).addClass('current2').siblings('li').removeClass('current2')
            .parent().next().children('.myDivContent2').eq($(this).index()).show().siblings().hide();
    });


    //3.nav导航中，点击当前的链接，高亮此链接，并且如果有下拉菜单，显示下拉菜单
    $('.sportsNav .sportsNavUl>li').click(function(){
        $(this).addClass('currentNav').siblings().removeClass('currentNav');
        //先让所有的下拉列表都隐藏
        $('.xiala').hide();
        if($(this).children('.xiala')){
            $(this).children('.xiala').show();
        }
    });


    //2.点击cart,在cart下面缓慢的滑出一个弹出层
    $('.topThree .checkout .cart').click(function(e){
        e.preventDefault();
        $('.cartPop').slideToggle();
    });


    //5a.点击小图，大图跟随着变化
    //!!! jquery: attr获取/设置元素的属性； css:获取/设置元素的style样式
    $('.smallImg>li>img').click(function(){
        var smallSrc = $(this).attr('src');
        $('.bigImg>img').attr('src',smallSrc);
        $('.viewBigR>img').attr('src',smallSrc);
        console.log($('.bigImg>img'));
    });


    // 7.下拉列表选择size
    $('.size .inputSize').click(function(e){
        $('.sizeChoose').slideToggle();
        e.stopPropagation();
    });
    $('.sizeChoose>li').click(function(){
        var tsize = $(this).text();
        $('.size .inputSize').val(tsize);
        $('.sizeChoose').slideToggle();
    });
    //点击空白区域隐藏size下拉列表
    $(document).click(function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.className ===  'inputSize'){  //这里其实用不着写这个了
            e.stopPropagation();
            //alert('a');
        }else{
            $('.sizeChoose').hide();
            //alert('b');
        }

    });


    //8.选择color
    $('.colorSelect>li').click(function(e){
        e.preventDefault();
        $(this).addClass('colorCurrent').siblings().removeClass('colorCurrent');
    });


    //10. 当没有size被选中时，点击add to cart按钮时，在主导航下面出现错误信息
    $('.add').click(function(){
        if($('.inputSize').val() == ''){
            $('.errorMsg').show();
        }else{
            $('.errorMsg').hide();
        }
    });


    //12.邮件格式不正确或者为空时出现错误提示信息
    $('.enter').click(function(){
        if($('.enterEmail').val() == ''){
            $('.emailError').show();
        }else{
            $('.emailError').hide();
        }
    });
});