define(function (require, exports, module) {
    //'类目侧滑'模块
    if($('#J_SideSlip').length){
        var SideSlip  = require('sideSlip');

        var urlStr = $('#J_SideSlipBtn').attr('data-url');
        var urlArr = urlStr.split(',');

        var urlInfoArr = [];

        $.each(urlArr,function(i,n){
            switch (i) {
                case 0:
                    urlInfoArr.push({'url':n,'title':'类目名称1','dataIndex':'0'});
                    break;
                case 1:
                    urlInfoArr.push({'url':n,'title':'类目名称2','dataIndex':'1'});
                    break;
                case 2:
                    urlInfoArr.push({'url':n,'title':'类目名称3','dataIndex':'2'});
                    break;
                case 3:
                    urlInfoArr.push({'url':n,'title':'类目名称4','dataIndex':'3'});
                    break;
                case 4:
                    urlInfoArr.push({'url':n,'title':'类目名称5','dataIndex':'4'});
                    break;
                case 5:
                    urlInfoArr.push({'url':n,'title':'类目名称6','dataIndex':'5'});
                    break;
                case 6:
                    urlInfoArr.push({'url':n,'title':'类目名称7','dataIndex':'6'});
                    break;
                case 7:
                    urlInfoArr.push({'url':n,'title':'类目名称8','dataIndex':'7'});
                    break;
                case 8:
                    urlInfoArr.push({'url':n,'title':'类目名称9','dataIndex':'8'});
                    break;
                case 9:
                    urlInfoArr.push({'url':n,'title':'类目名称10','dataIndex':'9'});
                    break;
                default:
                    break;
            }
        });

        var urlListObj = {urlInfoArr:urlInfoArr};

        $.sideSlip({
            actionBtn: $('#J_SideSlipBtn'),
            actionBtnParent: $('header'),
            content: urlListObj,
            categorySide: 'left',
            width: 180,
            height: 210,
            lock: true,
            pullDownFlag: true,
            currentIndex: parseInt($('header').attr('data-index'))
        });
    }
});