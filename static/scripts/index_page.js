sessionStorage.minIndex = 0;
sessionStorage.maxINdex = 15;

let clickedYear = 1;
let clickedTitle = 1;
let clickedRating = 1;
let clickedRuntime = 1;


const getShows = async () => {

    let showGet = await fetch(`${window.origin}/get-shows`);
    showGet = await showGet.json();

    console.log(showGet);
    return showGet;


};


const main = async () => {

    let shows = await getShows();

    const tableContainer = document.getElementById('tableHolder');

    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    const headers = ['Title', 'Year', 'Run Time', 'Rating', 'Genres', 'Link'];

    let minIndex = 0;
    let maxIndex = shows.length;

    let currStart = 0;
    let currStop = 15;
    for (let head of headers) {
        let headerToAdd = document.createElement('th');
        headerToAdd.innerText = head;

        if (head === 'Year') {
            headerToAdd.setAttribute("style", 'cursor:pointer');
            console.log('Year');
            headerToAdd.addEventListener('click', async function (event) {
                nextButton.removeAttribute('disabled');
                prevButton.setAttribute('disabled', '');
                clickedRating = 1;
                clickedTitle = 1;
                clickedRuntime = 1;
                currStart = 0;
                currStop = 15;
                if (clickedYear === 1) {
                    tableContainer.innerHTML = '';
                    table.innerHTML = '';
                    tableBody.innerHTML = '';
                    clickedYear = 2;
                    const dataToSend = {
                        "order": "desc",
                        "param": "shows.year"
                    };

                    shows = await fetch(`${window.origin}/get-shows-param`, {
                        method: "POST",
                        credentials: "include",
                        cache: "no-cache",
                        headers: new Headers({
                            'content-type': 'application/json'
                        }),
                        body: JSON.stringify(dataToSend)
                    });
                    shows = await shows.json();
                    for (let j = currStart; j < currStop; j++) {
                        let tableRow = document.createElement('tr');
                        let tableData = document.createElement('td');


                        tableData.innerHTML = shows[j]['title'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['year'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['run_time'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['rating'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        if (shows[j]['genres'].length < 3) {
                            for (let i = 0; i < shows[j]['genres'].length; i++) {
                                if (i !== shows[j]['genres'].length - 1) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        } else {
                            for (let i = 0; i < 3; i++) {
                                if (i !== 2) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        }
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        let tableLink = document.createElement('a');
                        let tableBtn = document.createElement('button');
                        tableBtn.innerText = 'See More';
                        tableLink.setAttribute('href',
                            `/show/${shows[j]['show_id']}`
                        );
                        tableLink.appendChild(tableBtn);
                        tableData.appendChild(tableLink);
                        tableRow.appendChild(tableData);


                        tableRow.appendChild(tableData);
                        tableBody.appendChild(tableRow);


                    }

                    table.appendChild(tableHead);
                    table.appendChild(tableBody);
                    tableContainer.appendChild(table);

                } else if (clickedYear === 2) {
                    tableContainer.innerHTML = '';
                    table.innerHTML = '';
                    tableBody.innerHTML = '';
                    clickedYear = 1;
                    const dataToSend = {
                        "order": "asc",
                        "param": "shows.year"
                    };

                    shows = await fetch(`${window.origin}/get-shows-param`, {
                        method: "POST",
                        credentials: "include",
                        cache: "no-cache",
                        headers: new Headers({
                            'content-type': 'application/json'
                        }),
                        body: JSON.stringify(dataToSend)
                    });
                    shows = await shows.json();
                    for (let j = currStart; j < currStop; j++) {
                        let tableRow = document.createElement('tr');
                        let tableData = document.createElement('td');


                        tableData.innerHTML = shows[j]['title'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['year'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['run_time'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['rating'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        if (shows[j]['genres'].length < 3) {
                            for (let i = 0; i < shows[j]['genres'].length; i++) {
                                if (i !== shows[j]['genres'].length - 1) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        } else {
                            for (let i = 0; i < 3; i++) {
                                if (i !== 2) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        }
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        let tableLink = document.createElement('a');
                        let tableBtn = document.createElement('button');
                        tableBtn.innerText = 'See More';
                        tableLink.setAttribute('href',
                            `/show/${shows[j]['show_id']}`
                        );
                        tableLink.appendChild(tableBtn);
                        tableData.appendChild(tableLink);
                        tableRow.appendChild(tableData);


                        tableRow.appendChild(tableData);
                        tableBody.appendChild(tableRow);


                    }

                    table.appendChild(tableHead);
                    table.appendChild(tableBody);
                    tableContainer.appendChild(table);
                }

            });
        }
        if (head === 'Title') {
            headerToAdd.setAttribute("style", 'cursor:pointer');
            console.log('Title');
            headerToAdd.addEventListener('click', async function (event) {
                nextButton.removeAttribute('disabled');
                prevButton.setAttribute('disabled', '');
                currStart = 0;
                currStop = 15;
                clickedYear = 1;
                clickedRuntime = 1;
                clickedRating = 1;
                if (clickedTitle === 1) {
                    tableContainer.innerHTML = '';
                    table.innerHTML = '';
                    tableBody.innerHTML = '';
                    clickedTitle = 2;
                    const dataToSend = {
                        "order": "desc",
                        "param": "shows.title"
                    };

                    shows = await fetch(`${window.origin}/get-shows-param`, {
                        method: "POST",
                        credentials: "include",
                        cache: "no-cache",
                        headers: new Headers({
                            'content-type': 'application/json'
                        }),
                        body: JSON.stringify(dataToSend)
                    });
                    shows = await shows.json();
                    for (let j = currStart; j < currStop; j++) {
                        let tableRow = document.createElement('tr');
                        let tableData = document.createElement('td');


                        tableData.innerHTML = shows[j]['title'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['year'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['run_time'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['rating'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        if (shows[j]['genres'].length < 3) {
                            for (let i = 0; i < shows[j]['genres'].length; i++) {
                                if (i !== shows[j]['genres'].length - 1) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        } else {
                            for (let i = 0; i < 3; i++) {
                                if (i !== 2) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        }
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        let tableLink = document.createElement('a');
                        let tableBtn = document.createElement('button');
                        tableBtn.innerText = 'See More';
                        tableLink.setAttribute('href',
                            `/show/${shows[j]['show_id']}`
                        );
                        tableLink.appendChild(tableBtn);
                        tableData.appendChild(tableLink);
                        tableRow.appendChild(tableData);


                        tableRow.appendChild(tableData);
                        tableBody.appendChild(tableRow);


                    }

                    table.appendChild(tableHead);
                    table.appendChild(tableBody);
                    tableContainer.appendChild(table);

                } else if (clickedTitle === 2) {
                    tableContainer.innerHTML = '';
                    table.innerHTML = '';
                    tableBody.innerHTML = '';
                    clickedTitle = 1;
                    const dataToSend = {
                        "order": "asc",
                        "param": "shows.title"
                    };

                    shows = await fetch(`${window.origin}/get-shows-param`, {
                        method: "POST",
                        credentials: "include",
                        cache: "no-cache",
                        headers: new Headers({
                            'content-type': 'application/json'
                        }),
                        body: JSON.stringify(dataToSend)
                    });
                    shows = await shows.json();
                    for (let j = currStart; j < currStop; j++) {
                        let tableRow = document.createElement('tr');
                        let tableData = document.createElement('td');


                        tableData.innerHTML = shows[j]['title'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['year'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['run_time'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['rating'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        if (shows[j]['genres'].length < 3) {
                            for (let i = 0; i < shows[j]['genres'].length; i++) {
                                if (i !== shows[j]['genres'].length - 1) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        } else {
                            for (let i = 0; i < 3; i++) {
                                if (i !== 2) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        }
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        let tableLink = document.createElement('a');
                        let tableBtn = document.createElement('button');
                        tableBtn.innerText = 'See More';
                        tableLink.setAttribute('href',
                            `/show/${shows[j]['show_id']}`
                        );
                        tableLink.appendChild(tableBtn);
                        tableData.appendChild(tableLink);
                        tableRow.appendChild(tableData);


                        tableRow.appendChild(tableData);
                        tableBody.appendChild(tableRow);


                    }

                    table.appendChild(tableHead);
                    table.appendChild(tableBody);
                    tableContainer.appendChild(table);
                }

            });
        }
        if (head === 'Rating') {
            headerToAdd.setAttribute("style", 'cursor:pointer');
            console.log('Rating');
            headerToAdd.addEventListener('click', async function (event) {
                nextButton.removeAttribute('disabled');
                prevButton.setAttribute('disabled', '');
                currStart = 0;
                currStop = 15;
                clickedRuntime = 1;
                clickedYear = 1;
                clickedTitle = 1;
                if (clickedRating === 1) {
                    tableContainer.innerHTML = '';
                    table.innerHTML = '';
                    tableBody.innerHTML = '';
                    clickedRating = 2;
                    const dataToSend = {
                        "order": "desc",
                        "param": "shows.rating"
                    };

                    shows = await fetch(`${window.origin}/get-shows-param`, {
                        method: "POST",
                        credentials: "include",
                        cache: "no-cache",
                        headers: new Headers({
                            'content-type': 'application/json'
                        }),
                        body: JSON.stringify(dataToSend)
                    });
                    shows = await shows.json();
                    for (let j = currStart; j < currStop; j++) {
                        let tableRow = document.createElement('tr');
                        let tableData = document.createElement('td');


                        tableData.innerHTML = shows[j]['title'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['year'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['run_time'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['rating'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        if (shows[j]['genres'].length < 3) {
                            for (let i = 0; i < shows[j]['genres'].length; i++) {
                                if (i !== shows[j]['genres'].length - 1) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        } else {
                            for (let i = 0; i < 3; i++) {
                                if (i !== 2) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        }
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        let tableLink = document.createElement('a');
                        let tableBtn = document.createElement('button');
                        tableBtn.innerText = 'See More';
                        tableLink.setAttribute('href',
                            `/show/${shows[j]['show_id']}`
                        );
                        tableLink.appendChild(tableBtn);
                        tableData.appendChild(tableLink);
                        tableRow.appendChild(tableData);


                        tableRow.appendChild(tableData);
                        tableBody.appendChild(tableRow);


                    }

                    table.appendChild(tableHead);
                    table.appendChild(tableBody);
                    tableContainer.appendChild(table);

                } else if (clickedRating === 2) {
                    tableContainer.innerHTML = '';
                    table.innerHTML = '';
                    tableBody.innerHTML = '';
                    clickedRating = 1;
                    const dataToSend = {
                        "order": "asc",
                        "param": "shows.rating"
                    };

                    shows = await fetch(`${window.origin}/get-shows-param`, {
                        method: "POST",
                        credentials: "include",
                        cache: "no-cache",
                        headers: new Headers({
                            'content-type': 'application/json'
                        }),
                        body: JSON.stringify(dataToSend)
                    });
                    shows = await shows.json();
                    for (let j = currStart; j < currStop; j++) {
                        let tableRow = document.createElement('tr');
                        let tableData = document.createElement('td');


                        tableData.innerHTML = shows[j]['title'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['year'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['run_time'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['rating'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        if (shows[j]['genres'].length < 3) {
                            for (let i = 0; i < shows[j]['genres'].length; i++) {
                                if (i !== shows[j]['genres'].length - 1) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        } else {
                            for (let i = 0; i < 3; i++) {
                                if (i !== 2) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        }
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        let tableLink = document.createElement('a');
                        let tableBtn = document.createElement('button');
                        tableBtn.innerText = 'See More';
                        tableLink.setAttribute('href',
                            `/show/${shows[j]['show_id']}`
                        );
                        tableLink.appendChild(tableBtn);
                        tableData.appendChild(tableLink);
                        tableRow.appendChild(tableData);


                        tableRow.appendChild(tableData);
                        tableBody.appendChild(tableRow);


                    }

                    table.appendChild(tableHead);
                    table.appendChild(tableBody);
                    tableContainer.appendChild(table);
                }

            });
        }
        if (head === 'Run Time') {
            headerToAdd.setAttribute("style", 'cursor:pointer');
            console.log('Run Time');
            headerToAdd.addEventListener('click', async function (event) {
                nextButton.removeAttribute('disabled');
                prevButton.setAttribute('disabled', '');
                currStart = 0;
                currStop = 15;
                clickedTitle = 1;
                clickedYear = 1;
                clickedRating = 1;
                if (clickedRuntime === 1) {
                    tableContainer.innerHTML = '';
                    table.innerHTML = '';
                    tableBody.innerHTML = '';
                    clickedRuntime = 2;
                    const dataToSend = {
                        "order": "desc",
                        "param": "shows.runtime"
                    };

                    shows = await fetch(`${window.origin}/get-shows-param`, {
                        method: "POST",
                        credentials: "include",
                        cache: "no-cache",
                        headers: new Headers({
                            'content-type': 'application/json'
                        }),
                        body: JSON.stringify(dataToSend)
                    });
                    shows = await shows.json();
                    for (let j = currStart; j < currStop; j++) {
                        let tableRow = document.createElement('tr');
                        let tableData = document.createElement('td');


                        tableData.innerHTML = shows[j]['title'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['year'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['run_time'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['rating'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        if (shows[j]['genres'].length < 3) {
                            for (let i = 0; i < shows[j]['genres'].length; i++) {
                                if (i !== shows[j]['genres'].length - 1) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        } else {
                            for (let i = 0; i < 3; i++) {
                                if (i !== 2) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        }
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        let tableLink = document.createElement('a');
                        let tableBtn = document.createElement('button');
                        tableBtn.innerText = 'See More';
                        tableLink.setAttribute('href',
                            `/show/${shows[j]['show_id']}`
                        );
                        tableLink.appendChild(tableBtn);
                        tableData.appendChild(tableLink);
                        tableRow.appendChild(tableData);


                        tableRow.appendChild(tableData);
                        tableBody.appendChild(tableRow);


                    }

                    table.appendChild(tableHead);
                    table.appendChild(tableBody);
                    tableContainer.appendChild(table);

                } else if (clickedRuntime === 2) {
                    tableContainer.innerHTML = '';
                    table.innerHTML = '';
                    tableBody.innerHTML = '';
                    clickedRuntime = 1;
                    const dataToSend = {
                        "order": "asc",
                        "param": "shows.runtime"
                    };

                    shows = await fetch(`${window.origin}/get-shows-param`, {
                        method: "POST",
                        credentials: "include",
                        cache: "no-cache",
                        headers: new Headers({
                            'content-type': 'application/json'
                        }),
                        body: JSON.stringify(dataToSend)
                    });
                    shows = await shows.json();
                    for (let j = currStart; j < currStop; j++) {
                        let tableRow = document.createElement('tr');
                        let tableData = document.createElement('td');


                        tableData.innerHTML = shows[j]['title'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['year'];
                        tableRow.appendChild(tableData);

                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['run_time'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        tableData.innerHTML = shows[j]['rating'];
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        if (shows[j]['genres'].length < 3) {
                            for (let i = 0; i < shows[j]['genres'].length; i++) {
                                if (i !== shows[j]['genres'].length - 1) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        } else {
                            for (let i = 0; i < 3; i++) {
                                if (i !== 2) {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                                } else {
                                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                                }
                            }
                        }
                        tableRow.appendChild(tableData);


                        tableData = document.createElement('td');
                        let tableLink = document.createElement('a');
                        let tableBtn = document.createElement('button');
                        tableBtn.innerText = 'See More';
                        tableLink.setAttribute('href',
                            `/show/${shows[j]['show_id']}`
                        );
                        tableLink.appendChild(tableBtn);
                        tableData.appendChild(tableLink);
                        tableRow.appendChild(tableData);


                        tableRow.appendChild(tableData);
                        tableBody.appendChild(tableRow);


                    }

                    table.appendChild(tableHead);
                    table.appendChild(tableBody);
                    tableContainer.appendChild(table);
                }

            });
        }

        tableHead.appendChild(headerToAdd);
    }


    for (let j = currStart; j < currStop; j++) {
        let tableRow = document.createElement('tr');
        let tableData = document.createElement('td');


        tableData.innerHTML = shows[j]['title'];
        tableRow.appendChild(tableData);

        tableData = document.createElement('td');
        tableData.innerHTML = shows[j]['year'];
        tableRow.appendChild(tableData);

        tableData = document.createElement('td');
        tableData.innerHTML = shows[j]['run_time'];
        tableRow.appendChild(tableData);


        tableData = document.createElement('td');
        tableData.innerHTML = shows[j]['rating'];
        tableRow.appendChild(tableData);


        tableData = document.createElement('td');
        if (shows[j]['genres'].length < 3) {
            for (let i = 0; i < shows[j]['genres'].length; i++) {
                if (i !== shows[j]['genres'].length - 1) {
                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                } else {
                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                }
            }
        } else {
            for (let i = 0; i < 3; i++) {
                if (i !== 2) {
                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                } else {
                    tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                }
            }
        }
        tableRow.appendChild(tableData);


        tableData = document.createElement('td');
        let tableLink = document.createElement('a');
        let tableBtn = document.createElement('button');
        tableBtn.innerText = 'See More';
        tableLink.setAttribute('href',
            `/show/${shows[j]['show_id']}`
        );
        tableLink.appendChild(tableBtn);
        tableData.appendChild(tableLink);
        tableRow.appendChild(tableData);


        tableRow.appendChild(tableData);
        tableBody.appendChild(tableRow);


    }

    table.appendChild(tableHead);
    table.appendChild(tableBody);
    tableContainer.appendChild(table);

    const mainContainer = document.getElementById('holder');
    mainContainer.appendChild(tableContainer)
    const brAdder = document.createElement('br');

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Prev';
    prevButton.setAttribute('disabled', '');
    prevButton.setAttribute('style', 'margin: 8px;');
    nextButton.setAttribute('style', 'margin: 8px;');

    const buttonContainer = document.getElementById('buttonHolder');

    buttonContainer.appendChild(brAdder);
    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);

    mainContainer.appendChild(buttonContainer);

    nextButton.addEventListener('click', async function (event) {
        prevButton.removeAttribute('disabled');
        if (currStart + 15 < maxIndex) {
            currStart += 15;
        } else {
            currStart = maxIndex;
        }

        if (currStop + 15 < maxIndex) {
            currStop += 15;
        } else {
            currStop = maxIndex;
            nextButton.setAttribute('disabled', '');
        }
        tableContainer.innerHTML = '';
        table.innerHTML = '';
        tableBody.innerHTML = '';
        console.log(table);
        console.log(currStart, currStop);

        for (let j = currStart; j < currStop; j++) {
            let tableRow = document.createElement('tr');
            let tableData = document.createElement('td');


            tableData.innerHTML = shows[j]['title'];
            tableRow.appendChild(tableData);

            tableData = document.createElement('td');
            tableData.innerHTML = shows[j]['year'];
            tableRow.appendChild(tableData);

            tableData = document.createElement('td');
            tableData.innerHTML = shows[j]['run_time'];
            tableRow.appendChild(tableData);


            tableData = document.createElement('td');
            tableData.innerHTML = shows[j]['rating'];
            tableRow.appendChild(tableData);


            tableData = document.createElement('td');
            if (shows[j]['genres'].length < 3) {
                for (let i = 0; i < shows[j]['genres'].length; i++) {
                    if (i !== shows[j]['genres'].length - 1) {
                        tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                    } else {
                        tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                    }
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    if (i !== 2) {
                        tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                    } else {
                        tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                    }
                }
            }
            tableRow.appendChild(tableData);


            tableData = document.createElement('td');
            let tableLink = document.createElement('a');
            let tableBtn = document.createElement('button');
            tableBtn.innerText = 'See More';
            tableLink.setAttribute('href',
                `/show/${shows[j]['show_id']}`
            );
            tableLink.appendChild(tableBtn);
            tableData.appendChild(tableLink);
            tableRow.appendChild(tableData);


            tableRow.appendChild(tableData);
            tableBody.appendChild(tableRow);


        }

        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tableContainer.appendChild(table);


    });

    prevButton.addEventListener('click', async function (event) {

        nextButton.removeAttribute('disabled');
        let lastMinIndex = currStart;
        if (currStart - 15 > 0) {
            currStart -= 15;
        } else {
            currStart = 0;
            prevButton.setAttribute('disabled', '');
        }

        if (currStop - 15 > 0) {
            if (currStop === maxIndex) {
                console.log('end');
                currStop = maxIndex - (maxIndex - lastMinIndex);
            } else {
                currStop -= 15;
            }
        } else {
            currStop = 0;

        }
        tableContainer.innerHTML = '';
        table.innerHTML = '';
        tableBody.innerHTML = '';
        console.log(table);
        console.log(currStart, currStop);

        for (let j = currStart; j < currStop; j++) {
            let tableRow = document.createElement('tr');
            let tableData = document.createElement('td');


            tableData.innerHTML = shows[j]['title'];
            tableRow.appendChild(tableData);

            tableData = document.createElement('td');
            tableData.innerHTML = shows[j]['year'];
            tableRow.appendChild(tableData);

            tableData = document.createElement('td');
            tableData.innerHTML = shows[j]['run_time'];
            tableRow.appendChild(tableData);


            tableData = document.createElement('td');
            tableData.innerHTML = shows[j]['rating'];
            tableRow.appendChild(tableData);


            tableData = document.createElement('td');
            if (shows[j]['genres'].length < 3) {
                for (let i = 0; i < shows[j]['genres'].length; i++) {
                    if (i !== shows[j]['genres'].length - 1) {
                        tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                    } else {
                        tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                    }
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    if (i !== 2) {
                        tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i] + ', ';
                    } else {
                        tableData.innerHTML = tableData.innerHTML + shows[j]['genres'][i];
                    }
                }
            }
            tableRow.appendChild(tableData);


            tableData = document.createElement('td');
            let tableLink = document.createElement('a');
            let tableBtn = document.createElement('button');
            tableBtn.innerText = 'See More';
            tableLink.setAttribute('href',
                `/show/${shows[j]['show_id']}`
            );
            tableLink.appendChild(tableBtn);
            tableData.appendChild(tableLink);
            tableRow.appendChild(tableData);


            tableRow.appendChild(tableData);
            tableBody.appendChild(tableRow);


        }

        table.appendChild(tableHead);
        table.appendChild(tableBody);
        tableContainer.appendChild(table);
    })
};


main();