const $ = require('./js/jquery.js');
const fs = require('fs');
const path = require('path');

let userid = 305405;

function req(url, data, callback) {
    return $.ajax({
        url: url,
        method: 'post',
        dataType: 'text',
        data: data,
        success: callback,
    });
}

function TrainProblemCategories(userid, callback) {
    return req('http://lx.lanqiao.cn/problem.TrainProblemCategories.dt', {
        userid: userid,
    }, callback);
}


function TrainProblems(userid, code, callback) {
    return req('http://lx.lanqiao.cn/problem.TrainProblems.dt', {
        page: '',
        keyword: '',
        code: code,
        typesel: '',
        statussel: '',
        helpsel: '',
        userid: userid,
    }, callback);
}


function Problem(gpid, callback) {
    return req('http://lx.lanqiao.cn/problem.Problem.dt', {
        cmd: 'description',
        gpid: gpid,
    }, callback);
}



function SubmitCode(gpid, lang, code, callback) {
    return req('http://lx.lanqiao.cn/test.SubmitCode.dt', {
        gpid: gpid,
        lang: lang,
        code: code,
    }, callback);
}


function LanqiaoStatus(page, callback) {
    return req('http://lx.lanqiao.cn/lanqiao.LanqiaoStatus.dt', {
        userid: '',
        sename: '',
        seprname: '',
        langsel: '',
        scoresel: '',
        retsel: '',
        order: '',
        page: page,
    }, callback);
}


function GetCode(submitid, callback) {
    return req('http://lx.lanqiao.cn/test.GetCode.dt', {
        submitid: submitid,
    }, callback);
}


function DownloadData(type, gpid, idx, datahash, callback) {
    return req('http://lx.lanqiao.cn/lanqiao.DownloadData.dt', {
        type: type,
        gpid: gpid,
        idx: idx,
        datahash: datahash,
    }, callback);
}

function RequireTempFile(handle, callback) {
    $.get('http://lx.lanqiao.cn/web.RequireTempFile.do?handle=' + handle, callback);
}


// let problems = [];
// TrainProblemCategories(userid, function(data) {
// 	data = JSON.parse(data);
// 	let i = 0;
// 	while (data[i]) {
// 		data[i].problems = [];
// 		problems.push(data[i]);
// 		++i;
// 	}
// 	problems.forEach(function(e) {
// 		TrainProblems(userid, e.prefix, function(data) {
// 			e.TrainProblemCategories = data;
// 			data = JSON.parse(data);
// 			let i = 0;
// 			while (data[i]) {
// 				(function(i) {
// 					setTimeout(function() {
// 						Problem(data[i].gpid, function(data) {
// 							e.problems[i] = data;
// 						});
// 					}, Math.random() * 60 * 1000);
// 				})(i);
// 				++i;
// 			}
// 		});
// 	});
// });

// problems.forEach((e)=>{for(let i=0,end=e.problems.length;i<end;++i) if(!e.problems[i]) console.log(e.problems[i]);});

// fs.writeFileSync(path.join(__dirname, '../problmes_2020_04_26.json'), JSON.stringify(problems));



let problems = JSON.parse(fs.readFileSync(path.join(__dirname, '../problmes.json')));

console.log(problems);

let gpids = [];

problems.forEach(function (e) {
    e.problems.forEach(function (e) {
        e = JSON.parse(e);
        gpids.push(e.gpid);
    });
});

// let i = 10;

// function _loop() {
// 	if (i >= gpids.length)
// 		return console.log('All finished!!');
// 	SubmitCode(gpids[i], 'JAVA', '', function(data) {
// 		data = JSON.parse(data);
// 		if ('1' === data.ret) {
// 			++i;
// 			return setTimeout(_loop, (30 + Math.random() * 20) * 1000);
// 		}
// 		console.log(data);
// 		console.log(i);
// 	});
// }

// _loop();

// let total = 32;
// let i = 1;
// let status = [];

// function _loop() {
// 	if (i > total)
// 		return console.log('All finished!!');

// 	LanqiaoStatus(i, function(data) {
// 		status.push(data);
// 		++i;
// 		setTimeout(_loop, 100);
// 	});
// }

// _loop();

