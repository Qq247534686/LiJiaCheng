
$.fn.extend({
    bindTable: function (option) {
        var defauleOption = {
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
                        url: '',//请求地址
                        map: function (raw) {//自定义将接收到的数据映射到数据表网格中。
                            console.log(raw)
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
                pageSize: 50,//定义每个请求的数据页面大小。预设值为10。
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
            toolbar: {
                //layout: ['pagination', 'info'],//通过数组索引设置分页和信息的顺序。
                //placement: ['bottom'],//分页按钮位置的数组列表。可以是多个值。将分页位置设置为底部或顶部。
                items: {
                    info: true,//	启用/禁用记录和分页信息的显示。
                    pagination: {
                        //type: 'default',//分页类型。,
                        //pages: {//用于桌面的分页响应式配置。包含layout和pagesNumber的对象。布局的默认值是默认值。定义pagesNumber以指定每个响应断点的页数。
                        //    desktop: {
                        //        layout: 'default',
                        //        pagesNumber: 6
                        //    },
                        //    tablet: {//平板电脑的分页响应式配置。包含layout和pagesNumber的对象。布局的默认值是默认值。定义pagesNumber以指定每个响应断点的页数。
                        //        layout: 'default',
                        //        pagesNumber: 3
                        //    },
                        //    mobile: {//移动的分页响应式配置。布局的默认值是紧凑的。布局紧凑类型不必指定pagesNumber。
                        //        layout: 'compact'
                        //    }
                        //},
                        //navigation: {//启用/禁用上一页，下一页，第一页，最后一页的分页按钮。
                        //    prev: true,
                        //    next: true,
                        //    first: true,
                        //    last: true
                        //},
                        pageSizeSelect: [50, 100, 200, 500, 1000],//选择大小下拉列表的数字数组，用于选择分页大小。-1用于“全部”选项。
                    }
                },
            },
            // 翻页
            translate: {
                records: {
                    processing: 'Please wait...', //微调器期间加载记录的翻页处于活动状态。
                    noRecords: 'No records found', //翻页无记录消息。
                },
                toolbar: {
                    pagination: {
                        items: {
                            info: '显示 {{start}} - {{end}} 行数据，共计 {{total}} 行数据', //翻页模板
                            default: {//	分页翻译。包含用于上一个，上一个，下一个，最后一个，更多，输入，选择的键
                                first: 'First',
                                prev: 'Previous',
                                next: 'Next',
                                last: 'Last',
                                more: 'More pages',
                                input: 'Page number',
                                select: 'Select page size'
                            }
                        }
                    }
                }
            },

            // 详情
            //detail: {
            //    title: 'Load sub table',//子表标题。
            //    content: function (event) {//Datatable实例的回调函数 作为每个记录的子表。回调具有一个参数，您可以访问中的行数据 event.data和子表元素 event.detailCell

            //    }
            //},

            //行数
            //rows: {
            //    autoHide: true,//自动隐藏在响应模式下连续溢出的列。默认情况下启用。
            //    callback: function (row, data, index) {//行回调。Deprecated in v5.0.6 使用rows.beforeTemplate代替。

            //    },
            //    beforeTemplate: function (row, data, index) {//在呈现模板之前调用的行回调。接收3个参数，分别是行jQuery元素，行数据和行号索引。

            //    },
            //    afterTemplate: function (row, data, index) {//	在行渲染后调用的行回调。接收3个参数，分别是行jQuery元素，行数据和行号索引。

            //    },
            //},

            // 列
            columns: [
                //{
                //    field: 'Text',//列的字段名称
                //    title: '#',//标题名称，将显示为页眉或页脚。
                //    width: 40,//此列下单元格的宽度大小。
                //    sortable: false,//启用/禁用列的排序功能。
                //    textAlign: 'center',//单元格的对齐方式在此列下显示。
                //    type: 'number',//
                //    autoHide: false,//启用rows.autoHide选项时，默认情况下，所有溢出列都将隐藏在详细信息行中。将此选项设置为false，以强制隐藏此列。
                //    locked: { left: 'xl' },//将列设置为要锁定的一侧还是静态的。设置对象，将左右两侧作为键，值是要锁定的响应断点
                //    overflow: 'visible',//	CSS溢出值。
                //    format: 'MM/DD/YYYY',//
                //    selector: {//启用列作为选择器（仅复选框不带文本）并提供自定义 class名称。
                //        class: 'kt-checkbox--solid'
                //    },
                //    responsive: {//为每个响应断点设置可见或不可见。
                //        visible: 'md',
                //        hidden: 'lg'
                //    },
                //    template: function (row) {//回调函数支持列渲染并接收当前行值的参数对象。也可以是带占位符的字符串，并使用字段名称{{field}}进行定义。
                //        var status = {
                //            1: { 'title': 'Pending', 'class': 'kt-badge--brand' },
                //            2: { 'title': 'Delivered', 'class': ' kt-badge--metal' },
                //            3: { 'title': 'Canceled', 'class': ' kt-badge--primary' },
                //            4: { 'title': 'Success', 'class': ' kt-badge--success' },
                //            5: { 'title': 'Info', 'class': ' kt-badge--info' },
                //            6: { 'title': 'Danger', 'class': ' kt-badge--danger' },
                //            7: { 'title': 'Warning', 'class': ' kt-badge--warning' },
                //        };
                //        return '<span class="kt-badge ' + status[row.status].class + ' kt-badge--inline kt-badge--pill">' + status[row.status].title + '</span>';
                //    },
                //    sortCallback: function (data, sort, column) {//回调函数支持自定义排序
                //        //data:用于排序的原始数据的JSON字符串数组,sort:asc升序或 desc降序排序类型,column:列配置对象
                //    },
                //}
            ],
            //extensions: {//可以通过扩展来增强数据表，这些扩展提供了新的用户交互和配置选项。
            //    checkbox: {
            //        vars: {
            //            selectedAllRows: 'selectedAllRows',//标记所选所有行的参数，这些参数将在请求中发送到服务器
            //            requestIds: 'requestIds',//启用以从服务器请求所有行ID。
            //            rowIds: 'meta.rowIds',//服务器响应中所有行ID的响应路径。
            //        },
            //    },
            //},
        };
        //<div class="my_datatable" id="kt_datatable"></div>
        $.extend(defauleOption, option);
        var thisDataTable = $(this).KTDatatable(defauleOption);
        return thisDataTable;
    },
});


//table API
//datatable.load()	加载数据表数据源。与datatable.reload()具有相同的功能。
//datatable.reload()	重新加载数据表数据源并重新呈现表。
//datatable.destroy()	销毁数据表实例并还原HTML。
//datatable.getRecord(id)	通过ID在数据表中选择记录。ID是指第一列的值。与链接方法一起使用datatable.getColumn(columnName):id>string>ID是指每一行的第一列值。
//datatable.getColumn(columnName)	按列名称获取列。与链接方法datatable.getValue()一起使用 以获取单元格值。

//datatable.getValue()	获取选定的记录值作为字符串:datatable.getRecord(1).getColumn('columnName').getValue();

//datatable.sort(columnName, sort)	按columnName字段对数据表进行排序。按升序或降序排序。
//datatable.setActive(cell)	将数据表选择器复选框设置为活动状态
//datatable.setInactive(cell)	将数据表选择器复选框设置为非活动状态。
//datatable.setActiveAll(active)	将所有记录的数据表选择器复选框设置为活动 / 不活动。
//datatable.setSelectedRecords() Deprecated in v5.0.6 设置选定的选择器复选框。

//datatable.getSelectedRecords()	获取选定的记录。

//datatable.search(value, column)	执行搜索方法以过滤数据表记录。
//datatable.setDataSourceParam(param, value)	修改数据源参数并将其保存为数据表状态。必须调用 datatable.load()以加载新的修改后的数据源和重新呈现表。
//datatable.getDataSourceParam(param)	通过分页，排序或查询的参数类型获取当前数据源参数。
//datatable.getDataSourceQuery()	的辅助功能快捷方式 datatable.getDataSourceParam('query') 。获取当前的查询数据源参数。
//datatable.getCurrentPage()	获取当前选择的页码
//datatable.getPageSize()	获取当前选择的页面尺寸编号。
//datatable.getTotalRows()	获取记录的总行数。
//datatable.hideColumn(columnName) Deprecated in v5.0.6 隐藏列的字段名称。
//datatable.showColumn(columnName) Deprecated in v5.0.6 按列显示字段名称。
//datatable.table()	返回表的jQuery元素
//datatable.row(selector)	通过CSS选择器从表中选择一行。该方法返回数据表实例。
//datatable.rows(selector)	通过CSS选择器从表中选择多行。该方法返回数据表实例。
//datatable.column(index)	从表索引中选择一个列。该方法返回数据表实例。
//datatable.columns(selector)	通过CSS选择器从表中选择多个列。该方法返回数据表实例。
//datatable.remove()	删除选定的单行或多行。可以在选择器方法row(selector)或 之后使用rows(selector) 。
//datatable.visible(visibility)	设置所选行或列的可见性。可以在选择器方法row(selector)或 之后使用rows(selector) 。
//datatable.nodes()	返回所选行或列的节点。可以在选择器方法row(selector)或 之后使用rows(selector) 。

// Ajax返回数据源
//{
//    //元对象应包含数据表分页正常工作所需的元数据。
//    "meta": {
//        "page": 1,//当前页码。
//        "pages": 35,//服务器中可用的页面总数
//        "perpage": 10,//每页总记录。
//        "total": 350,//服务器中可用的所有记录总数
//        "sort": "asc",//asc升序和desc降序的排序类型。
//        "field": "ShipDate"//应用排序的字段名称。
//    },
//    //对象数组。
//    "data": [
//        {
//            "RecordID": 10,
//            "OrderID": "55154-5393",
//            "ShipCountry": "NG",
//            "ShipCity": "Sapele",
//            "ShipName": "Moen, Kertzmann and Mills",
//            "ShipAddress": "1 Nancy Junction",
//            "CompanyEmail": "epere9@sina.com.cn",
//            "CompanyAgent": "Ely Pere",
//            "CompanyName": "Jacobi, O'Conner and Kuhlman",
//            "Currency": "NGN",
//            "Notes": "adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula",
//            "Department": "Shoes",
//            "Website": "whitehouse.gov",
//            "Latitude": 5.8750769,
//            "Longitude": 5.6931356,
//            "ShipDate": "1\/1\/2016",
//            "PaymentDate": "2017-06-20 10:42:35",
//            "TimeZone": "Africa\/Lagos",
//            "Status": 3,
//            "Type": 1,
//            "TotalPayment": "88,211.68 NGN"
//        }
//    ]
//}
