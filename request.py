import requests
import json

url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/washington%20d.c./today?unitGroup=us&key=4TL5LFAY3PFAMN97VCTQRXQHR&include=current"

response = requests.get(url)
response_json = response.json()

temp = response_json['currentConditions']['temp']
hum = response_json['currentConditions']['humidity']
precip = response_json['currentConditions']['precip']
feels = response_json['currentConditions']['feelslike']
current = (temp,hum,precip,feels)

print(f"Temperature: {temp} F")
print(f"Humidity: {hum}%")
print(f"Precipitation: {precip}")
print(f"Feels Like: {feels} F")
