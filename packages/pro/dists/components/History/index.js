import * as __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__ from "react/jsx-runtime";
import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
import * as __WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__ from "@xm/icons-xcode/dist/react";
import * as __WEBPACK_EXTERNAL_MODULE__hooks_useConfigComp_js_8fb2865c__ from "../../hooks/useConfigComp.js";
import * as __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__ from "@xm/ai.kit.base";
function groupByDate(arr) {
    const result = {};
    const isToday = (date)=>{
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    };
    const isThisWeek = (date)=>{
        const today = new Date();
        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1 - today.getDay());
        const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()));
        return date >= weekStart && date <= weekEnd && !isToday(date);
    };
    const isThisMonth = (date)=>{
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return date >= monthStart && date <= monthEnd && !isThisWeek(date) && !isToday(date);
    };
    const isEarlier = (date)=>{
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        return date < monthStart && !isThisMonth(date) && !isThisWeek(date) && !isToday(date);
    };
    for(let i = 0; i < arr.length; i++){
        const currentDate = new Date(arr[i].created);
        if (isToday(currentDate)) {
            if (!result['今天']) result['今天'] = [];
            result['今天'].push(arr[i]);
        }
        if (isThisWeek(currentDate)) {
            if (!result['本周']) result['本周'] = [];
            result['本周'].push(arr[i]);
        }
        if (isThisMonth(currentDate)) {
            if (!result['本月']) result['本月'] = [];
            result['本月'].push(arr[i]);
        }
        if (isEarlier(currentDate)) {
            if (!result['更早']) result['更早'] = [];
            result['更早'].push(arr[i]);
        }
    }
    return result;
}
function HistoryComponent(props, ref) {
    const { history: propsHistory } = props;
    const { serve } = props;
    const [open, setOpen] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(!!props.open);
    const [loading, setLoading] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(!!props.open);
    const [list, setList] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)([]);
    const [searchText, setSearchText] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)('');
    const isZhRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(false);
    const isMobile = 'mobile' === (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.getPlatformFromScreenWidth)();
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        if (open) {
            if (serve) {
                setLoading(true);
                serve({
                    keyword: searchText
                }).then((list)=>{
                    setList(list.map((item, index)=>({
                            ...item,
                            index
                        })));
                }).finally(()=>{
                    setLoading(false);
                });
            } else searchText?.trim() ? setList(propsHistory.filter((item)=>item.title.includes(searchText))) : setList(propsHistory);
        }
    }, [
        searchText,
        propsHistory,
        serve,
        open
    ]);
    const { Drawer, Input, Spin, Popconfirm } = (0, __WEBPACK_EXTERNAL_MODULE__hooks_useConfigComp_js_8fb2865c__.useConfigComp)({
        Drawer: null,
        Input: null,
        Popconfirm: null,
        Spin: null,
        ...props
    });
    const groupRecords = (0, __WEBPACK_EXTERNAL_MODULE_react__.useMemo)(()=>groupByDate(list), [
        list
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
        setOpen(!!props.open);
    }, [
        props.open
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useImperativeHandle)(ref, ()=>({
            open: ()=>{
                setOpen(true);
            }
        }), []);
    if (!Drawer || !Popconfirm) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {});
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Drawer, {
        title: "历史对话",
        placement: isMobile ? 'bottom' : "right",
        open: open,
        width: isMobile ? '100%' : "400px",
        height: isMobile ? '80%' : "100%",
        onClose: ()=>{
            setOpen(false);
            props.onCancel?.();
        },
        closeIcon: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.TotheleftLine, {}),
        styles: {
            body: {
                padding: '4px 16px 30px 16px'
            },
            header: {
                border: 'none',
                padding: '24px 16px'
            }
        },
        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
            className: "ai-history h-full",
            children: [
                !!Input && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Input, {
                    prefix: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.SearchLine, {
                        className: "c-gray3"
                    }),
                    placeholder: props.searchPlaceholder || '请输入关键词',
                    onCompositionStart: (e)=>{
                        e.stopPropagation();
                        isZhRef.current = true;
                    },
                    onCompositionEnd: (e)=>{
                        e.stopPropagation();
                        isZhRef.current = false;
                        setSearchText(e.target.value);
                    },
                    onChange: (e)=>{
                        if (!isZhRef.current) setSearchText(e.target.value);
                    }
                }),
                loading ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                    className: "flex h-full items-center justify-center",
                    children: !!Spin && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Spin, {
                        spinning: true
                    })
                }) : Object.keys(groupRecords).map((key)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                        className: "mt-15",
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                                className: "text-12 c-gray3",
                                children: key
                            }),
                            groupRecords[key].map((item, index)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                                    className: "ai-history__item mt-10 h-40 bg-#f7f8f9 rounded-8 [&:hover_.ai-history__title]:text-#5E37FF text-14 px-12 flex justify-between items-center",
                                    onClick: ()=>{
                                        props.onSelect?.(item, index);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                                            title: item.title,
                                            className: "ai-history__title whitespace-nowrap text-ellipsis max-w-80% overflow-hidden",
                                            children: item.title
                                        }),
                                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(Popconfirm, {
                                            title: props.deleteTitle || '确定删除该对话？',
                                            description: props.deleteMessage || '删除后，对话记录将不可恢复。',
                                            overlayStyle: {
                                                padding: '0 24px'
                                            },
                                            onConfirm: ()=>{
                                                props.onDelete?.(item).then(()=>{
                                                    setList((list)=>{
                                                        const newList = [
                                                            ...list
                                                        ];
                                                        const index = newList.findIndex((i)=>i.index === item.index);
                                                        if (index > -1) newList.splice(index, 1);
                                                        return newList;
                                                    });
                                                });
                                            },
                                            onCancel: ()=>{},
                                            okText: "确定",
                                            okButtonProps: {
                                                danger: true
                                            },
                                            icon: false,
                                            cancelText: "取消",
                                            onPopupClick: (e)=>{
                                                e.stopPropagation();
                                            },
                                            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.DeletedLine, {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                },
                                                className: "c-gray3 cursor-pointer"
                                            })
                                        })
                                    ]
                                }, index))
                        ]
                    }, key))
            ]
        })
    });
}
const History = /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react__.forwardRef)(HistoryComponent);
History.displayName = 'History';
export { History, HistoryComponent };
