"""
Users API

This module provides functionality for App Users.
"""
from flask import Flask, request
from PIL import Image
from io import BytesIO
from pathlib import Path
import torch
from ultralytics import YOLO
import cv2
import pytesseract
from werkzeug.datastructures import FileStorage

# pylint: disable=E0401
from flask_restx import Namespace, Resource, fields



def getTextFromBooks(img, yoloResults):
    queries = []
    # Load the image
    image = img

    for result in yoloResults:
        boxes = result.boxes  # Boxes object for bbox outputs
    index = 0
    for box in boxes: 
        x1, y1, x2, y2 = box.xyxy[0].numpy()
        cropped_image = image.crop((x1, y1, x2, y2))
        text = pytesseract.image_to_string(cropped_image)
        text = ''.join(text.split('\n')).split('\f')
        text = ''.join(text)
        print(f"{index}: {text}")
        queries.append(text)
        index=index+1

    return queries

api = Namespace("yolo", description="yolo and ocr")

upload_parser = api.parser()
upload_parser.add_argument('image', location='files',
                           type=FileStorage, required=True)


@api.route('/upload')
@api.expect(upload_parser)
@api.response(404, "No Image")
class YoloToOCR(Resource):
    def post(self):
        file = request.files['image']
        img = Image.open(file)
        model = YOLO("yolov8n.pt") 
        # Images
        imgs = [img]  # batch of images

        # Inference
        results = model(imgs)

        texts = getTextFromBooks(img, results)

        return texts