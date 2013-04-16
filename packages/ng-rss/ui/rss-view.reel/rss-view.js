/**
    @module "ui/rss-view.reel"
    @requires montage
    @requires montage/ui/component
*/
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    Promise = require("montage/core/promise").Promise;

/**
    Description TODO
    @class module:"ui/rss-view.reel".RssView
    @extends module:montage/ui/component.Component
*/
exports.RssView = Montage.create(Component, /** @lends module:"ui/rss-view.reel".RssView# */ {
    _article: {value: null},

    article: {
        set: function(value) {
            var self = this;

            if (value) {
                Promise.nextTick(function() {
                    if (self._article) {
                        self.classList.remove(self._article.feed);
                    }
                    self.classList.add(value.feed);

                    self._article = value;
                    value.isRead = true;
                    self.needsDraw = true;
                    self.dispatchOwnPropertyChange("article", value);
                });
            }
        },
        get: function() {
            return this._article;
        }
    },

    _enterFullscreenMode: {
        value: function() {
            this.classList.toggle("fullscreen");
        }
    },

    templateDidLoad: {
        value: function() {
            var element = this.templateObjects.image.element;

            element.addEventListener("touchstart", this._enterFullscreenMode.bind(this), false);
        }
    }
});
