# component-sideSlip
组件名称：类目侧滑<br>
组件功能：支持类目数据的动态配置，支持从左或从右动画展开类目，支持类目浮层的宽、高配置，支持蒙版配置，支持浮层内容区是否下拉操作的配置，支持高亮项的下标值配置<br>
组件参数：

$.sideSlip({

            //作用点btn元素(点击能出现类目的按钮)
            actionBtn: $('#J_SideSlipBtn'),
            
            //作用点btn父元素(一般是fix在页面顶部)
            actionBtnParent: $('header'),
            
            //类目数据对象(具体形如: {urlInfoArr:[***]} )
            content: urlListObj,
            
            //作用点btn位置(left or right),决定展开类目动画是从左或从右开始
            categorySide: 'left',
            
            //浮层内容区宽度
            width: 180,
            
            //浮层内容区高度
            height: 210,
            
            //是否需要蒙版标示符(是否需要深色的背景蒙版)
            lock: true,
            
            //浮层内容区是否需要下拉操作标示符(类目过多时可以考虑)
            pullDownFlag: true,
            
            //高亮项的下标值(默认高亮显示项的下标)
            currentIndex: parseInt($('header').attr('data-index'))
        });
