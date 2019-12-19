$(function() {
    // body监听tap事件后委托a元素执行事件
    $('body').on('tap', 'a', function() {
        mui.openWindow({
            url: $(this).attr('href')
        })
    })





})
    /**
 * 获取地址栏中的参数，
 * @param {string} url地址栏参数
 * @returns {string } name 要获取的参数名称
 * @returns     {strign} 参数名称对应的参数值
 */
function getParasByUrl(url, name) {
    var params = url.substr(url.indexOf('?') + 1);
    // 以&切割成数组
    var param =   params.split('&');
    for (var i = 0, length = param.length; i < length; i ++) {
        console.log(param[i]);
        var current = param[i].split('=');
        if (current[0] == name) {
            return current[1];
        }
    }
}