// fs.writeFileSync(path.join(__dirname, '../status.json'), JSON.stringify(status));
//
//let status = JSON.parse(fs.readFileSync(path.join(__dirname, '../status.json')));
//
//let test_data = {};
//
//status.forEach(function (e) {
//    e = JSON.parse(e);
//    let i = 0;
//    while (e[i]) {
//        (function (e) {
//            setTimeout(function () {
//                GetCode(e.id, function (data) {
//                    let code = JSON.parse(data);
//                    let i = 0;
//                    if ('1' !== code.ret)
//                        return console.log('Error:', code);
//                    if (!code['d' + i])
//                        return;
//                    if (test_data[e.gpid])
//                        return;
//                    test_data[e.gpid] = {
//                        id: e.id,
//                        gpid: e.gpid,
//                        lanqiaopname: e.lanqiaopname,
//                        pname: e.pname,
//                        handle: [],
//                        test: [],
//                    };
//                    while (code['d' + i]) {
//
//                        (function (i) {
//                            let downdata = code['d' + i];
//                            if (!downdata.downdata) {
//                                console.log();
//                            }
//                            let downinp = downdata.downdata.match(/downinp\((\d+),'(\w+)'\)/);
//                            let downoup = downdata.downdata.match(/downoup\((\d+),'(\w+)'\)/);
//                            test_data[e.gpid].handle[i] = [];
//
//                            test_data[e.gpid].handle[i][0] = [downinp[1], downinp[2], null];
//                            test_data[e.gpid].handle[i][1] = [downoup[1], downoup[2], null];
//
//                            //							setTimeout(function() {
//                            //								if (downinp)
//                            //									DownloadData('inp', e.gpid, downinp[1], downinp[2], function(data) {
//                            //										data = JSON.parse(data);
//                            //										if ('1' !== data.ret)
//                            //											return console.log("Error: DownloadData", data);
//                            //										test_data[e.gpid].handle[i][0] = [downinp[1], downinp[2], data.handle];
//                            //									});
//                            //								else
//                            //									console.log('Error: cannot find downinp');
//                            //
//                            //							}, Math.random() * 5 * 1000);
//                            //
//                            //							setTimeout(function() {
//                            //								if (downoup)
//                            //									DownloadData('oup', e.gpid, downoup[1], downoup[2], function(data) {
//                            //										data = JSON.parse(data);
//                            //										if ('1' !== data.ret)
//                            //											return console.log("Error: DownloadData", data);
//                            //										test_data[e.gpid].handle[i][1] = [downoup[1], downoup[2], data.handle];
//                            //									});
//                            //								else
//                            //									console.log('Error: cannot find downoup');
//                            //							}, Math.random() * 5 * 1000);
//
//                        })(i);
//
//                        ++i;
//                    }
//                });
//            }, Math.random() * 10 * 60 * 1000);
//        })(e[i]);
//        ++i;
//    }
//});


//fs.writeFileSync(path.join(__dirname, '../test_data.json'), JSON.stringify(test_data));

//let test_data = JSON.parse(fs.readFileSync(path.join(__dirname, '../test_data.json')));

//let prop_arr = [];
//for (prop in test_data)
//    prop_arr.push(prop);
//prop_arr.sort((a, b) => {
//    return a.substring(1, a.length) - b.substring(1, b.length);
//})
//
//let idx0 = 2,
//    idx1 = 0;
//
//function _loop() {
//
//    if (idx1 >= test_data[prop_arr[idx0]].handle.length) {
//        ++idx0;
//        idx1 = 0;
//    }
//    if (idx0 >= prop_arr.length)
//        return console.log('All finished!');
//
//    let downinp = test_data[prop_arr[idx0]].handle[idx1];
//    let downoup = downinp[1];
//    let cur_idx1 = idx1;
//    downinp = downinp[0];
//
//    let test = test_data[prop_arr[idx0]].test;
//    test[idx1] = [];
//
//
//    DownloadData('inp', prop_arr[idx0], downinp[0], downinp[1], function (data) {
//        data = JSON.parse(data);
//        if ('1' !== data.ret)
//            return console.log("Error: DownloadData", data);
//        downinp[2] = data.handle;
//        RequireTempFile(data.handle, function (data) {
//            test[cur_idx1][0] = data;
//        });
//
//        setTimeout(function () {
//            DownloadData('oup', prop_arr[idx0], downoup[0], downoup[1], function (data) {
//                data = JSON.parse(data);
//                if ('1' !== data.ret)
//                    return console.log("Error: DownloadData", data);
//                downoup[2] = data.handle;
//                RequireTempFile(data.handle, function (data) {
//                    test[cur_idx1][1] = data;
//                });
//
//                ++idx1;
//                setTimeout(_loop, (20 + 10 * Math.random()) * 1000);
//            });
//        }, (4 + 2 * Math.random()) * 1000);
//    });
//}




