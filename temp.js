problems.forEach(function (e) {
    e.problems.forEach(function (e) {
        e = JSON.parse(e);
        let t = e.timelimit.substring(0, e.timelimit.length - 1);
        if ('m' === t[t.length - 1]) t = (+t.substring(0, t.length - 1)) / 1000;
        else t = +t;

        if (test_data[e.gpid] && test_data[e.gpid].handle.length * t > 60)
            console.log(test_data[e.gpid].handle.length * t, test_data[e.gpid].handle.length, t, e);
    });
});

let i = 0;
let datahash = [];
while (code['d' + i]) {
    (function (i) {
        let downdata = code['d' + i];
        if (!downdata.downdata) {
            return;
        }
        let downinp = downdata.downdata.match(/downinp\((\d+),'(\w+)'\)/);
        let downoup = downdata.downdata.match(/downoup\((\d+),'(\w+)'\)/);
        datahash[i] = [[downinp[1], downinp[2]], [downoup[1], downoup[2]]];
    })(i);
    ++i;
}


debugger;
d = [];
datahash.forEach(function (e, i) {
    console.log(e[0]);
    DownloadData('oup', 'T482', e[0][0], e[0][1], function (data) {
        data = JSON.parse(data);
        if ('1' !== data.ret) {
            console.log('Error: DownloadData', data);
            return;
        }

        d[i] = data;
    });
});


b = [];
d.forEach((e, i) => {
    RequireTempFile(e.handle, function (data) {
        b[i] = data;
    });
});
