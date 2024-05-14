from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def good_luck():
    return {
        "Good": "Luck!",
    }
