$(function() {
    // 库存数量
    var knum = 0;
    var size = null;
    // 产品的ID 
    var id = getParasByUrl(location.href,'id');

    var productId = 0;
    console.log(id);
    // 获取详细页面信息
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: id
        },
        success: function(res) {
            console.log(res)
            var html = template('productTpl',res);
            // 库存的数量
            knum = res.num;
            console.log(html);
            // 产品的id
            productId = res.id;
            $('#product-box').html(html);

            var gallery = mui('.mui-slider');
            gallery.slider();

        }
    })

    // 小结：熟练使用jQuery的属性添加删除效果，元素选择效果
    $('#product-box').on('tap', '.size span', function() {
        // alert('hi');

        $(this).addClass('active').siblings('span').removeClass('active');
        // 用户选择的尺码
        size = $(this).html();
    })

    var oInp = $('#inp'); 

    $('#increase').on('tap',function() {
        var num = oInp.val();
        num++;
        if(num > knum) {
            num = knum;
        }
        oInp.val(num);
    });
    $('#reduce').on('tap',function() {
        var num = oInp.val();
        num--;
        if(num < 1) {
            num = 1;
        }
        oInp.val(num);
    })

    // 加入购物车
    // 1.获取加入购物车按钮 并添加点击事件
    // 2.判断用户是否选择了尺码
    // 3.调用加入购物车接口
    // 4.提示用户 加入购物车成功 是否跳转
    $('#addCart').on('tap',function() {
        // alert('hi');
        if(!size) {
            alert('请选择尺码');
            return;
        }
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: productId,
                num: knum,
                size: size
            },
            success: function(res) {
                console.log(res);
            }

        })
    })



})