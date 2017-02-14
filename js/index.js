/**
 * Created by jessietang on 1/11/2017.
 */
$(function(){
    //1.nav导航中，点击当前的链接，高亮此链接，并且如果有下拉菜单，显示下拉菜单
    $('.navbar .navbar-nav > li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    //2.color渲染
    $('.color .color-ul .color-size a').each(function(index){
        var _this = $(this);
        var colorVal = _this.attr("colorVal");
        _this.css("background-color",colorVal);
    });

    //3.mini cart toggle
    $(document).on('click','.cart-content .mini-cart-box a', function(e){
        var e = e || window.event;
        e.preventDefault();
        $(this).parent().find('.mini-cart').slideToggle();
    });

    //4.size choose dropdown show and choose it
    $(document).on('click','.size .size-select', function(e){
        $(this).parent().find('.size-ul').slideToggle();
    }).on('click','.size-ul .size-list', function(){
        var sizeVal = $(this).text();
        $('.size .size-select').val(sizeVal);
        $('.size-ul').slideToggle();
    });
    //click other place except input to close the size-ul
    $('body').click(function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;

        //注意这里的逻辑！！！！ 点击size-select and size-list上面已经有自己的逻辑了，可以不用再管
        //如果点击的不是.size-select 并且也不是.size-ul,就关闭下拉菜单
        if($(target).closest('.size-select').length == 0
            && $(target).closest('.size-ul').length == 0){
            $('.size-ul').slideUp(); // close
            //这里用slideToggle的话，下面color选择的时候，会把下拉菜单激活
        }
    });

    //5.color choose
    $(document).on('click','.color-ul .color-size a', function(e){
        var e = e || window.event;
        e.preventDefault();
        console.log('color select');
        var _this = $(this);
        _this.parent().addClass('colorActive').siblings().removeClass('colorActive');
    });


    //6.click to toggle nav
    $('.pdp-nav .nav-tabs li').each(function(index){
        var _this = $(this);
        _this.children().click(function(e){
            var e = e || window.event;
            e.preventDefault();
            var _this = $(this);
            _this.parent().addClass('active').siblings().removeClass('active');
            console.log(index);
            $('.pdp-nav').find('.nav-content-list')
                .eq(index).addClass('navContentCurrent').siblings().removeClass('navContentCurrent');
        });
    });
    /*$(document).on('click','.pdp-nav .nav-tabs li a', function(e){
        var e = e || window.event;
        e.preventDefault();
        var _this = $(this);
        _this.parent().addClass('active').siblings().removeClass('active');
        console.log(_this.parent());
        // 这样写不行，因为index这个参数是从each()函数中传进来的
        $('.pdp-nav').find('.nav-content-list')
            .eq(index).addClass('navContentCurrent').siblings().removeClass('navContentCurrent');
    });*/


    //7.轮播---五个为一组进行切换
    var liLen = $('.img-box-mid .list').length;
    var allWidth = $('.img-box-mid').width();
    var groupLen = 3;
    var moveLen = allWidth / liLen * 5;
    var now = 0;
    $('.next-btn').click(function(){
        //console.log(parseInt($('.img-box-mid').position().left) +'>'+ parseInt(-(groupLen-1)*moveLen));
        if(parseInt($('.img-box-mid').position().left) > parseInt(-(groupLen-1)*moveLen)){
            now++;
            $('.img-box-mid').animate({
                "left": -now*moveLen
            });
            /*if(now === groupLen-1){
             now = 0;
             }*/
            console.log(now);
            if(now === groupLen-1){ // 到最后一个了把按钮禁止了
                $('.img-box-mid').animate({
                    "left": -(groupLen-1)*moveLen
                });
                $('.next-btn').css("opacity","0.5");
            }
            $('.prev-btn').css("opacity","1");
        }
    });
    $('.prev-btn').click(function(){
        if($('.img-box-mid').position().left < 0){
            now--;
            $('.img-box-mid').animate({
                "left": -now*moveLen
            });
            if(now === 0){
                $('.img-box-mid').animate({
                    "left": 0
                });
                $('.prev-btn').css("opacity","0.5");
            }
            $('.next-btn').css("opacity","1");
        }
    });


    //8.点击小图切换大图
    $('.img-box-mid .list').click(function(){
        var _this = $(this);
        var smallSrc = _this.children().attr('src');
        $('.main-img-box img').attr("src",smallSrc);
    });


    //9.hover到大图上，右边出现一个放大大图的图片
    $('.main-img-box .bigImg').hover(function(){
        $('.toBig img').attr("src",$(this).attr("src"));
        $('.toBig').show('slow');
    },function(){
        $('.toBig').hide('slow');
    });


    // 10.点击预览大图，弹出一个遮罩层和弹出层
    /*$(document).on('click','.review-btn', function(){
        $('.view-big img').attr('src',$('.bigImg').attr('src'));
        $('.view-big').show();
        $('body').append('<div class="mask"></div>');
        var maskWidth = $(document).width();
        var maskHeight = $(document).height();
        $('.mask').css({
            "width": maskWidth,
            "height": maskHeight,
            "zIndex": "99",
            "backgroundColor": "#000",
            "opacity":"0.5",
            "position": "absolute",
            "left": 0,
            "top": 0
        });
    });
    $('body').click(function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if($(target).closest('.view-big').length === 0){
            $('.view-big').hide();
            $('.mask').remove();
        }
    });*/
    //改用bootstrap
    $(document).on('click','.review-btn', function(){
        $('#myModal').modal();
    });



    //11.邮件格式不正确或者为空时出现错误提示信息
    $(document).on('click','.email-box .pdp-btn', function(){
        var emailVal = $('.sign-up-email').val();
        //notice: 邮件的验证
        if(emailVal === "" || (emailVal != "" && !/\w+[@]{1}\w+[.]\w+/.test(emailVal))){
            $('.email-form .has-error').show();
        }else{
            $('.email-form .has-error').hide();
            //do others
        }
    });


    //12.当没有size被选中时，点击add to cart按钮时，在主导航下面出现错误信息
    //window.localStorage.clear();
    var count = 0;
    var totalPrice = 0;
    $('.cart-num').text(count);
    $('.total-price').text(totalPrice);
    $(document).on('click','.add-to-cart',function(){
        var _this = $(this);
        $('.form-error').hide();
        var flag = true;
        if($('.size-select').val() === ""){
            $('.form-error').show();
            flag = false;
        }
        if($('.quantity-box').val() === ""){
            $('.form-error').show();
            flag = false;
        }

        //13.新增一个功能，添加购物车, product用localStorage进行本地存储
        if(flag){ // can submit
            count++;
            // rerender mini cart num
            $('.cart-num').text(count);

            var data = new Object();
            data.sku = $('.about-pro .sku').text(); //唯一标识符
            data.name = $('.about-pro .pro-name').text();
            data.price = $('.about-pro .price').text();
            data.size = $('.about-pro .size-select').val();
            data.color = $('.about-pro .color-ul .colorActive a').attr("colorVal");
            data.quantity = $('.about-pro .quantity-box').val();
            // key 和 value 都必须为字符串，换言之，web Storage的API只能操作字符串,所以下面要把对象转换成字符串
            // 当从Web Storage中读取时，可以通过JSON的parse()方法再转换成JSON对象
            var strObj = JSON.stringify(data);// notice
            localStorage.setItem(data.sku,strObj);
            console.log(localStorage.getItem(data.sku));
            // 置空
            $('.about-pro .size-select').val("");
            $('.about-pro .color-ul .color-size').first().addClass("colorActive");
            $('.about-pro .quantity-box').val("");

            // mini cart render by localStorage
            console.log(localStorage.getItem(data.sku));// notice
            var proJson = JSON.parse(localStorage.getItem(data.sku));
            var name = proJson.name;
            console.log(name);
            var price = proJson.price;
            var size = proJson.size;
            var color = proJson.color;
            var quantity = proJson.quantity;

            var $pro = $(`<ul class="one-kind-pro">
                <li>
                <label for="">name:</label>
            <span>${name}</span>
            </li>
            <li>
            <label for="">price:</label>
            <span class="price">${price}</span>
            </li>
            <li>
            <label for="">size:</label>
            <span>${size}</span>
            </li>
            <li>
            <label for="">color:</label>
            <span>${color}</span>
            </li>
            <li>
            <label for="">quantity:</label>
            <span class="quantity">${quantity}</span>
            </li>
                </ul>`);



            $pro.prependTo('.mini-cart');
            // compute the all price
            $('.one-kind-pro').each(function(){
                var priceStr = $(this).find('.price').text();
                var priceNum = priceStr.replace(/[^\d,^{.}]/ig,'');
                var proNum = parseInt($(this).find('.quantity').text());
                console.log(priceNum);
                totalPrice += priceNum*proNum;
            });

            // rerender the mini cart total price
            $('.total-price').text(totalPrice);

            $('.mini-cart').slideDown();
        }


    });

});

