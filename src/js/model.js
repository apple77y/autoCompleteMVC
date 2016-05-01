/**
 * 검색 결과 모델
 * @returns {nts.model.autoCompleteModel}
 * @constructor
 */
nts.model.autoCompleteModel = function () {
    var me = this;

    if (!(me instanceof nts.model.autoCompleteModel)) {
        return new nts.model.autoCompleteModel();
    }

    me._eventHandler = $({});
    me._data = [];
    me._keyword = '';

    return me;
};

nts.model.autoCompleteModel.prototype = {

    /**
     * 이벤를 등록
     * @param {Event} event 이벤트 객체
     * @param {function} callback 콜백 함수
     * @public
     */
    addEventListener: function (event, callback) {
        this._eventHandler.on(event, callback);
    },

    /**
     * 등록된 이벤트를 실행
     * @param {Event} event 이벤트 객체
     * @public
     */
    dispatchEvent: function (event) {
        this._eventHandler.trigger(event);
    },

    /**
     * 검색 결과를 리턴
     * @returns {array} searchResult 검색 결과
     * @public
     */
    getData: function () {
        var searchResult = this._data.items[0];

        return searchResult;
    },

    /**
     * ajax로 받아온 검색 결과를 저장 후 update 이벤트를 실행
     * @param {array} result 검색 결과
     * @public
     */
    setData: function (result) {
        this._data = result;

        this.dispatchEvent('update');
    },

    /**
     * 입력한 키워드를 불러옴
     * @returns {string} keyword 키워드
     * @public
     */
    getKeyword: function () {
        return this._keyword;
    },

    /**
     * 입력된 키워드를 저장
     * @param {string} keyword 키워드
     * @public
     */
    setKeyword: function (keyword) {
        this._keyword = keyword;
    },

    /**
     * ajax로 검색 결과를 받아옴
     * @returns {function} _successHandler 성공일 때 실행 함수
     * @returns {function} _failureHandler 실패일 때 실행 함수
     * @public
     */
    callData: function () {
        $.ajax({
            // 보안 이슈로 삭제
        })
        .done($.proxy(this._successHandler, this))
        .fail(this._failureHandler);
    },

    /**
     * ajax가 성공적으로 끝났을 때
     * @param {array} result 검색 결과
     * @private
     */
    _successHandler: function (result) {
        this.setData(result);
    },

    /**
     * ajax가 실패로 끝났을 때
     * @param err 에러 메세지
     * @returns {boolean}
     * @private
     */
    _failureHandler: function (err) {
        if (err) {
            window.alert('에러가 발생했습니다.');
            return false;
        }
    }
};
