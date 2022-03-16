import dataiku 
from dataiku.scenario import Scenario

model_id = "5BubfwJq" # change this to your model id, look in your browser URL
scenario = Scenario()

def get_active_model_auc():
    saved_model = dataiku.Model(model_id)
    for model in saved_model.list_versions():
        if model['active']:
            model_score = model['snippet']['auc']
            version_id = model['versionId'] 
    return version_id, model_score

# get active model id and version 
past_version_id, past_model_score = get_active_model_auc()

# retrain model (this will activate it by default)
scenario.train_model(model_id)

# get newly activated model id and version
new_version_id, new_model_score = get_active_model_auc()

if new_model_score < past_model_score:
    # if new model performance worse, reactivate previous version
    dataiku.Model(model_id).activate_version(past_version_id)
