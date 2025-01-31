from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from routers import contact, anime, place, comment, region, user, photo
from properties.properties import origins, env

if env == "production":
    app = FastAPI(docs_url=None, redoc_url=None, title="App")
else:
    app = FastAPI(title="App")

# Initialize the limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.include_router(anime.router)
app.include_router(place.router)
app.include_router(comment.router)
app.include_router(photo.router)
app.include_router(region.router)
app.include_router(contact.router)
app.include_router(user.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
@limiter.limit("30/minute")
async def hello(request: Request):
    return {"message": "hello world!"}
