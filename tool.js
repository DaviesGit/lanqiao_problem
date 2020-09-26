const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

let problems = JSON.parse(fs.readFileSync(path.join(__dirname, '../problmes_2020_04_26.json')));

let data = [];

problems.forEach(function (e) {
    let list = {
        name: e.name,
        prefix: e.prefix,
        problems: [],
    };
    let TrainProblemCategories = JSON.parse(e.TrainProblemCategories);
    data.push(list);
    e.problems.forEach(function (e, i) {
        e = JSON.parse(e);
        list.problems.push({
            checkpoint: TrainProblemCategories[i].checkpoint,
            updatetime: TrainProblemCategories[i].updatetime,
            content: e.lcontent,
            gpid: e.gpid,
            lanqiaotitle: e.lanqiaotitle,
            memorylimit: e.memorylimit,
            tid: e.tid,
            timelimit: e.timelimit,
            title: e.title,
            src: e.src,
        });
    });
});


//fs.writeFileSync(path.join(__dirname, '../temp.json'), JSON.stringify(data));
fs.writeFileSync(path.join(__dirname, '../js/data.js'), 'const problem = ' + JSON.stringify(data) + ';');


let urls = [];
problems.forEach(function (e) {
    e.problems.forEach(function (e, i) {
        e = JSON.parse(e);
        let imgs = e.content.match(/<img[^>]+src[^"']+"([^"']*)"[^>]+>/g);
        //         imgs = e.content.match(/href/g);
        if (imgs) {
            //            console.log(e);
            urls = urls.concat(imgs);
        }
    });
});
urls = urls.map(function (e) {
    return e.match(/<img[^>]+src[^"']+"([^"']*)"[^>]+>/)[1];
});


urls = urls.filter(function (e) {
    return !fs.existsSync(path.join(__dirname, '../images/', e.split('/').pop()));
});


urls.forEach(function (e) {
    if ('http' !== e.substr(0, 4))
        e = 'http://lx.lanqiao.cn' + e;
    let file = fs.createWriteStream(path.join(__dirname, '../images/', e.split('/').pop()));
    if ('https' === e.substr(0, 5))
        https.get(e, function (response) {
            response.pipe(file);
            console.log(e);
        });
    else
        http.get(e, function (response) {
            response.pipe(file);
            console.log(e);
        });
});



let i = 0;
arr = Array.from($('#column_left ul ul a'));

function _loop() {
    if (i >= arr.length)
        return console.log("All finished!");
    $(arr[i]).click();
    ++i;
    setTimeout(_loop, 1000);
}
_loop();



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
