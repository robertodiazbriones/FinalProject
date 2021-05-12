import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pickle

data = pd.read_csv('Data/merged.csv')

X = data[['temp','humidity','precip','feelslike']]
y = data['casual'].values.reshape(-1, 1)

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)

from sklearn.linear_model import LinearRegression
weather = LinearRegression()

weather.fit(X_train, y_train)
training_score = weather.score(X_train, y_train)
testing_score = weather.score(X_test, y_test)

print(f"Training Score: {training_score}")
print(f"Testing Score: {testing_score}")

pickle.dump(weather, open('model.pkl','wb'))