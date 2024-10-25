import bcrypt
from jose import jwt
from datetime import datetime, timedelta, timezone

from properties.properties import secret_key, algorithm, access_token_expire_minutes, refresh_token_expire_days

# convert to hash
async def hash_password(plain_password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(plain_password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

# compare password
async def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# decode token
async def decode_token(token: str) -> dict:
    return jwt.decode(token, secret_key, algorithms=[algorithm])

# create access token
async def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=int(access_token_expire_minutes)))
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)

    return encoded_jwt

# create refresh token
async def create_refresh_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(days=int(refresh_token_expire_days)))
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)
    return encoded_jwt