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

    for (let head of headers) {
        let headerToAdd = document.createElement('th');
        headerToAdd.innerText = head;
        tableHead.appendChild(headerToAdd);
    }


    console.log(shows[0]['title']);
    for (let j = 0; j < 15; j++) {
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
        tableLink.setAttribute('href', `/`);
        tableLink.appendChild(tableBtn);
        tableData.appendChild(tableLink);
        tableRow.appendChild(tableData);


        tableRow.appendChild(tableData);
        tableBody.appendChild(tableRow);


    }

    table.appendChild(tableHead);
    table.appendChild(tableBody);
    tableContainer.appendChild(table);


};


main();