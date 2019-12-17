$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function(response) {
            //获取响应数据  
            // console.log(response);
            // 响应数据传给相关id,拼接后返回数据拼接的HTML
            var html = template('category-first', {
                result: response.rows
            });
            // console.log(html);
            $('.links').html(html);
            $('.links').find('a').eq(0).addClass('active');
        }
    })

    // 事件委托
    $('#links').on('click', 'a', function() {
        
        // console.log(this.attr())
        // console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id');
        $(this).addClass('active').siblings().removeClass('active');
        getSecondCategory(id);
    })
})
function getSecondCategory(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: {
            id: id
        },
        success: function(response) {
            console.log(response);
            var html = template('secondCategory', {
                result: response.rows
            });
            $('#brand-list').html(html);
        }
    })
}




