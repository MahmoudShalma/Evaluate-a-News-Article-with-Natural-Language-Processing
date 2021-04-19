import { validURL } from "./checkURL"

const api = 'http://localhost:8000'

function handleSubmit(event) {
    let getUrl = document.getElementById('url').value

    if (validURL(getUrl)) {
        postTheData(`${api}/check`, { getUrl })
            .then(res => {
                update(res)
            })
    }
    else {
        console.log("url is incorrect")
        alert("url is incorrect")
        document.getElementById('url').value = '';
        return
    }

    function update(urlData) {
        document.getElementById('scoreTag').innerHTML = `score Tag: ${urlData.score_tag}`;
        document.getElementById("agreement").innerHTML = `Agreement: ${urlData.agreement}`;
        document.getElementById("confidence").innerHTML = `Confidence: ${urlData.confidence}`;
    }

    async function postTheData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        try {
            const urlData = await res.json();
            return urlData;
        }
        catch (error) {
            console.log(error);
        }
    }
}
export { handleSubmit }
