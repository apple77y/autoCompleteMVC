/**
 * 검색 결과 컨트롤러
 * @param {object} model 모델 객체
 * @param {object} view 뷰 객체
 * @returns {nts.controller.autoCompleteController}
 * @constructor
 */
nts.controller.autoCompleteController = function (model, view) {
    var me = this;

    if (!(me instanceof nts.controller.autoCompleteController)) {
        return new nts.controller.autoCompleteController(model, view);
    }

    me._model = model;
    me._view = view;

    me._bindViewActions();
    me._bindModelEvents();

    return me;
};

nts.controller.autoCompleteController.prototype = {

    /**
     * 뷰 엘리먼트에 이벤트를 연결
     * @private
     */
    _bindViewActions: function () {
        this._view._inputBox.on('keyup', this._onKeyupChange.bind(this));
        this._view._inputBox.on('click', this._onClickChange.bind(this));
    },

    /**
     * 모델에 이벤트를 연결
     * @private
     */
    _bindModelEvents: function () {
        this._model.addEventListener('update', this._onUpdateModel.bind(this));
    },

    /**
     * 키워드가 입력 되었을 때 실행
     * @param {Event} e 이벤트 객체
     * @private
     */
    _onKeyupChange: function (e) {
        var keyword = e.target.value,
            keyCode = e.keyCode;

        if (keyword !== this._model.getKeyword()) {
            this._model.setKeyword(keyword);
            this._model.callData();
        }

        this._view.changeIndex(keyCode);
    },

    /**
     * 인풋박스에 마우스 클릭을 할 때 실행
     * @private
     */
    _onClickChange: function () {
        this._view.initSearchList();
    },

    /**
     * 모델이 업데이트 되었을 때 실행
     * @private
     */
    _onUpdateModel: function () {
        this._view.render(this._model.getData(), this._model.getKeyword());
    }
};
