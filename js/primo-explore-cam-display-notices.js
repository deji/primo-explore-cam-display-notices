(function(){
"use strict";

var secondToRemoveAlert = 120;

app.controller('PrmSearchbarAfterController', ['$location', '$mdDialog', '$timeout', '$mdToast', function ($location, $mdDialog, $timeout, $mdToast) {
    var vm = this;

    var templateString = '<div layout="row" layout-align="center center" style="width: 100%" class="bar alert-bar layout-align-center-center layout-row">' + '<span class="md-toast-text">' + '<span>Login to iDiscover with Raven is not currently available. Please log in with the <em>Other users of the library</em> option and use your library barcode and surname</span>' + '</span>' + '<md-divider class="md-primoExplore-theme"></md-divider>' + '<button class="md-button md-primoExplore-theme md-ink-ripple" type="button" ng-click="ctrl.onDismiss()" aria-label="DISMISS">' + '<span class="ng-scope" translate="nui.message.dismiss">DISMISS</span>' + '</button>' + '</div>';

    $mdToast.show({
        controllerAs: 'ctrl',
        controller: function controller() {
            this.onDismiss = function () {
                $mdToast.hide();
            };
            this.getPlaceHolders = function (cur) {
                var placeHolders = [[{
                    prefix: '',
                    code: cur,
                    tag: { span: ['class=""'] }
                }]];

                return placeHolders;
            };
        },
        hideDelay: secondToRemoveAlert * 1000,
        position: 'top right',
        template: templateString
    }).then(function () {
        vm.onToastClose();
    });

    //Following code fixes a bug with mdToast who places "position: relative" on root element but doesn't remove it once it is closed.
    //This causes md-dialog to not display correctly.
    vm.onToastClose = function () {
        angular.element(document.querySelector("primo-explore")).css('position', '');
    };

}]);

app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'PrmSearchbarAfterController',
    template: '<div ></div>'
});
})();
