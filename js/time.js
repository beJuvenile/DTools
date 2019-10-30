
layui.use(['element','form','laydate','jquery'], function () {
    let element = layui.element
        ,form = layui.form
        ,laydate = layui.laydate
        ,$ = layui.jquery
        ,interval = null
        ,pause = false;

    laydate.render({
        elem: '#custom-date'
        ,type: 'datetime'
        ,format: 'yyyy-MM-dd HH:mm:ss'
        ,calendar: true
    });

    /*附上button提交表单*/
    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    $(".unix-timestamp-btn .layui-btn:nth-child(1)").click(function () {
        pause = true;
    });
    $(".unix-timestamp-btn .layui-btn:nth-child(2)").click(function () {
        pause = false;
    });
    $(".unix-timestamp-btn .layui-btn:nth-child(3)").click(function () {
        refreshUnixTimestamp();
    });
    
    interval = setInterval(function () {
        if (!pause) {
            refreshUnixTimestamp();
        }
    }, 1000);
    
    function refreshUnixTimestamp() {
        let timezone = $(".unix-timestamp").find("select[name='timezone']").val();

        $.ajax({
            url: gateway + '/api/v1/unix/timestamp'
            ,data: {'timezone':timezone}
            ,type: 'GET'
            ,async: false
            ,success: function(res){
                if (res.code===0) {
                    $(".unix-timestamp").find("input[name='unix_timestamp']").val(res.data.unix_timestamp)
                } else {
                    layer.alert(res.msg, {icon: 2, shade:0});
                }
            }
            ,error: function () {
                layer.alert('网络错误', {icon: 2, shade:0});
            }
        });
    }
    
    
});