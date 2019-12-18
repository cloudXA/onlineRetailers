var userInfo = null;


// 获取用户信息 并且处理用户为登录问题
$.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    async: false,
    
    success: function(res) {
        console.log(res);
        // console.log(1);
        // alert(1);
        // 获取用户信息
        if(res.error && res.error === 400) {
            location.href = 'login.html';
        }
        userInfo = res;
    }
})

$(function () {
    // 退出登录
    // 1.获取到退出登录按钮并添加点击事件
    // 2.调用退出登录接口实现退出登录
    // 3.如果退出成功，跳转到首页
    $('#logout').on('click', function() {
        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function(res) {
                // var that = this;
                if (res.success) {
                    mui.toast('退出成功');
                        location.href = 'index.html';
                }
                // console.log(2);
                alert(2);
            }
        })
    });

    // debugger;
    console.log(userInfo);
    var html = template('usertemp', userInfo);
    console.log(html);
    $('#userInfo').html(html);
    

})


