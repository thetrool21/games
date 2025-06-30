let app = {};
app.ws = undefined;
app.container = undefined;

app.init = function () {
    if (!window.WebSocket) {
        alert('your browser doesnt support websocked');
        return;
    }

    const name = prompt('enter your name please:') || 'anonymous';
    document.querySelector('.username').innerHTML = name;
    app.container = document.querySelector('.container');

    app.ws = new WebSocket(`ws://192.168.0.107:8080/ws?username=${name}`);

    app.ws.onopen = function () {
        let message = '<b>you joined this connection</b>';
        app.print(message);
    };

    app.ws.onmessage = function (event) {
        let res = JSON.parse(event.data);
        console.log(res);

        let message = '';
        if (res.Type == 'new user') {
            message = 'User <b>' + res.From + '</b> joined the channel';
        } else if (res.Type == 'leave') {
            message = 'User <b>' + res.From + '</b> leave the channel';
        } else {
            message = '<b>' + res.From + '</b>: ' + res.Message     ;   
        }

        app.print(message);
    };

    app.ws.onclose = function () {
        let message = '<b>me</b>: disconnected';
        app.print(message);
    };

    app.print = function (message) {
        let el = document.createElement('p');
        el.innerHTML = message;
        app.container.append(el);
    };

    app.doSendMessage = function () {
        let messageRaw = document.querySelector('.input-message').value;
        app.ws.send(
            JSON.stringify({
                Message: messageRaw,
            }),
        );

        let message = '<b>me</b>: ' + messageRaw;
        app.print(message);


        document.querySelector('.input-message').value = '';
    };
};

window.onload = app.init;