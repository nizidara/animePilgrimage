from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import contact

app = FastAPI()
app.include_router(contact.router)

origins = [
    "http://localhost:3000",
]



app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
async def hello():
    return {"message": "hello world!"}
