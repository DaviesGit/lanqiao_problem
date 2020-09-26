(function (problem) {

    function change_problem(idx0, idx1) {
        let p = problem[idx0].problems[idx1];
        let _content = p.content.replace(/(<img[^>]+src[^"']+")[^"']*\/([^"']*"[^>]+>)/g, '$1images/$2');
        _content = _content.replace(/RequireFile.do\?fid/g, 'RequireFile.do%3Ffid');
        content.innerHTML = _content;
        problem_info.innerHTML =
            `
            <h3><a href="http://lx.lanqiao.cn/problem.page?gpid=${p.gpid}" target="_blank">${p.title}</a> </span><span>${p.checkpoint}<span>${p.updatetime}</span></span></h3>
            <div><span>gpid:<span>${p.gpid}</span></span><span>tid:<span>${p.tid}</span></span><span>timelimit:<span>${p.timelimit}</span></span><span>memorylimit:<span>${p.memorylimit}</span></span></div>
            <div><span>src:<span>${p.src}</span></span></div>
            `;
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    let list = problem.reduce(function (acc, cur, idx0, src) {
        let name = cur.name;
        let prefix = cur.prefix.substring(0, cur.prefix.length - 1);

        acc +=
            `
                <li>
                    <a title="${name} (${prefix})" class="accordion-heading" data-toggle="collapse" data-target="#${prefix}" aria-expanded="true" aria-controls="${prefix}">
                        <span class="nav-header-primary">${name} (${prefix})<span class="pull-right"><b class="caret"></b></span></span>
                    </a>
                    <ul class="nav nav-list collapse sublist" id="${prefix}" data-parent="#column_left">` +
            cur.problems.reduce(function (acc, cur, idx1, src) {
                let gpid = cur.gpid;
                let tid = cur.tid;
                let lanqiaotitle = cur.lanqiaotitle;
                let checkpoint = cur.checkpoint;
                acc += `
                        <li><a class="row" title="${lanqiaotitle} {${checkpoint}}" data-idx0="${idx0}" data-idx1="${idx1}">
                                <div class="prefix col-sm-4">
                                    <div>${gpid}</div>
                                    <div title="${tid}">${tid}</div>
                                </div>
                                <div class="name col-sm-8">
                                    <div>${lanqiaotitle}</div>
                                    <div>${checkpoint}</div>
                                </div>
                            </a>
                        </li>
                        `;
                return acc;
            }, '') +
            `
                    </ul>
                </li>
            `;
        return acc;
    }, '');

    $('#column_left>ul').html(list);
    $('.sublist>li>a').click(function () {
        let idx0 = this.dataset.idx0;
        let idx1 = this.dataset.idx1;
        localStorage.setItem('current_problem', JSON.stringify([idx0, idx1]));
        change_problem(idx0, idx1);
        $('.active_item').removeClass('active_item');
        $(this).addClass('active_item');
    });

    function init() {
        let idx = localStorage.getItem('current_problem');
        if (!idx)
            return;
        idx = JSON.parse(idx);
        $('.accordion-heading').eq(idx[0]).click();
        $('a[data-idx0="' + idx[0] + '"][data-idx1="' + idx[1] + '"]').click()[0];
    }
    init();

})(problem);
