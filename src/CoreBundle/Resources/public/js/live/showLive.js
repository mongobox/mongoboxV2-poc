var Live = function (btnId, idContainer) {
    this.toggle = $("#" + btnId);
    this.container = $("#" + idContainer);

    this.toggle.click(this.display.bind(this));
};

Live.prototype.display = function () {
    if (this.container.hasClass('show')) {
        this.container.removeClass("show");
        this.toggle.removeClass("active");
    }
    else {
        this.container.addClass("show");
        this.toggle.addClass("active");
    }

};

$(document).ready(function () {
    var live = new Live("see-live", "main-content");
});
