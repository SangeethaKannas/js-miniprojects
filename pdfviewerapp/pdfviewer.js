const url = '';

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

const scale = 1.5, canvas = document.querySelector("#pdf-render"), ctx = canvas.getContext('2d')

//Render the page

const renderPage = num => {
    pageIsRendering = true;

    pdfDoc.getPage(num).then(page => {
        const viewPort = page.getViewPort( { scale })
        canvas.height = viewPort.height
        canvas.width = viewPort.width

        const renderCtx = {
            canvasContext: ctx,
            viewPort
        }

        page.render(renderCtx).promise.then( () => {
            pageIsRendering = false
        
            if(pageNumIsPending !== null) {
                renderPage( pageNumIsPending)
                pageNumIsPending = null;
            }
        })

        document.querySelector('#page-num').textContent = pageNum
    })
}

const queueRenderPage = num => {
    if(pageIsRendering) {
        pageNumIsPending = num
    } else {
        renderPage(numj)
    }
}

const prevPage = () => {
    if(pageNum < 1) {
        
    } else {
        pageNum--
        queueRenderPage(pageNum)
    }
}

const nextPage = () => {
    if(pageNum > pdfDoc.numPages ) {
        
    } else {
        pageNum++
        queueRenderPage(pageNum)
    }
}

pdfjsLib.getDocument(url).promise.then( pdfDoc_ => {
    pdfDoc = pdfDoc_

    document.querySelector('#page-count').textContent = pdfDoc.numPages;
    renderPage(pageNum)
}).catch( err => {
    const errorDiv = document.createElement('div')
    errorDiv.className = 'error'
    errorDiv.appendChild(document.createTextNode(err.message))
    document.querySelector('body').insertBefore (div, canvas)
    document.querySelector('.top-bar').style.display = 'none'

})

document.querySelector('#prev-page').addEventListener('click', prevPage)
document.querySelector('#next-page').addEventListener('click', nextPage)