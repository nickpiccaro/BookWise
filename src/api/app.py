"""
Main Flask App

This module provides functionality for XYZ.

Author: Your Name
"""

from flask import Flask
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS  # Import CORS module
from modules import api

app = Flask(__name__)
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app)

api.init_app(app)

app.run(debug=True)

