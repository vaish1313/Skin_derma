from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model
model = tf.keras.models.load_model('skin_condition_model.h5')
class_names = ['Acne', 'Eczema', 'Normal', 'Psoriasis']  # example classes

@app.route('/scan', methods=['POST'])
def scan():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    img = Image.open(image).resize((224, 224))  # resize to model input
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)
    predicted_class = class_names[np.argmax(prediction)]

    return jsonify({'prediction': predicted_class})

if __name__ == '__main__':
    app.run(debug=True)
