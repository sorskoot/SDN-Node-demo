require('./timmytools');
var templater = require('./templater');

$("#submitButton")[0].addEventListener("click", e => {

    fetch(`/api/speakers/${$("#inputName")[0].value}`).then(
        response =>{
            response.json().then(handleResponse);
        }
    )

    e.preventDefault();
});

function handleResponse(result) {
    let resultEl = $('#result')[0],
        speakerTemplate = $('#speakerTemplate')[0].innerHTML;

    resultEl.innerHTML = '';

    for (let i = 0; i < result.length; i++) {
        resultEl.innerHTML = resultEl.innerHTML + templater(speakerTemplate, result[i]);
    }
}
