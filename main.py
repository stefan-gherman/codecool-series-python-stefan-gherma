from flask import Flask, render_template, url_for, request, redirect, jsonify, make_response
from data import queries

app = Flask('codecool_series')


def transform_obj(shows: list):
    json_shows = []

    i = 0
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
                    inner_dict['show_id'] = obj['id']
                    legit_dict.append(inner_dict)
                    break

            except IndexError:
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
    return legit_dict


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/get-shows')
def get_shows():
    shows = queries.get_shows()

    legit_dict = transform_obj(shows)
    return make_response(jsonify(legit_dict), 200)


@app.route('/get-shows-param', methods=['POST'])
def return_shows_ordered_by_param():
    req = request.get_json()
    ordering = req['order']
    param = req['param']

    shows = queries.get_shows_with_param(param, ordering)
    legit_dict = transform_obj(shows)

    return make_response(jsonify(legit_dict), 200)


@app.route('/show/<show_id>')
def return_show_page(show_id):
    print(show_id)
    show_id = int(show_id)
    show = queries.get_show_from_id(show_id)
    cast = queries.get_cast_for_show(show_id)
    seasons = queries.get_seasons_for_show(show_id)
    show[0]['seasons'] = seasons
    show[0]['actors'] = cast[0]['actors']
    show[0]['year'] = str(show[0]['year'])
    show[0]['characters'] = cast[0]['characters']
    if show[0]['trailer']:
        show[0]['trailer'] = show[0]['trailer'][-11:]
    print(show)
    return render_template('show_page.html', show=show)


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