//_loop();


//
//for (p in test_data) {
//    (function (p) {
//        test_data[p].handle.forEach((e, i) => {
//            if (e[0][2] && e[1][2]) {
//                test_data[p].test[i] = [];
//                RequireTempFile(e[0][2], function (data) {
//                    test_data[p].test[i][0] = data;
//                });
//                RequireTempFile(e[1][2], function (data) {
//                    test_data[p].test[i][1] = data;
//                });
//            }
//        })
//    })(p);
//};
//
//
//for (p in test_data) {
//    (function (p) {
//        let handle = test_data[p].handle;
//        if (!handle.length)
//            console.log(p);
//        for (let i = 0; i < handle.length; ++i) {
//            if (!handle[i])
//                console.log(p, i);
//        }
//    })(p);
//};


let test_data = JSON.parse(fs.readFileSync(path.join(__dirname, '../test_data.json')));

let prop_arr = [];
for (prop in test_data)
    prop_arr.push(prop);
prop_arr.sort((a, b) => {
    return a.substring(1, a.length) - b.substring(1, b.length);
})

let all_index = [];

for (let i = 0; i < prop_arr.length; ++i) {
    let p = test_data[prop_arr[i]];
    for (let j = 0; j < p.handle.length; ++j) {
        if (j !== p.handle.length - 1)
            continue;
        if (!test_data[prop_arr[i]].test[j] || 'string' !== typeof test_data[prop_arr[i]].test[j][0] || 'string' !== typeof test_data[prop_arr[i]].test[j][1])
            all_index.push([i, j]);
    }
}

//
//let idx0 = 6;
//
//function _loop() {
//
//    if (idx0 >= prop_arr.length)
//        return console.log('All finished!');
//
//    let problem = test_data[prop_arr[idx0]];
//
//    GetCode(problem.id, function (data) {
//        let code = JSON.parse(data);
//        let i = 0;
//        if ('1' !== code.ret)
//            return console.log('Error:', code);
//
//        let datahash = [];
//        while (code['d' + i]) {
//            (function (i) {
//                let downdata = code['d' + i];
//                if (!downdata.downdata) {
//                    return console.log('Error:', prop_arr[idx0], problem, i);
//                }
//                let downinp = downdata.downdata.match(/downinp\((\d+),'(\w+)'\)/);
//                let downoup = downdata.downdata.match(/downoup\((\d+),'(\w+)'\)/);
//                datahash[i] = [[downinp[1], downinp[2]], [downoup[1], downoup[2]]];
//            })(i);
//            ++i;
//        }
//
//        let idx1 = 0;
//
//        function __loop() {
//            if (idx1 >= datahash.length) {
//                ++idx0;
//                i0 = Math.floor(gpids.length * Math.random());
//
//                SubmitCode(gpids[i0], 'JAVA', '', function (data) {
//                    data = JSON.parse(data);
//                    if ('1' === data.ret) {
//                        return;
//                    }
//                    console.log(data);
//                    console.log(i0);
//                });
//                return setTimeout(_loop, (55 + 10 * Math.random()) * 1000);
//            }
//            if (!datahash[idx1]) {
//                console.log(problem, code, datahash, idx1);
//                ++idx1;
//                return __loop();
//            }
//
//            let downinp = datahash[idx1][0];
//            let downoup = datahash[idx1][1];
//            let test = problem.test;
//            test[idx1] = [];
//            let ii = idx1;
//
//            DownloadData('inp', prop_arr[idx0], downinp[0], downinp[1], function (data) {
//                data = JSON.parse(data);
//                if ('1' !== data.ret) {
//                    console.log('Error: DownloadData', data);
//                    //                    if ('ERROR。' === data.info)
//                    //                        return setTimeout(check, (55 + 10 * Math.random()) * 1000);
//                    return;
//                }
//                problem.handle[idx1][0][2] = data.handle;
//                RequireTempFile(data.handle, function (data) {
//                    test[ii][0] = data;
//                });
//
//                setTimeout(function () {
//                    DownloadData('oup', prop_arr[idx0], downoup[0], downoup[1], function (data) {
//                        data = JSON.parse(data);
//                        if ('1' !== data.ret) {
//                            console.log('Error: DownloadData', data);
//                            //                            if ('ERROR。' === data.info)
//                            //                                return setTimeout(check, (55 + 10 * Math.random()) * 1000);
//                            return;
//                        }
//                        problem.handle[idx1][1][2] = data.handle;
//                        RequireTempFile(data.handle, function (data) {
//                            test[ii][1] = data;
//                        });
//
//                        ++idx1;
//                        setTimeout(__loop, (55 + 10 * Math.random()) * 1000);
//                    });
//                }, (55 + 10 * Math.random()) * 1000);
//            });
//
//        }
//
//        __loop();
//
//    });
//
//}


