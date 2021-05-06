app = Flask(__name__)

@app.route('/api/makecalc/', methods=['POST'])

def homepage():
    response = requests.get(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/washington%20d.c./today?unitGroup=us&key=7BYNR7A5VCRX7G6DT9KHFR4QR&include=current")

    return render_template('index.html', data=json.loads(r.text)['cnt'])

if __name__ == '__main__':
    app.run(debug=True)