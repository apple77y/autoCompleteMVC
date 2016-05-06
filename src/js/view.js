/**
 * 검색 결과 뷰
 * @returns {nts.view.autoComplete}
 * @constructor
 */
nts.view.autoComplete = function () {
    var me = this;

    if (!(me instanceof nts.view.autoComplete)) {
        return new nts.view.autoComplete();
    }

    me.initSearchList();
    me._insertTemplate();
    me._assignElements();

    return me;
};

/**
 * 뷰 객체 프로토타입
 */
nts.view.autoComplete.prototype = {

    /**
     * 템플릿을 내부함수에 저장
     * @private
     */
    _insertTemplate: function () {
        this._tmplStore = nts.template.autoComplete;
    },

    /**
     * 컨트롤러에서 엘리먼트를 참조하기 위해 캐싱
     * @private
     */
    _assignElements: function () {
        this._inputBox = $('.input_text');
        this._form = $('form');
    },

    /**
     * 방향키에 따라 키워드 바꿈
     * @param keyCode
     * @returns {boolean}
     */
    changeKeyword: function (keyCode) {
        var $anchors = $('#result a');

        if (keyCode === 40 || keyCode === 38) {
            this._inputBox.val($($anchors[this._index]).text());
            return false;
        }
    },

    /**
     * 키 이벤트(위, 아래)에 따라 키워드 컴포넌트를 바꿈
     * @param {number} keyCode
     * @public
     */
    changeIndex: function (keyCode) {
        var $anchors = $('#result a'),
            len = $anchors.length,
            index = this._index;

        if (keyCode === 40) {
            this._downKeyEvent(index, len);
        } else if (keyCode === 38) {
            this._upKeyEvent(index);
        }

        $($anchors[index]).addClass('on');
        $($anchors[index]).siblings().removeClass('on');
    },


    /**
     * 검색 결과 화면을 초기화
     * @public
     */
    initSearchList: function () {
        this._index = -1;
        $('#result').toggle();
        $('#result a').removeClass('on');
    },

    /**
     * 화살표 위 키를 눌렀을 때
     * @param {number} index
     * @private
     */
    _upKeyEvent: function (index) {
        if (index >= 0) {
            this._index -= 1;
        } else {
            this.initSearchList();
        }
    },

    /**
     * 화살표 아래 키를 눌렀을 때
     * @param {number} index
     * @param {number} len
     * @private
     */
    _downKeyEvent: function (index, len) {
        if (index < len) {
            this._index += 1;
            $('#result').show();
        } else {
            this.initSearchList();
        }
    },

    /**
     * 엔터 키를 눌렀을 때
     * @private
     */
    _enterKeyEvent: function () {
        var $anchors = $('#result a');

        this._inputBox.val($($anchors[this._index]).text());
    },

    /**
     * 템플릿에 해당되는 데이터를 넣음
     * @param {Array} data 검색 결과
     * @param {string} keyword 검색 키워드
     * @returns {DocumentFragment}
     * @private
     */
    _createFrag: function (data, keyword) {
        var frag = document.createDocumentFragment(),
            len = data.length,
            template = '',
            searchStr, i;

        for (i = 0; i < len; i += 1) {
            searchStr = data[i].toString();

            template = this._tmplStore
                .replace(/\{\{url\}\}/g, searchStr)
                .replace(/\{\{keyword\}\}/g, '<strong>' + keyword + '</strong>')
                .replace(/\{\{rest\}\}/g, searchStr.replace(keyword, ''));

            frag.appendChild($(template)[0]);
        }

        return frag;
    },

    /**
     * 컨트롤러에서 받은 데이터를 바탕으로 화면을 그림
     * @param {Array} data 검색 결과
     * @param {string} keyword 검색 키워드
     * @public
     */
    render: function (data, keyword) {
        var $div = $('#result'),
            searchList;

        $div.hide().empty();
        searchList = this._createFrag(data, keyword);
        $div.show().append(searchList);
    }
};
