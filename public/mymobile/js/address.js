$(function() {
    // 获取用户存储的收货地址
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function(res) {
            console.log(res);

            // 将数据和HTML拼接 拼接的模板，接收的数据
            var html = template("addressTpl", {
                result: res
            });

            console.log(html);
            $('#address-box').html(html);
        }
    })
})