var datatable = $('.kt_datatable').KTDatatable({
    //领域
    data: {
        type: 'remote',//远程数据获取设置为remote，本地数据设置为local
        source: {
            read: {
                //method: "post",//Ajax请求的请求方法。该值可以是GET或 POST。默认值为POST
                //headers: {//请求头数据
                //    'x-my-custom-header': 'some value',
                //    'x-test-header': 'the value'
                //},
                //contentType: 'application/json',//要发送到服务器的内容类型。默认为application/x-www-form-urlencoded; charset=UTF-8
                //params: {//您自己的API可能需要一些参数来调用以获取数据。例如令牌，搜索关键字，ID等。此查询参数对象将在数据表API请求中一起发送
                //    generalSearch: '',
                //    EmployeeID: 1
                //    token: 'tokenvalue'
                //},
                //timeout: 30000,//请求结束之前的毫秒数。默认值为30000，等于30秒。
                url: 'inc/api/datatables/demos/default.php',//请求地址
                map: function (raw) {//自定义将接收到的数据映射到数据表网格中。
                    var dataSet = raw;
                    if (typeof raw.data !== 'undefined') {
                        dataSet = raw.data;
                    }
                    return dataSet;
                },
            },
        },
        //saveState: {
        //    cookie: true,//设置为true或false启用/禁用要保存在中的数据表状态 cookie。默认值为true。
        //    webstorage: true//设置为true或false启用/禁用要保存在中的数据表状态 webstorage。默认值为true。
        //},
        pageSize: 10,//定义每个请求的数据页面大小。预设值为10。
        serverPaging: true,//在服务器端启用/禁用分页。仅适用于 remote
        serverFiltering: true,//在服务器端启用/禁用过滤。仅适用于 remote
        serverSorting: true, //在服务器端启用/禁用排序。仅适用于 remote
        //autoColumns: true,//启用/禁用自动创建列。通过启用此功能，数据表将自动在对象中创建所有可用数据
    },

    //布局
    layout: {
        scroll: false,//启用/禁用滚动。
        footer: false,//启用/禁用页脚。
        //theme: 'default',//定义要应用于数据表的主题类别
        //class: 'kt-datatable--brand',//自定义类添加到数据表中。
        //height: 300,//为数据表定义固定高度。
        //header: false,//启用/禁用标题。
        //customScrollbar: true,//启用/禁用自定义滚动条。默认为true。
        //minHeight: 500,//设置数据表的最小高度。默认为空。
        //spinner: {//微调
        //    //overlayColor: '#000000',//微调背景覆盖颜色。
        //    //opacity: 0,//	微调器背景不透明度。
        //    //type: 'loader',//	微调器类型。
        //    //state: 'brand'//微调状态样式。默认为品牌
        //    //message: (true|'Loading..'),//微调器处于活动状态时启用/禁用加载消息。设置布尔值或文本字符串消息
        //},
        //icons{//图标
        //    sort: {//图标类的选项配置，用于对图标进行升序和降序排序。
        //        asc: 'la la-arrow-up',
        //        desc: 'la la-arrow-down'
        //    },
        //    pagination: {//分页按钮的图标。
        //        next: 'la la-angle-right',
        //        prev: 'la la-angle-left',
        //        first: 'la la-angle-double-left',
        //        last: 'la la-angle-double-right',
        //        more: 'la la-ellipsis-h'
        //    },
        //    rowDetail: {//rowDetail用于带有子表的表的展开和折叠图标。
        //        expand: 'fa fa-caret-down',
        //        collapse: 'fa fa-caret-right'
        //    }
        //},
    },

    // 其他
    sortable: true,//启用/禁用可全局排序的列。
    pagination: true,//全局启用/禁用分页。
    //search: {//搜索条件
    //    onEnter: true,//设置搜索输入键盘输入事件以输入。内部搜索将使用Enter按钮触发 。设置为false可触发在键入任何按钮时进行搜索。
    //    input: $('#generalSearch'),//传递输入的jQuery元素。数据表将在输入中添加onKeyup事件，以触发内部搜索过滤器中表中已经存在的数据。
    //    delay: 400,//控制搜索速度和数据加载请求以自动降低搜索呼叫频率。默认值为400ms。设置毫秒数。
    //},

    // 工具列



    // columns definition
    columns: [
        {
            field: 'id',
            title: '#',
            sortable: 'asc',
            width: 40,
            type: 'number',
            selector: false,
            textAlign: 'center',
        }, {
            field: 'employee_id',
            title: 'Employee ID',
        }, {
            field: 'name',
            title: 'Name',
            template: function (row, index, datatable) {
                return row.first_name + ' ' + row.last_name;
            },
        }, {
            field: 'email',
            width: 150,
            title: 'Email',
        }, {
            field: 'phone',
            title: 'Phone',
        }, {
            field: 'hire_date',
            title: 'Hire Date',
            type: 'date',
            format: 'MM/DD/YYYY',
        }, {
            field: 'gender',
            title: 'Gender',
        }, {
            field: 'status',
            title: 'Status',
            // callback function support for column rendering
            template: function (row) {
                var status = {
                    1: { 'title': 'Pending', 'class': 'kt-badge--brand' },
                    2: { 'title': 'Delivered', 'class': ' kt-badge--metal' },
                    3: { 'title': 'Canceled', 'class': ' kt-badge--primary' },
                    4: { 'title': 'Success', 'class': ' kt-badge--success' },
                    5: { 'title': 'Info', 'class': ' kt-badge--info' },
                    6: { 'title': 'Danger', 'class': ' kt-badge--danger' },
                    7: { 'title': 'Warning', 'class': ' kt-badge--warning' },
                };
                return '<span class="kt-badge ' + status[row.status].class + ' kt-badge--inline kt-badge--pill">' + status[row.status].title + '</span>';
            },
        }, {
            field: 'type',
            title: 'Type',
            // callback function support for column rendering
            template: function (row) {
                var status = {
                    1: { 'title': 'Online', 'state': 'danger' },
                    2: { 'title': 'Retail', 'state': 'primary' },
                    3: { 'title': 'Direct', 'state': 'accent' },
                };
                return '<span class="kt-badge kt-badge--' + status[row.type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.type].state + '">' +
                    status[row.type].title + '</span>';
            },
        }, {
            field: 'Actions',
            title: 'Actions',
            sortable: false,
            width: 130,
            overflow: 'visible',
            textAlign: 'center',
            template: function (row, index, datatable) {
                var dropup = (datatable.getPageSize() - index) <= 4 ? 'dropup' : '';
                return '<div class="dropdown ' + dropup + '">\
                        <a href="#" class="btn btn-hover-brand btn-icon btn-pill" data-toggle="dropdown">\
                            <i class="la la-ellipsis-h"></i>\
                        </a>\
                        <div class="dropdown-menu dropdown-menu-right">\
                            <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
                            <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
                            <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
                        </div>\
                    </div>\
                    <a href="#" class="btn btn-hover-brand btn-icon btn-pill" title="Edit details">\
                        <i class="la la-edit"></i>\
                    </a>\
                    <a href="#" class="btn btn-hover-danger btn-icon btn-pill" title="Delete">\
                        <i class="la la-trash"></i>\
                    </a>';
            },
        }],

});