from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CORSHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'public, max-age=31536000')
        super().end_headers()
    
    def do_GET(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path):
            alt = path + '.html'
            if os.path.exists(alt):
                path = alt
            elif os.path + '/index.html':
                if os.path.exists(path + '/index.html'):
                    path = path + '/index.html'
            else:
                path = os.path.join('out', '404.html')
        self.path = path
        return SimpleHTTPRequestHandler.do_GET(self)

HTTPServer(('0.0.0.0', 8080), CORSHandler).serve_forever()
