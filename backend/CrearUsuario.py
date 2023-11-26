import json
import boto3
import base64
from botocore.exceptions import NoCredentialsError

s3 = boto3.client('s3')

# Create an SNS client
sns = boto3.client('sns')

def lambda_handler(event, context):
    username = event['username']
    bucket_name = 'cloudprojectfinal2k23'
    folder = f'{username}/'

    try:
        # If there is a photo, save it in S3
        if 'foto' in event and event['foto'] is not None:
            foto = event['foto']
            # Remove the header from the base64 string
            base64_string = foto.split(",")[1]
            # Decode the base64 string
            foto_data = base64.b64decode(base64_string)
            s3.put_object(Bucket=bucket_name, Key=folder + 'foto_perfil.jpg', Body=foto_data)
            print("Successfully uploaded photo to S3")

        user_data = {
            'user_id': username,
            'nombre': event['nombre'],
            'apellido': event['apellido'],
            'edad': event['edad'],
            'nacimiento': event['nacimiento'],
            'foto': f's3://{bucket_name}/{folder}foto_perfil.jpg'
        }

        # Publish a message to the SNS topic
        message = json.dumps(user_data, indent=4)  # Pretty print the user's data
        response = sns.publish(
            TopicArn='arn:aws:sns:us-east-1:147071116304:ProyectoCloud_Registros',    
            Message=message,
            Subject='New User Notification'
        )
        print("Successfully published message to SNS topic")

    except NoCredentialsError:
        print("Credentials not available")

    return {
        'statusCode': 200,
        'body': json.dumps('Usuario creado exitosamente!')
    }