//function check() {
//    GetCode(4515583, function (data) {
//        let code = JSON.parse(data);
//        if ('1' !== code.ret)
//            return console.log('Error:', code);
//
//        let downinp = code['d0'].downdata.match(/downinp\((\d+),'(\w+)'\)/);
//
//        DownloadData('inp', 'T1', downinp[1], downinp[2], function (data) {
//            data = JSON.parse(data);
//            if ('1' !== data.ret)
//                return setTimeout(check, 20 * (55 + 10 * Math.random()) * 1000);
//            console.log('Check ok!');
//            setTimeout(_loop, (55 + 10 * Math.random()) * 1000);
//        });
//    });
//}

//check();

// fs.writeFileSync(path.join(__dirname, '../test_data.json'), JSON.stringify(test_data));

//_loop();


function _loop() {

    if (!all_index.length)
        return console.log('All finished!');

//    let index = all_index.splice([Math.floor(Math.random() * all_index.length)], 1)[0];
    let index = all_index.shift();
    let idx0 = index[0];
    let idx1 = index[1];

    let problem = test_data[prop_arr[idx0]];


    //    SubmitCode(prop_arr[idx0], 'JAVA', '', function (data) {
    //        data = JSON.parse(data);
    //        if ('1' !== data.ret) {
    //            console.log(data, test_data[prop_arr[idx0]]);
    //            return setTimeout(_loop, (55 + 10 * Math.random()) * 1000);
    //        }
    //        problem.id = data.itemid;
    //        setTimeout(function () {

    GetCode(problem.id, function (data) {
        let code = JSON.parse(data);
        let i = 0;
        if ('1' !== code.ret)
            return console.log('Error:', code);

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

        if (!datahash[idx1]) {
            console.log(problem, code, datahash, idx1);
            return _loop();
        }

        let downinp = datahash[idx1][0];
        let downoup = datahash[idx1][1];
        let test = problem.test;

        DownloadData('inp', prop_arr[idx0], downinp[0], downinp[1], function (data) {
            data = JSON.parse(data);
            if ('1' !== data.ret) {
                console.log('Error: DownloadData', data);
                //                    if ('ERROR。' === data.info)
                //                        return setTimeout(check, (55 + 10 * Math.random()) * 1000);
                return;
            }
            problem.handle[idx1][0][2] = data.handle;
            let handle0 = data.handle;

            setTimeout(function () {
                DownloadData('oup', prop_arr[idx0], downoup[0], downoup[1], function (data) {
                    data = JSON.parse(data);
                    if ('1' !== data.ret) {
                        console.log('Error: DownloadData', data);
                        //                            if ('ERROR。' === data.info)
                        //                                return setTimeout(check, (55 + 10 * Math.random()) * 1000);
                        return;
                    }
                    problem.handle[idx1][1][2] = data.handle;
                    let handle1 = data.handle;


                    test[idx1] = [];
                    RequireTempFile(handle0, function (data) {
                        test[idx1][1] = data;
                    });
                    RequireTempFile(handle1, function (data) {
                        test[idx1][0] = data;
                    });
                    if (0 === all_index.length % 20)
                        setTimeout(_loop, (30 * 60 + 10 * Math.random()) * 1000);
                    else
                        setTimeout(_loop, (5 + 10 * Math.random()) * 1000);
                });
            }, (2 + 10 * Math.random()) * 1000);
        });

    });
    //        }, (25 + 10 * Math.random()) * 1000);
    //    });

}


setInterval(function () {
    //    fs.writeFileSync(path.join(__dirname, '../test_data.json'), JSON.stringify(test_data));
}, 5 * 60 * 1000);
