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
    }
};
