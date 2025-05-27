import * as __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__ from "react/jsx-runtime";
import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
import * as __WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__ from "@xm/icons-xcode/dist/react";
import * as __WEBPACK_EXTERNAL_MODULE__hooks_useConfigComp_js_8fb2865c__ from "../../hooks/useConfigComp.js";
import * as __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__ from "@xm/ai.kit.base";
import * as __WEBPACK_EXTERNAL_MODULE__icon_select_js_e7c374db__ from "./icon/select.js";
import * as __WEBPACK_EXTERNAL_MODULE__icon_Triangle_2x_js_4eae9d77__ from "./icon/Triangle@2x.js";
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
function ConfirmDelete(props) {
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(props.Popconfirm, {
        title: props.deleteTitle || '确定删除该对话？',
        description: props.deleteMessage || '删除后，对话记录将不可恢复。',
        overlayStyle: {
            padding: '0 24px'
        },
        onConfirm: props.onConfirm,
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
        children: props.children
    });
}
function HistoryComponent(props, ref) {
    const { history: propsHistory, title, logo } = props;
    const { serve } = props;
    const [open, setOpen] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(true);
    const [showSearch, setShowSearch] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const [showPick, setShowPick] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const [pickList, setPickList] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)([]);
    const [loading, setLoading] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)(false);
    const [selected, setSelected] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)();
    const [list, setList] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)([]);
    const [searchText, setSearchText] = (0, __WEBPACK_EXTERNAL_MODULE_react__.useState)('');
    const isZhRef = (0, __WEBPACK_EXTERNAL_MODULE_react__.useRef)(false);
    (0, __WEBPACK_EXTERNAL_MODULE__xm_ai_kit_base_e5a38582__.getPlatformFromScreenWidth)();
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useEffect)(()=>{
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
    }, [
        searchText,
        propsHistory,
        serve
    ]);
    const antd = (0, __WEBPACK_EXTERNAL_MODULE__hooks_useConfigComp_js_8fb2865c__.useConfigComp)({
        ...props
    });
    const groupRecords = (0, __WEBPACK_EXTERNAL_MODULE_react__.useMemo)(()=>groupByDate(list), [
        list
    ]);
    (0, __WEBPACK_EXTERNAL_MODULE_react__.useImperativeHandle)(ref, ()=>({
            setSelected: (id)=>{
                setSelected(id);
                return list.find((item)=>item.id === id);
            }
        }), [
        list
    ]);
    if (!antd.Popconfirm) return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.Fragment, {});
    return /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
        className: "ai-history-side relative h-full bg-#E7EDFB " + (open ? 'w-230' : 'w-0 [&>div:not(.switch)]:hidden'),
        children: [
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "switch absolute w-14 h-44 flex items-center justify-center bg-#E7EDFB right--14 top-50% translate-y--50% cursor-pointer",
                style: {
                    borderRadius: '0 10px 10px 0'
                },
                onClick: ()=>{
                    setOpen(!open);
                },
                children: open ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
                    src: __WEBPACK_EXTERNAL_MODULE__icon_Triangle_2x_js_4eae9d77__["default"],
                    className: "w-6",
                    alt: ""
                }) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.TriangleRightFill, {
                    color: "#959BA3",
                    size: 10
                })
            }),
            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "px-28 py-24 flex items-center",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
                        src: logo,
                        alt: "",
                        className: "w-30 h-30 overflow-hidden rounded-6"
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: "text-16 font-600 ml-8 line-clamp-1",
                        children: title
                    })
                ]
            }),
            showSearch ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "flex justify-between px-16",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: "grow-1",
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(antd.Input, {
                            prefix: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.SearchLine, {
                                className: "c-gray3"
                            }),
                            placeholder: props.searchPlaceholder || '搜索会话内容',
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
                        })
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: "w-32 h-32 rounded-6 flex items-center justify-center shrink-0 ml-8",
                        onClick: ()=>{
                            setShowSearch(!showSearch);
                            setSearchText('');
                        },
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.ClosedLine, {})
                    })
                ]
            }) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "flex justify-between px-16",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)(antd.Button, {
                        type: "primary",
                        block: true,
                        onClick: ()=>{
                            props.onCreate?.();
                        },
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.PlusLinearLine, {}),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                                children: "新建对话"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: "w-32 h-32 bg-white rounded-6 flex items-center justify-center shrink-0 ml-8",
                        onClick: ()=>{
                            setShowSearch(!showSearch);
                        },
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.SearchLine, {})
                    })
                ]
            }),
            showPick ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "px-28 flex justify-between items-center pt-22 text-14",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(antd.Checkbox, {
                                checked: pickList.length === list.length,
                                className: "mr-8",
                                onChange: (e)=>{
                                    setPickList(e.target.checked ? list.map((item)=>item.id) : []);
                                }
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("span", {
                                children: [
                                    "已选择",
                                    pickList.length,
                                    "项"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(ConfirmDelete, {
                                Popconfirm: antd.Popconfirm,
                                deleteTitle: props.deleteTitle,
                                deleteMessage: props.deleteMessage,
                                onConfirm: async ()=>{
                                    if (pickList.length > 0) {
                                        const items = pickList.map((id)=>list.find((item)=>item.id === id)).filter((item)=>item);
                                        await props.onDelete?.(items);
                                        setList((list)=>{
                                            const newList = [
                                                ...list
                                            ].filter((item)=>!pickList.includes(item.id));
                                            return newList;
                                        });
                                    }
                                },
                                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.DeletedLine, {
                                    className: "cursor-pointer"
                                })
                            }),
                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.ClosedLine, {
                                className: "ml-8 cursor-pointer",
                                onClick: ()=>{
                                    setShowPick(!showPick);
                                }
                            })
                        ]
                    })
                ]
            }) : /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                className: "px-28 flex items-center justify-between pt-22",
                children: [
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                        className: "text-14 font-500",
                        children: "最近"
                    }),
                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(antd.Popover, {
                        content: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                            children: [
                                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                                    className: "flex items-center hover:bg-#F1F1F1 rounded-4 h-32 p-8 cursor-pointer",
                                    onClick: ()=>{
                                        setPickList([]);
                                        setShowPick(!showPick);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("img", {
                                            src: __WEBPACK_EXTERNAL_MODULE__icon_select_js_e7c374db__["default"],
                                            className: "w-14",
                                            alt: ""
                                        }),
                                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                                            className: "ml-8",
                                            children: "选择"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(ConfirmDelete, {
                                    Popconfirm: antd.Popconfirm,
                                    deleteTitle: props.deleteTitle,
                                    deleteMessage: props.deleteMessage,
                                    onConfirm: async ()=>{
                                        await props.onDelete?.(list);
                                        setList([]);
                                    },
                                    children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                                        className: "flex items-center hover:bg-#F1F1F1 rounded-4 h-32 p-8 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.DeletedLine, {}),
                                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("span", {
                                                className: "ml-8",
                                                children: "清除所有对话"
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        placement: "bottomRight",
                        arrow: false,
                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.GengduoFill, {})
                        })
                    })
                ]
            }),
            loading ? /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                className: "flex h-50% items-center justify-center",
                children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(antd.Spin, {
                    spinning: true
                })
            }) : Object.keys(groupRecords).map((key)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                    className: "mt-16 px-16",
                    children: [
                        /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                            className: "text-12 c-gray3 px-12",
                            children: key
                        }),
                        groupRecords[key].map((item, index)=>/*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                                className: "[&_.icon-delete]:hover:!block mt-8 h-36 rounded-6 hover:bg-white text-14 px-12 flex justify-between items-center cursor-pointer " + (selected === item.id ? 'bg-white' : ''),
                                children: [
                                    /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsxs)("div", {
                                        className: "flex " + (showPick ? 'max-w-100%' : 'max-w-90%'),
                                        onClick: ()=>{
                                            if (showPick) {
                                                const newPickList = pickList.includes(item.id) ? pickList.filter((id)=>id !== item.id) : [
                                                    ...pickList,
                                                    item.id
                                                ];
                                                setPickList(newPickList);
                                            } else {
                                                setSelected(item.id);
                                                props.onSelect?.(item, index);
                                            }
                                        },
                                        children: [
                                            showPick && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(antd.Checkbox, {
                                                checked: pickList.includes(item.id),
                                                className: "mr-10",
                                                onChange: (e)=>{
                                                    const checked = e.target.checked;
                                                    const newPickList = checked ? [
                                                        ...pickList,
                                                        item.id
                                                    ] : pickList.filter((id)=>id !== item.id);
                                                    setPickList(newPickList);
                                                },
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                }
                                            }),
                                            /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                                                className: "ai-history__title whitespace-nowrap text-ellipsis overflow-hidden",
                                                children: item.title
                                            })
                                        ]
                                    }),
                                    !showPick && /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(ConfirmDelete, {
                                        Popconfirm: antd.Popconfirm,
                                        deleteTitle: props.deleteTitle,
                                        deleteMessage: props.deleteMessage,
                                        onConfirm: async ()=>{
                                            await props.onDelete?.(item);
                                            setList((list)=>{
                                                const newList = [
                                                    ...list
                                                ];
                                                const index = newList.findIndex((i)=>i.index === item.index);
                                                if (index > -1) newList.splice(index, 1);
                                                return newList;
                                            });
                                        },
                                        children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)("div", {
                                            className: "icon-delete hidden",
                                            children: /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react_jsx_runtime_225474f2__.jsx)(__WEBPACK_EXTERNAL_MODULE__xm_icons_xcode_dist_react_535b71ee__.DeletedLine, {
                                                onClick: (e)=>{},
                                                className: "c-gray3 cursor-pointer"
                                            })
                                        })
                                    })
                                ]
                            }, index))
                    ]
                }, key))
        ]
    });
}
const HistorySide = /*#__PURE__*/ (0, __WEBPACK_EXTERNAL_MODULE_react__.forwardRef)(HistoryComponent);
HistorySide.displayName = 'HistorySide';
export { HistoryComponent, HistorySide };
