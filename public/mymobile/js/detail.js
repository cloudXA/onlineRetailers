$(function() {
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
            console.log(html);
            $('#product-box').html(html);

            var gallery = mui('.mui-slider');
            gallery.slider();

        }
    })
})