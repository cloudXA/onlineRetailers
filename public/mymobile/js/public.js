$(function() {
    // body监听tap事件后委托a元素执行事件
    $('body').on('tap', 'a', function() {
        mui.openWindow({
            url: $(this).attr('href')
        })
    })
})