import httpx

def get_weather_data(latitude: float, longitude: float):
    response = httpx.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature,rain,weathercode")
    return response.json()

def get_forecast_data(latitude: float, longitude: float):
    response = httpx.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&daily=temperature_2m_min,temperature_2m_max,rain_sum,weather_code")
    return response.json()
