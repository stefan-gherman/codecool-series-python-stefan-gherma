from flask import Flask, render_template, url_for, request, redirect, jsonify, make_response
from data import queries

app = Flask('codecool_series')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/get-shows')
def get_shows():
    shows = queries.get_shows()

    json_shows = [];

    i = 0;
    for i in range(len(shows)):
        inner = {}
        for key in shows[i].keys():
            inner[key] = str(shows[i][key])
        json_shows.append(inner)

    legit_dict = []

    j = 0
    i = 0
    for obj in json_shows:
        while j <= i:
            inner_dict = {}
            try:
                if legit_dict[j]['show_id'] == obj['show_id']:
                    legit_dict[j]['genres'].append(obj['name'])
                    break
                elif obj['show_id'] == 'None':
                    inner_dict['title'] = obj['title']
                    inner_dict['year'] = obj['year']
                    inner_dict['run_time'] = obj['run_time']
                    inner_dict['rating'] = obj['rtg']
                    inner_dict['genres'] = [obj['name']]
                    inner_dict['show_id'] = obj['show_id']
                    legit_dict.append(inner_dict)
                    break

            except(IndexError):
                inner_dict['title'] = obj['title']
                inner_dict['year'] = obj['year']
                inner_dict['run_time'] = obj['run_time']
                inner_dict['rating'] = obj['rtg']
                inner_dict['genres'] = [obj['name']]
                inner_dict['show_id'] = obj['show_id']
                legit_dict.append(inner_dict)
                break
            j += 1
        i = i + 1
        j = 0

    print(len(legit_dict))
    return make_response(jsonify(legit_dict), 200)

@app.route('/show/<show_id>')
def return_show_page(show_id):
    print(show_id)
    return render_template('show_page.html')

def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
