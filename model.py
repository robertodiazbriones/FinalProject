import numpy as np

import pandas as pd

from datetime import date

def linregression(data):

    data['dayofyear']=(data['dteday']-

        data['dteday'].apply(lambda x: date(x.year,1,1))

        .astype('datetime64[ns]')).apply(lambda x: x.days)

    X = np.array(data[['dayofyear','hr','temp','hum','cnt']])

    return X