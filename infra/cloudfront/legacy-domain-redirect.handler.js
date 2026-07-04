function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;

    if (host !== 'nbbang.shop' && host !== 'www.nbbang.shop') {
        return request;
    }

    var uri = request.uri;
    var qs = request.querystring;
    var parts = ['migrated=1'];

    for (var key in qs) {
        if (key === 'migrated') {
            continue;
        }

        var q = qs[key];
        if (q.multiValue) {
            for (var i = 0; i < q.multiValue.length; i++) {
                parts.push(
                    encodeURIComponent(key) +
                        '=' +
                        encodeURIComponent(q.multiValue[i].value),
                );
            }
        } else if (q.value !== undefined) {
            parts.push(
                encodeURIComponent(key) +
                    '=' +
                    encodeURIComponent(q.value),
            );
        }
    }

    return {
        statusCode: 301,
        statusDescription: 'Moved Permanently',
        headers: {
            location: {
                value: 'https://nbbang.cloud' + uri + '?' + parts.join('&'),
            },
        },
    };
}
