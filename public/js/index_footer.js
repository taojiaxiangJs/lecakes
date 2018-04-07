/**
 * Created by Administrator on 2017/6/29.
 */
$(function () {
    $('li').each(function (i) {
        $(this).click(function (i) {
            alert(i)
            $('span_img').eq(i).css('background-position','right -'+i*16+'px')
        })
    })
})