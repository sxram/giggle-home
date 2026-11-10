"""Generate the product script and content-based asset URLs for static hosting."""
import hashlib
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
products = json.loads((root / 'products.json').read_text(encoding='utf-8'))
(root / 'products.js').write_text(
    'window.PRODUCTS = ' + json.dumps(products, ensure_ascii=False, indent=2) + ';\n',
    encoding='utf-8',
)
index = root / 'index.html'
html = index.read_text(encoding='utf-8')
for name in ('style.css', 'products.js', 'app.js'):
    version = hashlib.sha256((root / name).read_bytes()).hexdigest()[:12]
    html, count = re.subn(
        r'((?:href|src)=")' + re.escape(name) + r'(?:\?[^"\s]*)?(\")',
        lambda match: match[1] + name + '?v=' + version + match[2],
        html,
    )
    if count != 1:
        raise ValueError(f'Expected one reference to {name}, found {count}')
index.write_text(html, encoding='utf-8')
print(f'Prepared {len(products)} products and versioned CSS/JavaScript URLs.')
