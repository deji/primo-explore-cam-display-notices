(function(){
"use strict";

var secondToRemoveAlert = 3000;

app.controller('prmLogoAfterController', ['$location', '$mdDialog', '$timeout', '$mdToast', '$translate', 
        function ($location, $mdDialog, $timeout, $mdToast, $translate) {
    var vm = this;

    var notice = '<span translate="nui.idiscovernotice"></span>';
    var templateString = '<div layout="row" layout-align="center center" style="width: 100%" class="bar alert-bar layout-align-center-center layout-row">' 
            + '<span class="md-toast-text">' + notice + '</span>' 
            + '<md-divider class="md-primoExplore-theme"></md-divider>' 
            + '<button class="md-button md-primoExplore-theme md-ink-ripple" type="button" ng-click="ctrl.onDismiss()" aria-label="DISMISS">' 
            + '<span class="ng-scope" translate="nui.message.dismiss">DISMISS</span>' + '</button>' + '</div>';

    console.log('notices');
    
    $translate('nui.idiscovernotice').then((translation) => {
        vm.translation = translation;
        if (vm.translation !== 'idiscoversnotice' && vm.translation.trim() !== "") {
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

        }
    });

}]);

app.component('prmLogoAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmLogoAfterController',
    template: '<div ></div>'
});
})();
