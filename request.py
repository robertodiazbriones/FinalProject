import requests

url = 'http://localhost:5000/results'
response = requests.post(url,json={'Time':5, 'Temp':60})

print(r.json())


#pd.read_csv('Data/merged.csv')


data = pd.read_csv('Data/merged.csv')
j_data = json.dumps(data)
headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
r = requests.post(url, data=j_data, headers=headers)
print(r, r.text)