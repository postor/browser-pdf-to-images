# browser pdf to images

convert pdf pages to images

```
import { file2images } from 'browser-pdf-to-images'

file2images(input.files[0]).then(images=>console.log(images))

// ['data:image/png;base64,/9j/4AAQSkZJRg...','data:image/png;base64,/9j/4AAQSkZJRg...']
```