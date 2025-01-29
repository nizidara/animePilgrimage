import re
import boto3
from botocore.exceptions import NoCredentialsError

from properties.properties import aws_access_key_id, aws_secret_access_key, region_name, bucket_name

s3_client = boto3.client(
    's3', 
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)

def upload_file_to_s3(file, s3_path):
    try:
        s3_client.upload_fileobj(file, bucket_name, s3_path, ExtraArgs={'ACL': 'public-read'})
        # 画像がアップロードされたURLを返す
        return f"https://{bucket_name}.s3.amazonaws.com/{s3_path}"
    except NoCredentialsError:
        raise Exception("Credentials not available")
    except Exception as e:
        raise Exception(f"Error uploading to S3: {str(e)}")
    
def delete_file_from_s3(s3_url):
    try:
        s3_path = re.sub(r"^https?://[^/]+/", "", s3_url)

        s3_client.delete_object(Bucket=bucket_name, Key=s3_path)
    except NoCredentialsError:
        raise Exception("Credentials not available")
    except Exception as e:
        raise Exception(f"Error deleting from S3: {str(e)}")