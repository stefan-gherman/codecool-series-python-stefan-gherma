sessionStorage.minIndex = 0;
sessionStorage.maxINdex = 15;
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
        tableLink.setAttribute('href', `/show/${shows[j]['show_id']}`);
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
    tableBody.innerHTML='';
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
        tableLink.setAttribute('href', `/show/${shows[j]['show_id']}`);
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

    prevButton.addEventListener('click', async function(event){

        nextButton.removeAttribute('disabled');
        let lastMinIndex = currStart;
         if (currStart - 15 > 0) {
        currStart -= 15;
    } else {
        currStart = 0;
        prevButton.setAttribute('disabled', '');
    }

    if (currStop - 15 > 0) {
            if (currStop === maxIndex ) {
                console.log('end');
                currStop = maxIndex-(maxIndex - lastMinIndex);
            } else {
                currStop -= 15;
            }
        } else {
            currStop = 0;

        }
    tableContainer.innerHTML = '';
    table.innerHTML = '';
    tableBody.innerHTML='';
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
        tableLink.setAttribute('href', `/show/${shows[j]['show_id']}`);
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