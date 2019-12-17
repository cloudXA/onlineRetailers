$(function() {
    // 搜索按钮添加点击事件
    // 获取用户输入的搜索关键字
    // 判断用户是否输入了搜索关键字
    // 如果用户没有输入，阻止跳转，给出提示
    // 用户输入了，跳转到到搜索结果，并将关键字带到搜索结果页面
    $('#search-button').on('click', function() {
        var keyword = $(this).siblings('input').val();
        if (keyword) {
            keyArr.push(keyword);

            // 将数组存储在本地存储中
            localStorage.setItem('keyArr',JSON.stringify(keyArr))
            // 指定地址栏和传入参数
            location.href = 'search-result.html?keyword=' + keyword;
        } else {
            alert('请输入搜索关键字')
        }
    })

    // 准备用于存储用户数据的数组
    // 用户点击按钮，将用户的数据添加到数组
    // 将数据存储在本地存储中localstorage 
    // 页面渲染判断是否存储
    
    var keyArr = [];
    if (localStorage.getItem('keyArr')) {
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        // console.log(keyArr);

        var html = template('historyTpl', {result: 
         keyArr });

         $('.history-box').html(html);

         console.log(html);
        // 将数组的keyArr和HTML拼接，然后将数据展示在页面中



    }

    // 元素添加点击事件
    // 清空页面中的数据，清空本地存储中的数组
    $('#clearBtn').on('click', function() {
         $('.history-box').html('');
         localStorage.removeItem('keyArr');
    })

})