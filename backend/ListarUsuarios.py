import boto3
from botocore.exceptions import BotoCoreError, ClientError

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('proyectcloud_users')

    try:
        response = table.scan()
    except BotoCoreError as e:
        print(e)
        return {
            'statusCode': 500,
            'body': 'Error al obtener los datos de la tabla'
        }

    users = response['Items']
    for user in users:
        user['foto'] = user['foto'].replace('s3://cloudprojectfinal2k23/', 'https://cloudprojectfinal2k23.s3.amazonaws.com/')

    return {
        'statusCode': 200,
        'body': users
    }
