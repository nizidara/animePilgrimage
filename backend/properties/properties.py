import os
from dotenv import load_dotenv

# from pathlib import Path

# import .env file
load_dotenv()

#DB setting
user = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST')
database = os.getenv('DB_NAME')

DB_URL = f"mysql+pymysql://{user}:{password}@{host}/{database}?charset=utf8mb4"

#frontend setting(dev)
origins = [
    "http://localhost:3000",
]

# image setting(local)
# local_base_path = os.getenv('LOCAL_BASE_PATH')
# base_path = Path(local_base_path)  # base path
# upload_directory = Path("uploads/images/")  # image directory path
# icon_directory = Path("uploads/icons/") # icon directory path
# anime_photo_directory = Path("uploads/anime/")  # anime image directory path

# image setting(AWS S3)
aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID')
aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
region_name='ap-northeast-1'
bucket_name='animepilgrimage-images'

# jwt setting
secret_key = os.getenv('SECRET_KEY')
algorithm = os.getenv('ALGORITHM')
access_token_expire_minutes = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')
refresh_token_expire_days = os.getenv('REFRESH_TOKEN_EXPIRE_DAYS')

# cookie setting(dev)
samesite = os.getenv('SAMESITE')

# mail setting
sender_email = os.getenv('SENDER_EMAIL')
sender_password = os.getenv('SENDER_PASSWORD')
recipient_email = os.getenv('RECIPIENT_EMAIL')
email_server = os.getenv('EMAIL_SERVER')