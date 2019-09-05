from flask import Flask, render_template

application = Flask('myApp')

@application.route('/')
def start():
    return render_template('start.html')

@application.route('/index')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    application.run(debug=False, port=8080, host='0.0.0.0')
