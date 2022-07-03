# Air Pollution Analysis

## Extract, Transform, Load

Source:
* https://fingertips.phe.org.uk/profile/general-practice/data#page/0/gid/2000006/pat/167/par/E38000220/ati/7/iid/253/age/1/sex/4/cat/-1/ctp/-1/yrr/1/cid/4/tbm/1

APIs:
* https://openweathermap.org/api/air-pollution
* https://developers.google.com/maps/documentation/places/web-service/search

The initial steps for this analysis was to find all GP's in Birmingham using the Public Health Data. Using the .csv file from the website, it was possible to extract the GP lists from Birmingham and necessary asthma data. Using the GP names and parameters, the latitude and longitude were found for the majority of GPs using the Google Places API. The location data was then used in conjuction with the OpenWeatherMap Air Pollution API to find all the air pollution data over a year long time frane.

This data was then exported into two different .csv files. One .csv is for the gp list with location data and average air pollution data over a year and the other is hourly air pollution data for each gp location. These .csv files were then used and imported into pgAdmin, using load.py and queries.py files. This data was then prepared and put into a dictionary format in preparation for the dashboard visualisations. 

Unfortunately this data could not be used due to the level of precision given by the OpenWeatherMap API. The outputs from this API only gave 5 unique outputs from 100+ differeent calls due to the measurements being taken over larger areas than anticipated. This was found when creating the visualisations that meant not many conclusions could be made. So the data was then changed to nationwide gp areas.

This was extracted using web scraping, the gp list was extracted by taking the drop down lists. Then using iterations, it was possible to go through each gp area and take the asthma data required. After this the OpenWeatherMap API is used just like before the get the timed data. Then prepared, imported into the database and then a dictionary is created using the data in the exact same way as the Birmingham GP data.
