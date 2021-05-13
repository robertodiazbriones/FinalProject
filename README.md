# FinalProject

Welcome to Capital Bike Sharing in Washington D.C! The goal of this project was to make interactive predictions for bike usage, but our machine learning model was not accurate enough. Our project contains several components. The end product was a website that contains a dashboard, a prediction tool, and Tableau, which serve the data we collected and processed in the early stages of the project, into visualizations.

The finished product can be found at this address: https://robertodiazbriones.github.io/cbs_dashboard/templates/.

If you want to inspect the dashboard code, you can find it at the following github repo:
https://github.com/robertodiazbriones/cbs_dashboard.

The present repository contains mostly the code from the earlier stages of the project - the original data, the jupyter notebooks used to clean and manipulate the data, and the flask app used to serve the data out in JSON form.

Files and Folders:

ForTableau.ipynb: This file was used to merge the 2011-2014 CSVs from Capital Bike Share together for Tableau to use in the 2 Tableau vizualizations.

FinalProject_WeatherData: This contains the initial data sets and how I tried to clean the data and merge it with the number of stations/trips.

FinalProject_WeatherML: where I tried to do some ML on the datasets with weather features and the total trips by station.

CBS_trips_year: Where I took all the files from https://s3.amazonaws.com/capitalbikeshare-data/index.html,
merged them and got Station Number, Address and Location(lat, lng) and total of trips per year.

CBS_json: Where I built the json file that was used for the dashboard.

Tableau Link: https://public.tableau.com/views/FinalProject_16207840572400/Dashboard1?:language=en&:display_count=y&publish=yes&:origin=viz_share_link

Weather_API: Merged data sets of weather and hours of the day. 

