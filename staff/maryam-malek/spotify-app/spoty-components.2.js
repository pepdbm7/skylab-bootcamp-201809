function Component(tag) {
    this.element = $('<' + tag + '>');
    
}

// Component.prototype.show = function () {
//     //this.element.style.display = 'block';
//     $(this.element).css('display', 'block');
// };

// Component.prototype.hide = function () {
//     //this.element.style.display = 'none';
//     $(this.element).css('display', 'none');

// };

function Panel(title, tag, classN) {
    Component.call(this, tag);

    $(this.element).addClass(classN);
    $(this.element).addClass('panel');
    $(this.element).addClass('container-fluid');

    this.title = $('<h2>');
    $(this.title).text(title);
    $(this.title).addClass('panel__title');

    $(this.element).append(this.title);
}

Panel.prototype = Object.create(Component.prototype);
Panel.prototype.constructor = Panel;

function List(title, tag, classN) {
    Panel.call(this, title, tag, classN);

    $(this.element).addClass('dropdown');

    $(this.title).addClass('list__title');

    this.image = $('<img>');
    $(this.element).append(this.image);
    this.titleBtn = $('<button>');
    $(this.titleBtn).attr('type', 'button dropdown-toggle');
    $(this.titleBtn).addClass('btn btn-outline-info mb-2');
    $(this.titleBtn).text('Search');

    this.body = $('<ul>');
    $(this.body).addClass('list__body dropdown-menu');
    $(this.element).append(this.body);
}

List.prototype = Object.create(Panel.prototype);
List.prototype.constructor = List;

function Search(title, tag, classN) {
    Panel.call(this, title, tag, classN);


    $(this.title).addClass('search__title');

    $(this.body).addClass('list__body');

    this.form = $('<form>');
    // $(this.form).addClass('form-inline');

    // this.div = $('<div>');
    // $(this.div).addClass('form-group mb-2');

    this.input = $('<input>');
    $(this.input).attr('type', 'text')
    // $(this.input).addClass('form-control');

    $(this.form).append(this.input);
    // $(this.div).append(this.input);

    this.searchBtn = $('<button>');
    $(this.searchBtn).attr('type', 'submit');
    $(this.searchBtn).addClass('btn btn-outline-info mb-2');
    $(this.searchBtn).text('Search');

    $(this.form).append(this.searchBtn);

    // $(this.accept).click(function(){
    //     $(this.element).css('display', 'none');

    //     callback();
    // }.bind(this));

    $(this.searchBtn).addClass('search__button');

    $(this.element).append(this.form);


}

Search.prototype = Object.create(Panel.prototype);
Search.prototype.constructor = Search;

function Player(title, tag, classN) {
    Panel.call(this, title, tag, classN);

    $(this.title).addClass('player__title');

    this.audio = $('<audio>');

    $(this.audio).attr('controls', 'controls');

    $(this.audio).addClass('audio');
    $(this.element).append(this.audio);
}

Player.prototype = Object.create(Panel.prototype);
Player.prototype.constructor = Player;
