$(function() {
    // 库存数量
    var knum = 0;
    // 产品的ID 
    var id = getParasByUrl(location.href,'id');
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
            knum = res.num;
            console.log(html);
            $('#product-box').html(html);

            var gallery = mui('.mui-slider');
            gallery.slider();

        }
    })

    // 小结：熟练使用jQuery的属性添加删除效果，元素选择效果
    $('#product-box').on('tap', '.size span', function() {
        // alert('hi');

        $(this).addClass('active').siblings('span').removeClass('active');
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
})