import argparse
import io
from PIL import Image

import torch
import requests
# pylint: disable=E0401
from flask_restx import Api, Resource

app = Flask(__name__)
api = Api(app, title='Object Detection API', version='1.0')

DETECTION_URL = "/v1/object-detection/yolov5s"


@api.route(DETECTION_URL)
class ObjectDetection(Resource):
    def post(self):
        if not request.method == "POST":
            return

        if request.files.get("image"):
            image_file = request.files["image"]
            image_bytes = image_file.read()
            img = Image.open(io.BytesIO(image_bytes))
            results = model(img, size=640)
            data = results.pandas().xyxy[0].to_json(orient="records")
            return data


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask API exposing yolov5 model")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    args = parser.parse_args()

    model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
    model.eval()
    app.run(host="0.0.0.0", port=args.port)