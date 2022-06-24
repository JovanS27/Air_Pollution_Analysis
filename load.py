import requests
import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database 
from queries import MY_QUERY
from config import postgresPass

GP_df = pd.read_csv("GP_data.csv", index_col=0)
Sample_df = pd.read_csv("Sample_data.csv", index_col=0)
# lets assume we have our data in a dataframe called GP_df

usr = 'postgres'
pwd = postgresPass
port = '5432'
db_name = 'test_db'

engine = create_engine(f'postgresql://{usr}:{pwd}@localhost:{port}/{db_name}')

if not database_exists(engine.url):
    print("Creating database...")
    create_database(engine.url)

print("Database exists?", database_exists(engine.url))

engine.execute(MY_QUERY)

try:
    GP_df.to_sql(name = 'GP', con = engine, if_exists='replace')
except Exception as e:
    print(e)

results = engine.execute("SELECT * FROM GP;")
for row in results:
    print(row)


