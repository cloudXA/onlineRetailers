$(function() {
    var isEdit = Number(getParasByUrl(location.href, 'isEdit'));
    console.log(isEdit);

    if(isEdit) {
        // 编辑操作
        // "0""1"都为真
        if(localStorage.getItem('editAddress')) {
            var address = JSON.parse(localStorage.getItem('editAddress'));
            console.log(address);
            // 获取的address数据传递给模板id为"editTpl"，生成拼接后的html
            var html = template('editTpl',address);
            console.log(html);
            $('#editForm').html(html);
        }
    } else {
        // 添加操作
        var html = template('editTpl',{});
        console.log(html);
        $('#editForm').html(html);

    }










    // 创建三级联动
    var picker = new mui.PopPicker({
        layer: 3
    });

    picker.setData(cityData);

    $('#selectCity').on('tap', function() {
        picker.show(function(selectItems) {
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);

        });
    })

    // 添加收获地址
    // 1.获取收获地址管理按钮并添加点击事件
    // 2.获取用户输入的信息
    // 3.对用户输入的标段信息进行校验
    // 4.调用添加收获地址接口 实现功能
    // 5.跳转回收获地址列表页面
    $('#addAddress').on('tap', function() {

        var username = $.trim($("[name='username']").val());
        var postCode = $.trim($("[name='postCode']").val());
        var city = $.trim($("[name='city']").val());
        var detail = $.trim($("[name='detail']").val());

        if(!username) {
            mui.toast('请输入收货人姓名');
            return;
        }
        if(!postCode) {
            mui.toast('请输入收货人姓名');
            return;
        }
        if(!city) {
            mui.toast('请输入收货人姓名');
            return;
        }
        if(!detail) {
            mui.toast('请输入收货人姓名');
            return;
        }
    
    var data = {
        address: city,
        addressDetail: detail,
        recipients: username,
        postcode: postCode
    };
    // 添加收获地址和修改收获地址的区别在于id的有无，url的地址不同
    // 使用逻辑运算符进行提取整合
    if(isEdit) {
        // 编辑操作
        var url = "/address/updateAddress";
        data.id = address.id;
    } else {
        // 添加操作
        var url = "/address/addAddress";

    }
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        success: function(res) {
            if(res.success) {
                if(isEdit) {
                    mui.toast('地址修改成功');
                } else {
                    mui.toast('地址添加成功');
                }
                
                setTimeout(function() {
                    location.href = 'address.html';
                },2000)
            }
            // mui.toast('success');
            // console.log(res);
        }
    })
})



}) 