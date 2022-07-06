# -*- coding: utf-8 -*-
import dataiku
import pandas as pd, numpy as np
from dataiku import pandasutils as pdu

# Read recipe inputs
transactions_reward_value_by_card_id_prepared = dataiku.Dataset("transactions_reward_value_by_card_id_prepared")
transactions_reward_value_by_card_id_prepared_df = transactions_reward_value_by_card_id_prepared.get_dataframe()


# Compute recipe outputs from inputs
# TODO: Replace this part by your actual code that computes the output, as a Pandas dataframe
# NB: DSS also supports other kinds of APIs for reading and writing data. Please see doc.

to_delete_df = transactions_reward_value_by_card_id_prepared_df # For this sample code, simply copy input to output


# Write recipe outputs
to_delete = dataiku.Dataset("to_delete")
to_delete.write_with_schema(to_delete_df)
