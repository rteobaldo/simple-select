(function() {

  'use strict';

  window.SimpleSelect = function(el) {
    this._init(el);
    this._initEventHandlers();
  };

  window.SimpleSelect.prototype = {

    _button: {},
    _simpleSelect: {},
    _optContainer: {},
    _itemSelected: {},
    _itemSelectedValue: {},
    _values: [],

    _init: function(el) {

      /**
      * Elements configuration
      */

      var oldSelect,
          oldSelectOptions,
          options,
          caret;

      oldSelect = document.querySelector(el);
      oldSelectOptions = oldSelect.querySelectorAll('option');

      this._simpleSelect = document.createElement('div');
      this._simpleSelect.className = 'SimpleSelect' + ' ' + oldSelect.className;

      this._optContainer = document.createElement('div');
      this._optContainer.className = 'SimpleSelect-optContainer';

      options = document.createElement('ul');
      options.className = 'SimpleSelect-options';

      // Copy <option>'s from oldSelect to new dropdown element
      for (var i = 0; i < oldSelectOptions.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = oldSelectOptions[i].innerHTML;
        li.value = i;
        options.appendChild(li);
        this._values.push(oldSelectOptions[i].value);
      }

      this._button = document.createElement('button');
      this._button.className = 'SimpleSelect-button';

      this._itemSelected = document.createElement('span');
      this._itemSelected.className = 'SimpleSelect-itemSelected';
      this._itemSelected.innerHTML = options.getElementsByTagName('li')[0].innerHTML;

      this._itemSelectedValue = document.createElement('input');
      this._itemSelectedValue.className = 'SimpleSelect-itemSelectedValue';
      this._itemSelectedValue.type = 'hidden';
      this._itemSelectedValue.value = options.getElementsByTagName('li')[0].value;

      // Adds attributes from oldSelect
      if (oldSelect.hasAttribute('name')) {
        this._itemSelectedValue.setAttribute('name', oldSelect.getAttribute('name'));
      }
      if (oldSelect.hasAttribute('form')) {
        this._itemSelectedValue.setAttribute('form', oldSelect.getAttribute('form'));
      }

      caret = document.createElement('span');
      caret.className = 'SimpleSelect-caret';

      // Join all elements
      this._button.appendChild(this._itemSelected);
      this._button.appendChild(this._itemSelectedValue);
      this._button.appendChild(caret);
      this._simpleSelect.appendChild(this._button);
      this._optContainer.appendChild(options);
      this._simpleSelect.appendChild(this._optContainer);

      // Replace oldSelect with simpleSelect
      oldSelect.parentNode.replaceChild(this._simpleSelect, oldSelect);
    },

    // Returns a object with value and text of selected option
    getSelected: function() {
      return window.asd = { value: this._itemSelectedValue.value, text: this._itemSelected.innerHTML };
    },

    /**
    * Add Event Listners
    */
    _initEventHandlers: function() {

      var showSelectOptionsHandler,
          itemSelectHandler,
          _show,
          _close,
          _this = this;

      showSelectOptionsHandler = function(open) {

        _show = function() {
          _this._addClass(_this._simpleSelect, 'is-open');
          _this._optContainer.style.display = 'block';
        };

        _close = function() {
          _this._removeClass(_this._simpleSelect, 'is-open');
          _this._optContainer.style.display = '';
        };

        if (typeof open === 'undefined') {
          if (_this._hasClass(_this._simpleSelect, 'is-open')) {
            _close();
          } else {
            _show();
          }
        } else {
          if (open) {
            _open();
          } else {
            _close();
          }
        }

      };

      itemSelectHandler = function(event) {
        var itemSelectedExists,
            target = event.target || event.srcElement;

        if (target.nodeName === 'LI') {

          itemSelectedExists = _this._optContainer.querySelector('.is-selected');
          itemSelectedExists && _this._removeClass(itemSelectedExists, 'is-selected');
          target.className = 'is-selected';
          _this._itemSelected.innerHTML = target.innerHTML;
          _this._itemSelectedValue.value = _this._values[target.value];
          showSelectOptionsHandler();
        }
      };

      _this._button.addEventListener('click', function(event) {
        showSelectOptionsHandler();
        event.stopPropagation();
        event.preventDefault();
      });

      _this._optContainer
      .querySelector('.SimpleSelect-options')
      .addEventListener('click', function(event) {
        itemSelectHandler(event);
        event.stopPropagation();
      });

      document.addEventListener('click', function() {
        showSelectOptionsHandler(false);
      });

    },

    /**
    * Class manipulation functions stolen from Arjan Haverkamp (av01d).
    * http://www.avoid.org/?p=78
    */
    _hasClass: function(el, name) {
      return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
    },

    _addClass: function(el, name) {
      if (!this._hasClass(el, name)) {
        el.className += (el.className ? ' ' : '') + name;
      }
    },

    _removeClass: function(el, name) {
      if (this._hasClass(el, name)) {
        el.className = el.className
                         .replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ')
                         .replace(/^\s+|\s+$/g, '');
      }
    }

  };

  /**
   * IE8 Shims
   */
  if (typeof Element.prototype.addEventListener === 'undefined') {
    var addEventListener = function(e, callback) {
      e = 'on' + e;
      return this.attachEvent(e, callback);
    };

    HTMLDocument.prototype.addEventListener = addEventListener;
    Element.prototype.addEventListener = addEventListener;
  }
  if (typeof Event.prototype.stopPropagation === 'undefined') {
    Event.prototype.stopPropagation = function() {
      this.cancelBubble = true;
    };
  }
  if (typeof Event.prototype.preventDefault === 'undefined') {
    Event.prototype.preventDefault = function() {
      this.returnValue = false;
    };
  }

})();
