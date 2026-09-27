# FigmaProject
frontend web page

## Images

Big images are served as resized WebP copies through `srcset`/`sizes`
(the original PNG/JPG stays in `src` as a fallback).

- `tools/images.json` — which source images get WebP copies and in which widths
- `tools/build-images.py` — generates them into `img-opt/`

To add or change an image: put the widths into `tools/images.json`, then run

```
pip install pillow
python tools/build-images.py
```

and use the new files in the `srcset` of the `<img>`.
Every `<img>` has `width`/`height` (the size of the original file), and every
image below the first screen has `loading="lazy"`.
