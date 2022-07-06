# Air Pollution Analysis

## Extract, Transform and Load

Source:
* https://fingertips.phe.org.uk/profile/general-practice/data#page/0/gid/2000006/pat/167/par/E38000220/ati/7/iid/253/age/1/sex/4/cat/-1/ctp/-1/yrr/1/cid/4/tbm/1

APIs:
* https://openweathermap.org/api/air-pollution
* https://developers.google.com/maps/documentation/places/web-service/search

The initial steps for this analysis was to find all GP's in Birmingham using the Public Health Data. Using the .csv file from the website, it was possible to extract the GP lists from Birmingham and necessary asthma data. Using the GP names and parameters, the latitude and longitude were found for the majority of GPs using the Google Places API. The location data was then used in conjuction with the OpenWeatherMap Air Pollution API to find all the air pollution data over a year long time frane.

This data was then exported into two different .csv files. One .csv is for the gp list with location data and average air pollution data over a year and the other is hourly air pollution data for each gp location. These .csv files were then used and imported into pgAdmin, using load.py and queries.py files. This data was then prepared and put into a dictionary format in preparation for the dashboard visualisations. 

Unfortunately this data could not be used due to the level of precision given by the OpenWeatherMap API. The outputs from this API only gave 5 unique outputs from 100+ differeent calls due to the measurements being taken over larger areas than anticipated. This was found when creating the visualisations that meant not many conclusions could be made. So the data was then changed to nationwide gp areas.

This was extracted using web scraping, the gp list was extracted by taking the drop down lists. Then using iterations, it was possible to go through each gp area and take the asthma data required. After this the OpenWeatherMap API is used just like before the get the timed data. Then prepared, imported into the database and then a dictionary is created using the data in the exact same way as the Birmingham GP data.


## Visualisations and Dashboard
### Visualisations

The dataset that we had now compiled had several dimensions to it:
•	several different measures of air quality
•	Geographic
•	Time (granular to individual hours)
As stated previously, when we looked just at Birmingham GPs, we found that although our time data was just as fluid and dynamic as we had hoped, there was not enough variation in the geographic data. I had hoped (foolishly) for data down to street level, but clearly this was a fantasy. So we cycled back and drew broader data at a national level, which we then re-imported and visualised. Thus our production process was cyclical rather than linear; 

In order to best represent the data, we created a time series graph that represented the different measures of air quality and represented the national picture via a drop-down box. This enables the user to select which part of Birmingham they would like to investigate and view detailed information about each part. This would be represented by individual GP surgeries, as it was these that provided the local data.  Different pollutants can be selected or isolated, and the time range and be reduced to whatever timeframe is preferred.

In order to investigate the causes of asthma, we generated a scatter plot that represents asthma prevalence on the y axis, and a selectable pollutant on the x axis. With this flexibility the user can cycle through pollutants and see which ones are most or least connected or correlated with asthma. This scatter plot is also augmented by two violin plots, that represent just the shape of each axis of data, allowing the national variation in these variables to be analysed in isolation.

In order to see the national distribution of asthma, the dashboard also features a zoomable heatmap. This is not tied to time data, although having an heatmap that animates over time data could be an idea for a future project.

Each visualisation provides clues and interesting aspects that can be used to inform each of the others. For instance, seeing that the national picture has a particularly high cluster around the northwest might inform how you interpret the data from the scatter diagram.

The visualisations on the page are drawn in plotly, with an externally-rendered leaflet heatmap in an iframe (visible online at https://github.com/grilgamesh/AQI_heatmap.git, https://grilgamesh.github.io/AQI_heatmap/)

## The Story/Conclusion
The Northwest of England - around Lancashire - is the largest hotspot for asthma.

Ozone (O3) seems to correlate with asthma prevalence particularly, while some other pollutants seem to have a slight negative correlation.

Air quality fluctuates widely on an hour by hour basis, and the reasoning isn’t always clear.

Caveats:
The appearance of the heat map changes as we tuned it for blur and radius - this could possibly lead to misleading results.

We have only taken about a year of air quality data, compared with a very long-term data that is percentage of asthma sufferers; this could potentially 
weaken the link between the datasets we joined.

## Running the app on your computer.
If you want to interact with the application yourself, please follow these instructions.
After cloning this repo, you must run several files in the correct order:

1: run the WebScrape.ipynb file in jupyter notebook, ensuring that it completes (you may need to maximise the chrome window that opens in order for this to succeed; even then it may take several goes. keep trying and eventually it will work);
2: run load.py to create the database;
3: run app.py to launch the flask application. 

The application should then be running at address given in the terminal. 

