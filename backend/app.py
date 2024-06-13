from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
import pandas as pd
import numpy as np
import json
from scipy import stats
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# MongoDB configuration
mongo_client = MongoClient('mongodb://0.0.0.0:27017')

db = mongo_client['mydatabase']
collection = db['mycollection']

# Read the CSV file into a DataFrame
dp = pd.read_csv("backend\marksheet.csv")

# Convert the DataFrame to a list of dictionaries         
data_to_insert = dp.to_dict(orient='records')

# Insert the data into the MongoDB collection
collection.insert_many(data_to_insert)

def convert_int32_to_int(data):
    for key, value in data.items():
        if isinstance(value, int) and value >= 2147483647:
            data[key] = int(value)
    return data
def json_default_handler(o):
    if isinstance(o, ObjectId):
        return str(o)
    if isinstance(o, int) and o >= 2147483647:
        return int(o)


@app.route('/api/stats', methods=['GET'])
def get_statistics():
    # Fetch the data from the MongoDB collection
    data = list(collection.find())

    # Extract attribute values for analysis
    science_scores = [student['Science'] for student in data]
    english_scores = [student['English'] for student in data]
    history_scores = [student['History'] for student in data]
    maths_scores = [student['Maths'] for student in data]
    
    # Calculate statistical measures
    stats_data = {
        'Mean': {
            'science': np.mean(science_scores),
            'english': np.mean(english_scores),
            'history': np.mean(history_scores),
            'maths': np.mean(maths_scores),
        },
        'Median': {
            'science': np.median(science_scores),
            'english': np.median(english_scores),
            'history': np.median(history_scores),
            'maths': np.median(maths_scores),
        },
        'Minimum': {
            'science': min(science_scores),
            'english': min(english_scores),
            
            'history': min(history_scores),
            'maths': min(maths_scores),
        },
        'Varience': {
            
            
            'science': np.var(science_scores),
            'english': np.var(english_scores),
            'history': np.var(history_scores),

            'maths': np.var(maths_scores)


         
            # ...
        },
        'Std_dev':{
            'science': np.std(science_scores),
            'english': np.std(english_scores),
            'history': np.std(history_scores),
            'maths': np.std(maths_scores),

            



        },
        'Maximum':{
            'science': max(science_scores),
            'english': max(english_scores),
            'history': max(history_scores),
            'maths': max(maths_scores),

        }
    }
    
    stats_data = convert_int32_to_int(stats_data)
    
    return json.dumps(stats_data, default=json_default_handler)


if __name__ == '__main__':
    app.run(debug=True,port= 5000)
