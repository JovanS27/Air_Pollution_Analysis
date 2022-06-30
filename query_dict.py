from sqlalchemy import create_engine
from config import postgresPass
import numpy as np

usr = 'postgres'
pwd = postgresPass
port = '5432'
db_name = 'birmingham_air_pollution'

engine = create_engine(f'postgresql://{usr}:{pwd}@localhost:{port}/{db_name}')

gp_practice = engine.execute("SELECT * FROM gp_practice;")

QUERY="""SELECT * FROM air_pollution_data
    WHERE date >= 1622502000 and date <= 1623106800;
"""
air_pollution = engine.execute(QUERY)

national_gp=engine.execute("SELECT * FROM national_gp;")


names=[]
metadata=[]
for i in gp_practice:
    names.append(i[1])
    metadata.append({'id':i[0],'gp':i[1],'lat':i[2],'lon':i[3],'asthma_percentage':i[4],'aqi':i[5],'co':i[6],'no':i[7],'no2':i[8],'o3':i[9],'so2':i[10],'pm2_5':i[11],'pm10':i[12],'nh3':i[13]})
    print(i)
    
gp_practice_dict={'gp':names,'metadata':metadata}
    
names=[]
times=[]
metadata=[]
for i in air_pollution:
    names.append(i[11])
    times.append(i[1])
    metadata.append({'id':i[0],'time':i[1],'aqi':i[2],'co':i[3],'no':i[4],'no2':i[5],'o3':i[6],'so2':i[7],'nh3':i[8],'pm2_5':i[9],'pm10':i[10],'gp':i[11]})

names=np.unique(names)
times=np.unique(times)

air_pollution_data={'gp':names,'date_time':times,'metadata':metadata}

names=[]
metadata=[]
for i in national_gp:
    names.append(i[1])
    metadata.append({'id':i[0],'gp':i[1],'lat':i[2],'lon':i[3],'asthma_percentage':i[4],'aqi':i[5],'co':i[6],'no':i[7],'no2':i[8],'o3':i[9],'so2':i[10],'pm2_5':i[11],'pm10':i[12],'nh3':i[13]})
    print(i)
    
national_gp_dict={'gp':names,'metadata':metadata}


