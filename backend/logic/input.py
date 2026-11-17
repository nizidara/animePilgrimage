import uuid
from fastapi import HTTPException


# This function is used to normalize the line breaks in the input text. It replaces all the different types of line breaks with the Unix line break "\n".
def normalize_break(input: str) -> str:
    return input.replace("\r\n", "\n").replace("\r", "\n")

# Convert a UUID string (path, query or body value) to the bytes stored in the DB. An invalid value is a client error (422), not a server error.
def uuid_to_bytes(value: str) -> bytes:
    try:
        return uuid.UUID(value).bytes
    except (ValueError, AttributeError, TypeError):
        raise HTTPException(status_code=422, detail="Invalid ID format")
