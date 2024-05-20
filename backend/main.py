from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import contact, anime, place, comment, region, user
from properties.properties import origins

app = FastAPI(title="App")

app.include_router(contact.router)
app.include_router(region.router)
app.include_router(user.router)
app.include_router(anime.router)
app.include_router(place.router)
app.include_router(comment.router)

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
