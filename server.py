#!/usr/bin/env python3
"""
HENSHE EV Mobility Platform - Local Development Server
Serves the website locally at http://localhost:3000
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean logging
        sys.stderr.write(f"[HENSHE Server] {self.address_string()} - {format%args}\n")

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("⚡ HENSHE EV Mobility, Rental & Investment Platform")
        print(f"🚀 Server running at: {url}")
        print(f"📞 Support Line: +91 9625592488 (Delhi NCR Central Hub)")
        print("=" * 60)
        print("Press Ctrl+C to stop the server.")
        
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down HENSHE server.")
            httpd.server_close()
