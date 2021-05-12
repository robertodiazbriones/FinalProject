from flask import Flask, request, redirect, url_for, flash, jsonify
import numpy as np
import pickle as p
import requests
import json

app = Flask(__name__)

@app.route("/", methods=["GET"])
def hello():
    return jsonify("Forecast number of bikes currently in use based on today's weather.")

@app.route("/api/", methods=["GET","POST"])
def api():

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
    
    return('{}'.format(current))


@app.route('/predict/', methods=["POST","GET"])
def makecalc():
    url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/washington%20d.c./today?unitGroup=us&key=4TL5LFAY3PFAMN97VCTQRXQHR&include=current"

    response = requests.get(url)
    response_json = response.json()
    
    data = api()
    prediction = model.predict(api())

    return (prediction)


if __name__ == '__main__':
    modelfile = 'model.pkl'
    model = p.load(open(modelfile, 'rb'))
    app.run(debug=True, host='0.0.0.0')