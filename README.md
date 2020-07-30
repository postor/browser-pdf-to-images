# browser pdf to images

convert pdf pages to images

```
import { file2images } from 'browser-pdf-to-images'

file2images(input.files[0]).then(images=>console.log(images))

// ['data:image/png;base64,/9j/4AAQSkZJRg...','data:image/png;base64,/9j/4AAQSkZJRg...']
```

## options

```
file2images(file,options={})
```

### `options.type` and `options.quality`

if you want to change output image type and quality

same as https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL

```
file2images(file,{
  type: 'image/jpeg', // jpg format
  quality: 1 // full quality
})
```

### `options.scale`

scale if you want

```
file2images(file,{
  scale: 1.5 // all pages scale up to 1.5 size
})
```

### `options.pdfjsLib`

I got problem when use `pdfjs-dist` in `next.js`, so I can use CDN version

```
<script src="some/cdn/pdf.min.js">
```

```
file2images(file,{
  pdfjsLib: pdfjsLib // use cdn version
})
```