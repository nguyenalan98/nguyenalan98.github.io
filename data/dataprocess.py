import heapq as hq
import csv
import json

TOP_COUNTRIES = ['France', 'Italy', 'US', 'Spain', 'Argentina', 'Australia', 'Germany', 'South Africa', 'Chile', 'Portugal']

def buildObjects():
    winemag_data = {}
    consumption_data = {}
    happiness_data = {}
    objects ={}

    for country in TOP_COUNTRIES: # Seed desired countries
        winemag_data[country] = {}
        consumption_data[country] = {}
        happiness_data[country] = {}
        objects[country] = {}

    with open('./data/winemag-data_first150k.csv') as first150k: # grab rating data from first set
        winemag_reader = csv.reader(first150k)
        for row in winemag_reader:
            country = row[1]
            rating = int(row[4])
            varietal = row[9]
            if country in winemag_data:
                if not varietal in winemag_data[country]:
                    winemag_data[country][varietal] = {'count':1, 'rating':rating}
                else:
                    winemag_data[country][varietal]['count'] += 1
                    winemag_data[country][varietal]['rating'] += rating

    with open('./data/winemag-data-130k-v2.csv') as wd130kv2: # grab rating data from 2nd set
        winemag_reader = csv.reader(wd130kv2)
        for row in winemag_reader:
            country = row[1]
            rating = int(row[4])
            varietal = row[9]
            if country in winemag_data and varietal:
                if not varietal in winemag_data[country]:
                    winemag_data[country][varietal] = {'count':1, 'rating':rating}
                else:
                    winemag_data[country][varietal]['count'] += 1
                    winemag_data[country][varietal]['rating'] += rating
    for country in winemag_data: # find average rating
        for varietal in winemag_data[country]:
            winemag_data[country][varietal] = winemag_data[country][varietal]['rating']/winemag_data[country][varietal]['count']

    with open('./data/drinks_csv.csv') as drinks: # grab consumption data
       drinks_reader = csv.reader(drinks)
       for row in drinks:
            values = row[:-1].split(',')
            if values[0] == 'usa':
               consumption_data['US'] = {'servings':float(values[3]), 'total_litres':float(values[4])}
            elif values[0] == 'south africa':
                consumption_data['South Africa'] = {'servings':float(values[3]), 'total_litres':float(values[4])}
            else:
                country = values[0].capitalize()
                if country in TOP_COUNTRIES:
                    consumption_data[country] = {'servings':float(values[3]), 'total_litres':float(values[4])}

    with open('./data/happiness_2017.csv') as happiness: #grab happiness data
        happiness_reader = csv.reader(happiness)
        for row in happiness_reader:
            if row[0] == 'United States':
                happiness_data['US'] = float(row[2])
            elif row[0] in TOP_COUNTRIES:
                happiness_data[row[0]] = float(row[2])

    for country in objects: # find top 10 varietals, and filter out empty names
        average_rating = 0
        count = 0
        varietal_heap = []
        for varietal in winemag_data[country]:
            if varietal == "":
                pass
            else:
                hq.heappush(varietal_heap, (winemag_data[country][varietal], varietal))
                average_rating += winemag_data[country][varietal]
                count += 1
        average_rating = average_rating/count
        objects[country] = {
            'happiness_rating': happiness_data[country],
            'consumption': consumption_data[country],
            'data': {
                'varietals':winemag_data[country],
                'top_varietals': hq.nlargest(10, varietal_heap),
                'average': average_rating
                }
        }

    with open('wine_data_objects.json', 'w') as f:
        json.dump(objects, f)


if __name__ == "__main__":
    buildObjects()
