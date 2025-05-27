const APPLICATION_MODE_ALONE = 'ALONE';
const APPLICATION_MODE_HYBRID = 'HYBRID';
function isSeek(stackItem) {
    return 'seek' === stackItem.type;
}
function isTool(stackItem) {
    return 'tool' === stackItem.type;
}
function isEmpty(stackItem) {
    return 'empty' === stackItem.type;
}
function isAnswer(stackItem) {
    return 'answer' === stackItem.type;
}
function isActions(stackItem) {
    return 'actions' === stackItem.type;
}
function isRecommend(stackItem) {
    return 'recommend' === stackItem.type;
}
function isEnd(stackItem) {
    return 'end' === stackItem.type;
}
function isError(stackItem) {
    return 'error' === stackItem.type;
}
function isPromise(value) {
    return value instanceof Promise;
}
export { APPLICATION_MODE_ALONE, APPLICATION_MODE_HYBRID, isActions, isAnswer, isEmpty, isEnd, isError, isPromise, isRecommend, isSeek, isTool };
