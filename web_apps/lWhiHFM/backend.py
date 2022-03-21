from dataiku.customwebapp import *

# Access the parameters that end-users filled in using webapp config
# For example, for a parameter called "input_dataset"
# input_dataset = get_webapp_config()["input_dataset"]

import dataiku
import pandas as pd
import random
import json
import requests



# Example:
# From JavaScript, you can access the defined endpoints using
# getWebAppBackendUrl('first_api_call')

@app.route('/get_predictions/<path:params>')
def get_predictions(params):
    variables_dict = json.loads(params)
    print(variables_dict)
    prediction = random.randint(0,100)
    
    features = {"features":{}}
    features["features"]["purchase_amount"] = variables_dict['amount']
    features["features"]["signature_provided"] = variables_dict['signature']
    features["features"]["merchant_subsector_description"] = variables_dict['subsector']
    features["features"]["merchant_state"] = variables_dict['state']
    r = requests.post(variables_dict['endpoint_url'].replace('http:/','http://').replace('https:/','https://'),data = json.dumps(features))
    prediction_dict = json.loads(r.text)
    print(r.status_code)
    prediction = int(prediction_dict.get('result').get('probas').get('0')*100)
    
    if prediction <20:
        level = "Low"
    elif prediction <60:
        level = "Medium"
    else :
        level = "High"
    
    return json.dumps({"prediction":prediction, "risk":level, "raw":json.dumps(prediction_dict)})