import re
import sys
from urllib.request import urlopen
from urllib.error import HTTPError, URLError

# Extract all image URLs from index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all src attributes in img tags
img_pattern = r'<img[^>]*src=["\']([^"\']*)["\']'
img_matches = re.findall(img_pattern, content)

# Find all background-image URLs in style attributes
bg_pattern = r'background-image:\s*url\(["\']?([^"\']*)["\']?\)'
bg_matches = re.findall(bg_pattern, content)

all_urls = set(img_matches + bg_matches)
print('Found %d unique image URLs to check:' % len(all_urls))

broken = []
for url in all_urls:
    if url.startswith('http'):
        full_url = url
    else:
        full_url = 'http://localhost:3000/' + url
    
    try:
        response = urlopen(full_url)
        if response.getcode() == 200:
            print('OK %s' % url)
        else:
            print('FAIL %s - HTTP %d' % (url, response.getcode()))
            broken.append((url, 'HTTP %d' % response.getcode()))
    except Exception as e:
        print('FAIL %s - Error: %s' % (url, str(e)))
        broken.append((url, str(e)))

if broken:
    print('')
    print('%d broken images:' % len(broken))
    for url, error in broken:
        print('  %s: %s' % (url, error))
    sys.exit(1)
else:
    print('')
    print('All images are loading correctly!')
