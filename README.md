# component-sideSlip
组件名称：类目侧滑<br>
组件功能：支持类目数据的动态配置，支持从左或从右动画展开类目，支持类目浮层的宽、高配置，支持蒙版配置，支持浮层内容区是否下拉操作的配置，支持高亮项的下标值配置<br>
组件参数：

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
