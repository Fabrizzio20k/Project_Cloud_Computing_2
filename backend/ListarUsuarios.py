import boto3
from botocore.exceptions import BotoCoreError, ClientError

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    users_table = dynamodb.Table('proyectcloud_users')
    extract_table = dynamodb.Table('proyectcloud_extracttext')

    try:
        response = users_table.scan()
    except BotoCoreError as e:
        print(e)
        return {
            'statusCode': 500,
            'body': 'Error al obtener los datos de la tabla'
        }

    users = response['Items']
    for user in users:
        user['foto'] = user['foto'].replace('s3://cloudprojectfinal2k23/', 'https://cloudprojectfinal2k23.s3.amazonaws.com/')
        
        # Obtener el historial de extracciones de texto del usuario
        try:
            response = extract_table.query(
                KeyConditionExpression=boto3.dynamodb.conditions.Key('user_id').eq(user['user_id'])
            )
        except BotoCoreError as e:
            print(e)
            return {
                'statusCode': 500,
                'body': 'Error al obtener los datos de la tabla'
            }
        
        # Agregar el historial de extracciones de texto al usuario
        user['extract_history'] = response['Items']

    return {
        'statusCode': 200,
        'body': users
    }
