import json
import boto3
from botocore.exceptions import NoCredentialsError

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # Extract the first record from the event
    record = event['Records'][0]
    # Extract the body of the message
    sns_message_str = record['body']
    # Parse the JSON string
    sns_message = json.loads(sns_message_str)
    # Extract the actual message content
    user_data_str = sns_message['Message']
    # Parse the JSON string
    user_data = json.loads(user_data_str)

    username = user_data['user_id']
    table = dynamodb.Table('proyectcloud_users')

    try:
        table.put_item(Item=user_data)
        print("Successfully inserted the item in DynamoDB")

    except NoCredentialsError:
        print("Credentials not available")

    return {
        'statusCode': 200,
        'body': json.dumps('Usuario creado exitosamente!')
    }