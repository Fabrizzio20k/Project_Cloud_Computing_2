import boto3
import json
import base64
from botocore.exceptions import NoCredentialsError
from datetime import datetime

def lambda_handler(event, context):
    client = boto3.client('textract')

    # Eliminar los metadatos de la imagen
    base64_image = event['image'].split(',')[1]
    image = base64.b64decode(base64_image)

    response = client.detect_document_text(Document={'Bytes': image})

    text_detected = ''

    for item in response["Blocks"]:
        if item["BlockType"] == "LINE":
            text_detected += item["Text"] + "\n"

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('proyectcloud_extracttext')

    # Obtener la fecha y hora actual
    now = datetime.now()
    
    table.put_item(
       Item={
            'user_id': event['username'],
            'timestamp': now.strftime("%Y-%m-%d %H:%M:%S"),
            'text': text_detected
        }
    )


    return {
        'statusCode': 200,
        'body': json.dumps(text_detected)
    }
