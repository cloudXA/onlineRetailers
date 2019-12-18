// 当页面加载完成以后，执行以下代码
$(function() {
// 修改密码
// 1.获取修改密码按钮，添加点击事件
// 2.获取用户输入的信息
// 3.对用户信息做校验，
// 4.调用修改密码接口，实现修改密码功能mui
// 5.跳转到登录页面，重新登录

    // 用click 300ms的延迟，使用tap(mui框架提供，轻巧事件)
    $('#modify-btn').on('tap', function() {
        // 获取表单属性值用户输入的信息
        var originPass = $.trim($('[name="originPass"]').val());
        var newPass = $.trim($('[name="newPass"]').val());
        var confirmPass = $.trim($('[name="confirmPass"]').val());
        var vCode = $.trim($('[name="vCode"]').val());

        if(!originPass) {
            mui.toast('请输入密码');
        }
        if (confirmPass !== newPass) {
            mui.toast('密码不一致');
        } 
        // 发送修改密码请求
        $.ajax({
            url: "/user/updatePassword",
            type: 'post',
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function(res) {
                if(res.success) {
                    mui.toast('修改密码成功');
                    setTimeout(function() {
                        location.href = 'login.html';
                    },2000);
                }
                console.log(res);
            }
        })


    })



    // 获取认证码(调用接口)异步
    $('#getCode').on('tap',function() {
        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function (res){
                console.log(res.vCode);
            }
        })
    })
})