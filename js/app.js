const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', captureExport);

function captureExport() {
    html2canvas(document.querySelector('.preview'), {
        allowTaint: true,
        useCORS: true,
        scale: 4,
    }).then((canvas) => {
        saveAs(canvas.toDataURL(), 'bloggyBanners');
    });
}

function saveAs(uri, filename) {
    let link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.download = filename;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}
