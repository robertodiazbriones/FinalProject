# FinalProject

Welcome to Capital Bike Sharing in Washington D.C. The goal of this project was to make an interactive predictions for bike usage, but machine learning model was not accurate enough to get a higher percentage. Our project contains several components. The end product was a website that contains dashboard, prediction tool, and tableau, which serves the data we collected and processed in the early stages of the project, into visualizations.

The finished product can be found at this address: https://robertodiazbriones.github.io/cbs_dashboard/templates/

If you want to inspect the dashboard code, you can find it at the following github repo:
https://github.com/robertodiazbriones/cbs_dashboard

The present repository contains mostly the code from the earlier stages of the project - the original data, the jupyter notebooks used to clean and manipulate the data, and the flask app used to serve the data out in JSON form.

Files and Folders:

FinalProject_WeatherData:Whith the initial data sets and how I tried to clean the data and merge it with the number of stations/trips

FinalProject_WeatherML:Where I tried to do some ML on the datasets with weather features and the total trips by station

CBS_trips_year:Where I took all the files from https://s3.amazonaws.com/capitalbikeshare-data/index.html,
merge them and get Station Number, Address and Location(ltg, lng) and total of trips per year

CBS_json:Where I build the json file that was used for the dashboard

Tableau Link: https://public.tableau.com/views/FinalProject_16207840572400/Dashboard1?:language=en&:display_count=y&publish=yes&:origin=viz_share_link

Weather_API: Jupyter Notebook and Data 

