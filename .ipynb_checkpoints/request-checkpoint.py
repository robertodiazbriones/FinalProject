import requests

url = 'http://localhost:5000/results'
response = requests.post(url,json={'Time':5, 'Temp':60})

print(r.json())