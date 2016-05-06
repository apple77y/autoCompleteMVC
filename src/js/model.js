/**
 * 검색 결과 모델
 * @returns {nts.model.autoComplete}
 * @constructor
 */
nts.model.autoComplete = function () {
    var me = this;

    if (!(me instanceof nts.model.autoComplete)) {
        return new nts.model.autoComplete();
    }

    me._observer = new nts.observer();
    me._data = [];
    me._keyword = '';

    return me;
};

/**
 * 모델 객체 프로토타입
 */
nts.model.autoComplete.prototype = {

    /**
     * 이벤를 등록
     * @param {string} event 이벤트 객체
     * @param {function} callback 콜백 함수
     * @public
     */
    addEventListener: function (event, callback) {
        this._observer.subscribe(event, callback);
    },

    /**
     * 등록된 이벤트를 실행
     * @param {string} event 이벤트 객체
     * @public
     */
    dispatchEvent: function (event) {
        this._observer.publish(event);
    },

    /**
     * 검색 결과를 리턴
     * @returns {Array} data 검색 결과
     * @public
     */
    get data() {
        return this._data;
    },

    /**
     * ajax로 받아온 검색 결과를 저장 후 update 이벤트를 실행
     * @param {Object} result 검색 결과
     * @public
     */
    set data(result) {
        this._data = result.items[0];
        this.dispatchEvent('update');
    },

    /**
     * 입력한 키워드를 불러옴
     * @returns {string} keyword 키워드
     * @public
     */
    get keyword() {
        return this._keyword;
    },

    /**
     * 입력된 키워드를 저장
     * @param {string} keyword 키워드
     * @public
     */
    set keyword(keyword) {
        this._keyword = keyword;
    }
};
