""" import os
import pandas as pd
from pymongo import MongoClient
import time

# MongoDB Connection.
mongodb_uri = os.getenv('MONGODB_URI')
client = MongoClient(mongodb_uri)
db = client['sensordummy']
collection = db['boxes']

# Check the box Name
while True:
    blocks = ['A_Block', 'B_Block', 'C_Block', 'D_Block', 'Starbucks']

    for block in blocks:
        cursor = collection.find({'name': block})
        data = list(cursor)
        data_df = pd.DataFrame(data)

        processed_fields = []
        for field in range(1, 9):
            field_data = {}
            for index, row in data_df.iterrows():
                field_entries = [entry for entry in row['fields'] if entry['fieldId'] == field]
                if len(field_entries) == 0:
                    continue
                field_entry = field_entries[0]

                if 'data' not in field_entry or 'raw' not in field_entry['data']:
                    continue

                field_data['fieldId'] = field_entry['fieldId']

                raw_data = field_entry['data']['raw']
                field_data['raw'] = raw_data

                processed_values = []
                processed_timestamps = []


                # Data Analyze for 1m Row
                for i in range(2, len(raw_data), 3):
                    avg_value = sum([raw_data[j]['value'] for j in range(i - 2, i + 1)]) / 3
                    processed_values.append(avg_value)
                    processed_timestamps.append(raw_data[i]['timestamp'])
                field_data['1m'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 5m Row
                processed_values = []
                processed_timestamps = []
                for i in range(4, len(field_data['1m']), 5):
                    avg_value = sum([field_data['1m'][j]['value'] for j in range(i - 4, i + 1)]) / 5
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['1m'][i]['timestamp'])
                field_data['5m'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 30m Row
                processed_values = []
                processed_timestamps = []
                for i in range(5, len(field_data['5m']), 6):
                    avg_value = sum([field_data['5m'][j]['value'] for j in range(i - 5, i + 1)]) / 6
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['5m'][i]['timestamp'])
                field_data['30m'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 1h Row
                processed_values = []
                processed_timestamps = []
                for i in range(1, len(field_data['30m']), 2):
                    avg_value = sum([field_data['30m'][j]['value'] for j in range(i - 1, i + 1)]) / 2
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['30m'][i]['timestamp'])
                field_data['1h'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 12h Row
                processed_values = []
                processed_timestamps = []
                for i in range(11, len(field_data['1h']), 12):
                    avg_value = sum([field_data['1h'][j]['value'] for j in range(i - 11, i + 1)]) / 12
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['1h'][i]['timestamp'])
                field_data['12h'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 1d Row
                processed_values = []
                processed_timestamps = []
                for i in range(1, len(field_data['12h']), 12):
                    avg_value = sum([field_data['12h'][j]['value'] for j in range(i - 1, i + 1)]) / 2
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['12h'][i]['timestamp'])
                field_data['1d'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 1w Row
                processed_values = []
                processed_timestamps = []
                for i in range(6, len(field_data['1d']), 7):
                    avg_value = sum([field_data['1d'][j]['value'] for j in range(i - 6, i + 1)]) / 7
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['1d'][i]['timestamp'])
                field_data['1w'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Update the rows.
                collection.update_one(
                    {'name': block, 'fields.fieldId': field},
                    {'$set': {'fields.$[elem]': field_data}},
                    array_filters=[{'elem.fieldId': field}]
                )
    time.sleep(20) """

import os
import pandas as pd
from pymongo import MongoClient
import time

# MongoDB Connection.
mongodb_uri = os.getenv('MONGODB_URI')
client = MongoClient(mongodb_uri)
db = client['sensordummy']
collection = db['boxes']


while True:
    blocks = ['D_Block','B_Block','C_Block','A_Block','Starbucks']

    for block in blocks:
        cursor = collection.find({'name': block})
        data = list(cursor)
        data_df = pd.DataFrame(data)

        for index, row in data_df.iterrows():
            field_entries = row['fields']
            field_data = {}

            for entry in field_entries:
                field_id = entry['field']
                if 'data' not in entry or 'raw' not in entry['data']:
                    continue

                field_data['field'] = field_id

                raw_data = entry['data']['raw']
                field_data['raw'] = raw_data

                processed_values = []
                processed_timestamps = []

                # Data Analyze for 1m Row
                for i in range(2, len(raw_data), 3):
                    avg_value = sum([raw_data[j]['value'] for j in range(i - 2, i + 1)]) / 3
                    processed_values.append(avg_value)
                    processed_timestamps.append(raw_data[i]['timestamp'])
                field_data['1m'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 5m Row
                processed_values = []
                processed_timestamps = []
                for i in range(4, len(field_data['1m']), 5):
                    avg_value = sum([field_data['1m'][j]['value'] for j in range(i - 4, i + 1)]) / 5
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['1m'][i]['timestamp'])
                field_data['5m'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 30m Row
                processed_values = []
                processed_timestamps = []
                for i in range(5, len(field_data['5m']), 6):
                    avg_value = sum([field_data['5m'][j]['value'] for j in range(i - 5, i + 1)]) / 6
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['5m'][i]['timestamp'])
                field_data['30m'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 1h Row
                processed_values = []
                processed_timestamps = []
                for i in range(1, len(field_data['30m']), 2):
                    avg_value = sum([field_data['30m'][j]['value'] for j in range(i - 1, i + 1)]) / 2
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['30m'][i]['timestamp'])
                field_data['1h'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 12h Row
                processed_values = []
                processed_timestamps = []
                for i in range(11, len(field_data['1h']), 12):
                    avg_value = sum([field_data['1h'][j]['value'] for j in range(i - 11, i + 1)]) / 12
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['1h'][i]['timestamp'])
                field_data['12h'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 1d Row
                processed_values = []
                processed_timestamps = []
                for i in range(1, len(field_data['12h']), 12):
                    avg_value = sum([field_data['12h'][j]['value'] for j in range(i - 1, i + 1)]) / 2
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['12h'][i]['timestamp'])
                field_data['1d'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Data Analyze for 1w Row
                processed_values = []
                processed_timestamps = []
                for i in range(6, len(field_data['1d']), 7):
                    avg_value = sum([field_data['1d'][j]['value'] for j in range(i - 6, i + 1)]) / 7
                    processed_values.append(avg_value)
                    processed_timestamps.append(field_data['1d'][i]['timestamp'])
                field_data['1w'] = [{'timestamp': ts, 'value': val} for ts, val in zip(processed_timestamps, processed_values)]

                # Update the rows.
                collection.update_one(
                    {'name': block, 'fields.field': field_id},
                    {'$set': {'fields.$[elem].data': field_data}},
                    array_filters=[{'elem.field': field_id}]
                )

    time.sleep(20)
















