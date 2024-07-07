import os
from dotenv import load_dotenv

# import .env file
load_dotenv()

#DB setting
user = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST')
database = os.getenv('DB_NAME')

DB_URL = f"mysql+pymysql://{user}:{password}@{host}/{database}?charset=utf8"

#frontend setting
origins = [
    "http://localhost:3000",
]