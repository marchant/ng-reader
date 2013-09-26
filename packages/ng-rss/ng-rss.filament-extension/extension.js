var Montage = require("montage/core/core").Montage,
    CoreExtension = require("filament-extension/core/extension").Extension,
    Promise = require("montage/core/promise").Promise,
    libraryItems = require("library-items").libraryItems,
    libraryAdditions = require("library-items").libraryAdditions;

var Extension = exports.Extension = CoreExtension.specialize( {

    constructor: {
        value: function Extension() {
            this.super();
        }
    },

    activate: {
        value: function (application, projectController) {

            Object.keys(libraryItems).forEach(function (moduleId) {
                projectController.registerLibraryItemForModuleId(libraryItems[moduleId], moduleId);
            });

            Object.keys(libraryAdditions).forEach(function (moduleId) {
                projectController.addLibraryItemWithModuleIdForPackage(libraryAdditions[moduleId], moduleId, "ng-rss");
            });

            return Promise.resolve(this);
        }
    },

    deactivate: {
        value: function (application, projectController) {

            Object.keys(libraryItems).forEach(function (moduleId) {
                projectController.unregisterLibraryItemForModuleId(moduleId);
            });

            Object.keys(libraryAdditions).forEach(function (moduleId) {
                projectController.removeLibraryItemWithModuleIdForPackage(libraryAdditions[moduleId], moduleId, "ng-rss");
            });

            return Promise.resolve(this);
        }
    }

});