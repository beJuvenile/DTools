
layui.use(['element','form','jquery'], function () {
    let element = layui.element
        ,form = layui.form
        ,$ = layui.jquery;

    /*附上button提交表单*/
    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    $(".layui-btn").click(function () {
        let type = $(this).attr('data-type')
            ,charset = $("select[name='charset']").val()
            ,txt = $("textarea[name='txt']").val();

        $.ajax({
            url: gateway + '/api/v1/serialize'
            ,data: {type:type,charset:charset,txt:txt}
            ,type: 'POST'
            ,async: true
            ,success: function(res){
                if (res.code===0) {
                    $("textarea[name='txt_dec']").val(res.data.txt_dec)
                } else {
                    layer.alert(res.msg, {icon: 2, shade:0});
                }
            }
            ,error: function () {
                layer.alert('网络错误', {icon: 2, shade:0});
            }
        });
    });

});