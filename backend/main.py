from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import contact, anime, place
from properties.properties import origins

app = FastAPI(title="App")
anime_app = FastAPI(title="App(/anime)")

app.include_router(contact.router)
anime_app.include_router(anime.router)
app.include_router(place.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

anime_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
async def hello():
    return {"message": "hello world!"}

app.mount("/anime", anime_app)
APP_PATH_LIST = ["", "/anime"]

# Swagger間のリンクを作成
def _make_app_docs_link_html(app_path: str, app_path_list: list[str]) -> str:
    """swaggerの上部に表示する各Appへのリンクを生成する"""
    descriptions = [
        f"<a href='{path}/docs'>{path}/docs</a>" if path != app_path else f"{path}/docs"
        for path in app_path_list
    ]
    descriptions.insert(0, "Apps link")
    return "<br>".join(descriptions)

app.description = _make_app_docs_link_html("", APP_PATH_LIST)
anime_app.description = _make_app_docs_link_html("/anime", APP_PATH_LIST)