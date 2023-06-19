"""
Module Description

This module provides functionality for XYZ.

Author: Your Name
"""

# pylint: disable=E0401
from flask_restx import Api

from .cat import api as cat_api
from .dog import api as dog_api
from .user import api as users_api
from .gbooks import api as books_api
api = Api(
    title='Zoo API',
    version='1.0',
    description='A simple demo API',
)

api.add_namespace(cat_api)
api.add_namespace(dog_api)
api.add_namespace(users_api)
api.add_namespace(books_api)
