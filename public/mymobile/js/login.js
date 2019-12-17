$(function() {
    // 用户登录
    // 1.获取登录按钮并且添加点击事件
    // 2.获取到用户输入的表单信息
    // 3.调用登录接口实现登录
    // 4.如果用户登录成功跳转到会员中心
    $('#login-btn').on('click', function() {
        // 去掉字符串两边的空隙
        var username = $.trim($("[name='username']").val());
        var password = $.trim($("[name='password']").val());

        if(!username) {
            mui.toast('请输入用户名');
            return;
        }
        if(!password) {
            mui.toast("请输入密码");
            return;
        }
        // 调用接口，实现登录
          $.ajax({
              url: '/user/login',
              type: 'post',
              data: {
                  username: username,
                  password: password
              },
              beforeSend: function() {
                  $('#login-btn').html('正在登录...')
              },
              success: function(res) {
                  console.log(res);
                //   mui.toast('登录成功');
                  setTimeout(function() {
                    location.href = 'user.html';
                  },2000)
              }
          })
    })
})