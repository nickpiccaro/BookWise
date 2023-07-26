"""
Main Flask App

This module provides functionality for XYZ.

Author: Your Name
"""

from flask import Flask, send_from_directory
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS, cross_origin  # Import CORS module
from modules import api

app = Flask(__name__, static_folder='../ui/build', static_url_path='')
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.wsgi_app = ProxyFix(app.wsgi_app)

api.init_app(app)

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)

