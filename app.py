from flask import render_template
from flask import Flask
from sqlalchemy import create_engine
import flask_cors
from config import postgresPass
import numpy as np
import json


app = Flask(__name__)


usr = 'postgres'
pwd = postgresPass
port = '5432'
db_name = 'birmingham_air_pollution'

engine = create_engine(f'postgresql://{usr}:{pwd}@localhost:{port}/{db_name}')


# retrieve data from database
gp_practice = engine.execute("SELECT * FROM gp_practice;")

QUERY="""SELECT * FROM air_pollution_data
    WHERE date >= 1622502000 and date <= 1654034400;
"""
air_pollution = engine.execute(QUERY)


national_gp=engine.execute("SELECT * FROM national_gp;")

# national air pollution
NATIONAL_QUERY="""SELECT * FROM national_air_pollution
    WHERE date >= 1622502000 and date <= 1623106800;
"""
national_air_pollution = engine.execute(NATIONAL_QUERY)


# creates dictionary for GP practise data
names=[]
metadata=[]
for i in gp_practice:
    names.append(i[1])
    metadata.append({'id':i[0],'gp':i[1],'lat':i[2],'lon':i[3],'asthma_percentage':i[4],'aqi':i[5],'co':i[6],'no':i[7],'no2':i[8],'o3':i[9],'so2':i[10],'pm2_5':i[11],'pm10':i[12],'nh3':i[13]})

    
gp_practice_dict={'gp':names,'metadata':metadata}

# creates dictionary for air pollution data for 1 week time-span
names=[]
times=[]
metadata=[]
for i in air_pollution:
    names.append(i[11])
    times.append(i[1])
    metadata.append({'id':i[0],'time':i[1],'aqi':i[2],'co':i[3],'no':i[4],'no2':i[5],'o3':i[6],'so2':i[7],'nh3':i[8],'pm2_5':i[9],'pm10':i[10],'gp':i[11]})

names=np.unique(names).tolist()
times=np.unique(times).tolist()

air_pollution_data={'gp':names,'date_time':times,'metadata':metadata}


names=[]
metadata=[]
for i in national_gp:
    names.append(i[1])
    metadata.append({'id':i[0],'gp':i[1],'lat':i[2],'lon':i[3],'asthma_percentage':i[4],'aqi':i[5],'co':i[6],'no':i[7],'no2':i[8],'o3':i[9],'so2':i[10],'pm2_5':i[11],'pm10':i[12],'nh3':i[13]})
    
    
national_gp_dict={'gp':names,'metadata':metadata}

# national air pollution
names=[]
times=[]
metadata=[]
for i in national_air_pollution:
    names.append(i[11])
    times.append(i[1])
    metadata.append({'id':i[0],'time':i[1],'aqi':i[2],'co':i[3],'no':i[4],'no2':i[5],'o3':i[6],'so2':i[7],'nh3':i[8],'pm2_5':i[9],'pm10':i[10],'gp':i[11]})
    print(i)

names=np.unique(names).tolist()
times=np.unique(times).tolist()

national_air_pollution_data={'gp':names,'date_time':times,'metadata':metadata}


# create json file, to export to seperate heatmap website
jsonString = json.dumps(national_gp_dict)
jsonFile = open("national_gp_dict.json", "w")
jsonFile.write(jsonString)
jsonFile.close()

@app.route('/')
def main():

    # # Dummy data for testing follows:
    # results = [{'id': 0, 'GP name': 'Acocks Green', 'lat': 52.4, 'lon': -1.3, 'airqual': 1, 'asthma': 6.6},
    #             {'id': 1, 'GP name': 'university', 'lat': 52.3, 'lon': -1.5, 'airqual': 5, 'asthma': 5.6},
    #             {'id': 2, 'GP name': 'poplar road', 'lat': 52.35, 'lon': -1.6, 'airqual': 3, 'asthma': 3.6}]


    return render_template('index.html', data0 = national_gp_dict, data1 = gp_practice_dict, data2 = air_pollution_data, data3 = national_air_pollution_data)

# @app.route('/heatmap')
# def heatmap():
#     return render_template('heatmap.html')

if __name__ == "__main__":
    app.run(debug=True)

