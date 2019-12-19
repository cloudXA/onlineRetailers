$(function() {
    // 获取用户存储的收货地址

    // 存储收货地址 
    var address = null;
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function(res) {
            console.log(res);
            address = res;

            // 将数据和HTML拼接 拼接的模板，接收的数据
            var html = template("addressTpl", {
                result: res
            });

            console.log(html);
            $('#address-box').html(html);
        }
    })

    // 删除收获地址
    // 1.给删除按钮添加点击事件
    // 2.弹出一个删除确认框
    // 3.如果用户点击确认 删除
    // 4.调用删除舒活地址的接口 完成删除功能
    // 5.刷新当前页面

    // 为什么不能实现委托呢,以后对于类名统统使用粘贴方式🤔
    $('#address-box').on('tap','.delete-btn',function() {
        var id = this.getAttribute('data-id');
        console.log(id);
        var li = this.parentNode.parentNode;
        console.log(li);

        mui.confirm('确定删除吗','标题',function(message) {
            if(message.index === 1) {
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function(res) {
                        if(res.success) {
                            location.reload();
                        }
                    }
                })
            } else {
                mui.swipeoutClose(li);
            }
        });
    })
    // 小结：之前学习到的dom操作，虽然不会大规模的应用，但是在开发中也会
    // 相应的涉及到
    // 需要仔细研究接口文档，接口文档和前端页面逻辑的关系
    // 实现委托功能，怎么就确定，实际执行的元素是那个

    // 编辑收获地址
    // 1.给编辑按钮添加点击事件
    // 2.跳转到收获地址编辑页面，并且要将编辑的数据传递到这个页面
    // 3.将数据展示在页面中
    // 4.给确定按钮添加点击事件
    // 5.跳转接口，执行编辑操作
    // 6.跳转回收货地址列表页面
    $('#address-box').on('tap','.edit-btn',function() {
        var id = this.getAttribute('data-id');
        console.log(id);
        console.log(address);
        for (var i = 0; i < address.length; i++) {
            if(address[i].id == id) {
                // console.length(address[i])
                // alert('hi');
                // console.log('hi');
                localStorage.setItem('editAddress',JSON.stringify(address[i]));
                break;
            }
        }
        location.href = 'addAddress.html';
        // console.log(address);
    })


})