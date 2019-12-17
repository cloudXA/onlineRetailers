$(function() { 
    // 获取用去的关键字
    // 用关键字调取搜索接口
    // 将搜索结果展示与页面中
    // 将关键字传递给搜索接口
    mui.init({
        pullRefresh : {
          container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback: getDate //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据,当页面加载时、页面上拉底部时
          }
        }
      });
});

// 全局变量
var page = 1;
var html = '';
var key = getParasByUrl(location.href, 'key');

function getDate() {
    var that = this;
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            // page: page++,
            page: page++,
            pageSize: 3,
            proName: key
        },
        success: function(res) {
            if(res.data.length <= 0) {
                that.endPullupToRefresh(true);
            } else {
                // 给ip传入输入,并返回拼接后HTML
                html += template('searchTpl',res);
                $('#search-box').html(html);
                that.endPullupToRefresh(false); 
            }
        }
    });
}

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
        if (current[0] === 'keyword') {
            return current[1];
        }
    }
}

