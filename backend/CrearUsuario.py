import json
import boto3
import base64
from botocore.exceptions import NoCredentialsError

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    username = event['username']
    bucket_name = 'cloudprojectfinal2k23'
    folder = f'{username}/'
    table = dynamodb.Table('proyectcloud_users')

    try:
        # Si hay una foto, guárdala en S3
        if 'foto' in event and event['foto'] is not None:
            foto = event['foto']
            # Elimina el encabezado de la cadena base64
            base64_string = foto.split(",")[1]
            # Decodifica la cadena base64
            foto_data = base64.b64decode(base64_string)
            s3.put_object(Bucket=bucket_name, Key=folder + 'foto_perfil.jpg', Body=foto_data)
            print("Successfully uploaded photo to S3")

        table.put_item(
           Item={
                'user_id': username,
                'nombre': event['nombre'],
                'apellido': event['apellido'],
                'edad': event['edad'],
                'nacimiento': event['nacimiento'],
                'foto': f's3://{bucket_name}/{folder}foto_perfil.jpg'
            }
        )
        print("Successfully inserted the item in DynamoDB")
    except NoCredentialsError:
        print("Credentials not available")

    return {
        'statusCode': 200,
        'body': json.dumps('Usuario creado exitosamente!')
    }