import functions_framework
import urllib.request
from flask import make_response

@functions_framework.http
def portfolio(request):
    path = request.path if request.path else '/'
    if path == '' or path == '/':
        path = '/index.html'
    path = path.rstrip('/')
    
    bucket = 'subhajit-das-portfolio'
    url = f'https://storage.googleapis.com/{bucket}{path}'
    
    try:
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'CloudFunction-Portfolio')
        with urllib.request.urlopen(url, timeout=10) as resp:
            content = resp.read()
            response = make_response(content)
            response.headers['Content-Type'] = resp.headers.get('Content-Type', 'text/html')
            response.headers['Cache-Control'] = 'public, max-age=300'
            return response
    except Exception:
        # Fallback to index.html
        try:
            index_url = f'https://storage.googleapis.com/{bucket}/index.html'
            with urllib.request.urlopen(index_url, timeout=10) as resp:
                content = resp.read()
                response = make_response(content)
                response.headers['Content-Type'] = 'text/html'
                return response
        except Exception as e:
            return f'Error: {e}', 500