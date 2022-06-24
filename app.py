import flask_cors
from flask import render_template
from flask import Flask

app = Flask(__name__)


usr = 'postgres'
pwd = 'postgres'
port = '5432'
db_name = 'test_db'

engine = create_engine(f'postgresql://{usr}:{pwd}@localhost:{port}/{db_name}')



@app.route('/')
def main():

    # results = engine.execute("SELECT * FROM Persons;")
    results = {'data': [1,2,3,4], 'data2': [5,6,7,8]}

    return render_template('index.html', data = results)