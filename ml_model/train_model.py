<<<<<<< HEAD
# train_model.py
import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.optimizers import Adam
from collections import Counter
import numpy as np

# Step 1: Path setup
current_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(current_dir, 'dataset')
img_size = 224
batch_size = 16
epochs = 15  # Try increasing to 15–20

# Step 2: Data preprocessing
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

train_data = datagen.flow_from_directory(
    data_dir,
    target_size=(img_size, img_size),
    batch_size=batch_size,
    class_mode='categorical',
    subset='training',
    shuffle=True
)

val_data = datagen.flow_from_directory(
    data_dir,
    target_size=(img_size, img_size),
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation',
    shuffle=False
)

# Step 2.1: Optional — Handle class imbalance
counter = Counter(train_data.classes)
max_count = max(counter.values())
class_weights = {
    i: max_count / count for i, count in counter.items()
}

# Step 3: Model setup
base_model = MobileNetV2(include_top=False, input_shape=(img_size, img_size, 3), weights='imagenet')
base_model.trainable = False  # Freeze base layers

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
predictions = Dense(len(train_data.class_indices), activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

model.compile(optimizer=Adam(0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# Step 4: Train the model
model.fit(
    train_data,
    validation_data=val_data,
    epochs=epochs,
    class_weight=class_weights  # 👈 added to fix bias
)

# Step 5: Save the model
model.save('skin_condition_model.h5')
print("✅ Model trained and saved as 'skin_condition_model.h5'")
=======
# train_model.py
import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.optimizers import Adam
from collections import Counter
import numpy as np

# Step 1: Path setup
current_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(current_dir, 'dataset')
img_size = 224
batch_size = 16
epochs = 15  # Try increasing to 15–20

# Step 2: Data preprocessing
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

train_data = datagen.flow_from_directory(
    data_dir,
    target_size=(img_size, img_size),
    batch_size=batch_size,
    class_mode='categorical',
    subset='training',
    shuffle=True
)

val_data = datagen.flow_from_directory(
    data_dir,
    target_size=(img_size, img_size),
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation',
    shuffle=False
)

# Step 2.1: Optional — Handle class imbalance
counter = Counter(train_data.classes)
max_count = max(counter.values())
class_weights = {
    i: max_count / count for i, count in counter.items()
}

# Step 3: Model setup
base_model = MobileNetV2(include_top=False, input_shape=(img_size, img_size, 3), weights='imagenet')
base_model.trainable = False  # Freeze base layers

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
predictions = Dense(len(train_data.class_indices), activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

model.compile(optimizer=Adam(0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# Step 4: Train the model
model.fit(
    train_data,
    validation_data=val_data,
    epochs=epochs,
    class_weight=class_weights  # 👈 added to fix bias
)

# Step 5: Save the model
model.save('skin_condition_model.h5')
print("✅ Model trained and saved as 'skin_condition_model.h5'")
>>>>>>> 4a40d26f4cfb5c8be7c965dc401165e017be6eed
