const MY_SLACK_WEBHOOK_URL = '#SLACK_WEBHOOK;
const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);
const request = require('request');

let  data = new Date();
let seconds = data.getSeconds();
let minutes = data.getMinutes();
let hours  = data.getHours();

let time = hours + ':' + minutes + ':' + seconds;
setInterval(check, 3600000);

function check () {
request('#WEB_URL', function (error, response) {
    if (!error && response.statusCode == 200) {
        console.log('Serwer działa poprawnie.')
        }
    else {
        slack.send({
            channel: '#lista-serwerów',
            text: time + ' *Serwer nie działa, sprawdź co poszło nie tak.*' + '\n' + '*Logi poniżej:*' + '\n' + JSON.stringify(response),
            username: 'webChecker'
        })
    }}
)}
