import os
from dotenv import load_dotenv

from pathlib import Path

# import .env file
load_dotenv()

#DB setting
user = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST')
database = os.getenv('DB_NAME')

DB_URL = f"mysql+pymysql://{user}:{password}@{host}/{database}?charset=utf8"

#frontend setting(dev)
origins = [
    "http://localhost:3000",
]

#image setting(dev)
local_base_path = os.getenv('LOCAL_BASE_PATH')

base_path = Path(local_base_path)  # base path
upload_directory = Path("uploads/images/")  # image directory path
icon_directory = Path("uploads/icons/") # icon directory path