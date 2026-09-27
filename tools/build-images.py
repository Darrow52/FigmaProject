"""Image pipeline: makes resized WebP copies of the big images for srcset.

Usage (from the project root):
    pip install pillow
    python tools/build-images.py

Reads tools/images.json ({"img/file.png": [widths]}) and writes
img-opt/<same path>-<width>.webp. The original images are not changed.
"""

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / "tools" / "images.json"
OUT = ROOT / "img-opt"
QUALITY = 80


def build(source: str, widths: list[int]) -> None:
    src_path = ROOT / source
    with Image.open(src_path) as image:
        image.load()
        for width in widths:
            width = min(width, image.width)
            height = round(image.height * width / image.width)
            target = OUT / f"{Path(source).with_suffix('')}-{width}.webp"
            target.parent.mkdir(parents=True, exist_ok=True)
            resized = image.resize((width, height), Image.LANCZOS)
            resized.save(target, "WEBP", quality=QUALITY, method=6)
            print(f"{target.relative_to(ROOT)}  {target.stat().st_size // 1024} KB")


def main() -> None:
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    for source, widths in config.items():
        if not source.startswith("_"):
            build(source, widths)


if __name__ == "__main__":
    main()
