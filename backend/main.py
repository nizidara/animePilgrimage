from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import contact, anime, place
from properties.properties import origins

app = FastAPI()
app.include_router(contact.router)
app.include_router(anime.router)
app.include_router(place.router)


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
