function convertBase64ToBlob(base64, type) {
    const bytes = window.atob(base64);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for(let i = 0; i < bytes.length; i++)ia[i] = bytes.charCodeAt(i);
    return new Blob([
        ab
    ], {
        type: type
    });
}
function getHtml(content) {
    return `
    <!DOCTYPE html>
    <html lang="zh-cn">
    <style> * {padding: 0; margin: 0}</style>
      <body>
          <div id="htmlContent">
               ${content}
          </div>
      </body>
      </html>
    `;
}
function copyIos(dom, { onSuccess, onError, type } = {}) {
    const formattedText = getHtml(dom.outerHTML || dom.innerHTML);
    if (navigator.clipboard && 'https:' === location.protocol && 'SYNC' !== type) {
        const blobData = {};
        const isImage = dom.tagName?.toUpperCase() === 'IMG';
        if (isImage) blobData['image/png'] = convertBase64ToBlob(dom.src.split(',')[1], 'image/png');
        else {
            if (dom.outerText) blobData['text/plain'] = new Blob([
                dom.outerText
            ], {
                type: 'text/plain'
            });
            else {
                const htmlFragment = dom.innerHTML;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlFragment;
                blobData['text/plain'] = new Blob([
                    tempDiv.outerText
                ], {
                    type: 'text/plain'
                });
            }
            blobData['text/html'] = new Blob([
                formattedText
            ], {
                type: 'text/html;charset=utf-8'
            });
        }
        navigator.clipboard.write([
            new ClipboardItem(blobData)
        ]).then(()=>{
            onSuccess?.();
        }).catch((err)=>{
            console.error('复制操作失败: ', err);
            onError?.();
        }).finally(()=>{});
    } else {
        const tempElem = document.createElement('div');
        const shadowRoot = tempElem.attachShadow({
            mode: 'open'
        });
        shadowRoot.innerHTML = formattedText;
        document.body.appendChild(tempElem);
        tempElem.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        tempElem.shadowRoot?.querySelector('#htmlContent');
        range.selectNodeContents(tempElem.shadowRoot?.querySelector('#htmlContent'));
        selection?.removeAllRanges();
        selection?.addRange(range);
        try {
            document.execCommand('copy');
            onSuccess?.();
        } catch (err) {
            console.log(err);
            onError?.();
        } finally{
            document.body.removeChild(tempElem);
        }
    }
}
function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function copy(text, dom, options = {}) {
    const { onSuccess, onError, type } = options;
    if (isIOS() || isSafari()) {
        copyIos(dom, options);
        return;
    }
    if (!text) {
        onError?.();
        return;
    }
    const formattedText = getHtml(text);
    const tempElem = document.createElement('div');
    const shadowRoot = tempElem.attachShadow({
        mode: 'open'
    });
    shadowRoot.innerHTML = formattedText;
    document.body.appendChild(tempElem);
    tempElem.focus();
    const selection = window.getSelection();
    const range = document.createRange();
    tempElem.shadowRoot?.querySelector('#htmlContent');
    range.selectNodeContents(tempElem.shadowRoot?.querySelector('#htmlContent'));
    selection?.removeAllRanges();
    selection?.addRange(range);
    try {
        document.execCommand('copy');
        onSuccess?.();
    } catch (err) {
        console.log(err);
        onError?.();
    } finally{
        document.body.removeChild(tempElem);
    }
}
export { copy, copyIos };
