import { default as pdfjsLib1, PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist'

interface PdfOptionType {
  type?: string
  quality?: number
  scale?: number,
}

interface FileOptionType extends PdfOptionType {
  pdfjsLib?: typeof pdfjsLib1,
}

export async function file2images(file: File, options: FileOptionType = {}) {
  let { pdfjsLib } = {
    pdfjsLib: pdfjsLib1,
    ...options
  }
  let pdf = await file2pdf(file, pdfjsLib)
  return await pdf2images(pdf, options)
}

export async function pdf2images(pdf: PDFDocumentProxy, options: PdfOptionType = {}) {
  let { type, quality, scale } = {
    type: 'image/png',
    quality: 0.92,
    scale: 1,
    ...options
  }
  return await Promise.all(new Array(pdf.numPages).fill(0).map(async (x, i) => {
    let pageNum = i + 1
    let page = await pdf.getPage(pageNum)
    return page2image(page, scale, type, quality)
  }))
}

async function page2image(page: PDFPageProxy, scale: number = 1, type?: string, quality?: number) {
  var viewport = page.getViewport({ scale: scale })
  var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d')
  var renderContext = { canvasContext: ctx, viewport: viewport }

  canvas.height = viewport.height
  canvas.width = viewport.width

  // @ts-ignore
  await page.render(renderContext).promise
  return canvas.toDataURL(type, quality)
}

function file2pdf(file: File, pdfjsLib: typeof pdfjsLib1): Promise<PDFDocumentProxy> {
  return new Promise((resolve) => {
    let fileReader = new FileReader()
    fileReader.onload = async () => {
      // @ts-ignore
      let loadingTask = pdfjsLib.getDocument(fileReader.result)
      let pdf = await loadingTask.promise
      resolve(pdf)
    }
    fileReader.readAsArrayBuffer(file);
  })
}