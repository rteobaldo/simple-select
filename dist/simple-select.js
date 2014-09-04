(function () {

  "use strict";

  window.SimpleSelect = function (el) {
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

    _init: function (el) {
      /**
       * Elements configuration
       */

      var oldSelect = document.querySelector(el);
      var oldSelectOptions = oldSelect.querySelectorAll('option');

      this._simpleSelect = document.createElement('div');
      this._simpleSelect.className = 'SimpleSelect' + ' ' + oldSelect.className;

      this._optContainer = document.createElement('div');
      this._optContainer.className = 'SimpleSelect-optContainer';

      var options = document.createElement('ul');
      options.className = 'SimpleSelect-options';

      // Copy <option>'s from oldSelect to new dropdown element
      for (var i = 0; i < oldSelectOptions.length; i++) {
        var li = document.createElement('li');
        li.textContent = oldSelectOptions[i].textContent;
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
      if (oldSelect.hasAttribute('name')) {
        this._itemSelectedValue.setAttribute( 'name', oldSelect.getAttribute('name') );
      }
      if (oldSelect.hasAttribute('form')) {
        this._itemSelectedValue.setAttribute( 'form', oldSelect.getAttribute('form') );
      }

      var caret = document.createElement('span');
      caret.className = 'SimpleSelect-caret';


      /**
       * Join all elements (Megazord?!)
       * (Don't change order of appendChild's!)
       */

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
    getSelected: function () {
      return { value: this._itemSelectedValue.value, text: this._itemSelected.innerHTML };
    },

    /**
     * Add Event Listners
     */
    _initEventHandlers: function () {

      var _this = this;

      var showSelectOptionsHandler = function (open) {

        var _show = function () {
          _this._addClass(_this._simpleSelect, 'is-open');
          _this._optContainer.style.display = 'block';
        };

        var _close = function () {
          _this._removeClass(_this._simpleSelect, 'is-open');
          _this._optContainer.style.display = '';
        };

        if ( _this._hasClass(_this._simpleSelect, 'is-open') ) {
          _close();
        } else {
          _show();
        }

        if (open === false) {
          _close();
        } else if (open === true) {
          _open();
        }

      };

      var itemSelectHandler = function (event) {
        if (event.target.tagName === 'LI') {
          var itemSelectedExists = _this._optContainer.querySelector('.is-selected');
          itemSelectedExists && _this._removeClass(itemSelectedExists, 'is-selected');

          var target = event.target;
          target.className = 'is-selected';
          _this._itemSelected.innerHTML = target.innerHTML;
          _this._itemSelectedValue.value = _this._values[target.value];
          showSelectOptionsHandler();
        }
      };

      // IE8 Hack
      if (typeof Element.prototype.addEventListener === 'undefined') {
        Element.prototype.addEventListener = function (e, callback) {
          e = 'on' + e;
          return this.attachEvent(e, callback);
        };
      }

      _this._button.addEventListener('click', function (event) {
        showSelectOptionsHandler();
        event.stopPropagation();
        return false;
      });

      _this._optContainer
      .querySelector('.SimpleSelect-options')
      .addEventListener('click', function (event) {
        itemSelectHandler(event);
      });

      document.addEventListener('click', function () {
        showSelectOptionsHandler(false);
      });

    },

    /**
     * Class manipulation functions stolen from Arjan Haverkamp (av01d).
     * http://www.avoid.org/?p=78
     */
    _hasClass: function (el, name) {
      return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
    },

    _addClass: function (el, name) {
      if (!this._hasClass(el, name)) {
        el.className += (el.className ? ' ' : '') + name;
      }
    },

    _removeClass: function (el, name) {
      if (this._hasClass(el, name)) {
        el.className = el.className
                         .replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ')
                         .replace(/^\s+|\s+$/g, '');
      }
    }


  };


})();
