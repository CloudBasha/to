mainApp.controller('FavoritesCtrl', function($scope, $timeout, $state, $ionicLoading, store, $filter, $http, $rootScope, $ionicScrollDelegate, $ionicModal, $cordovaToast, $ionicPopup, $ionicHistory, $location, $log, DataBaseFactory, $cordovaSQLite, $cordovaEmailComposer, $cordovaCalendar, $cordovaSocialSharing, $cordovaBadge) {

    $scope.favoriteTenders = [];
    $scope.favoritesReadTenderDetails = [];
    $scope.favoritesUnreadTenderDetails = [];
    $scope.noFavorites = false;
    $ionicLoading.show({
        template: '<p class="item-icon-center"><ion-spinner icon="ios"/></p>',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: 10000
    })
    
    switch($rootScope.language) {
        case "ms-MS":
            $scope.title = 'Tender Kegemaran';
            $scope.calendarEventMessage = "Acara Berjaya Ditambah";
            var query = "SELECT * from malayTenders WHERE favorite = 'true'";
            $cordovaSQLite.execute(db, query)
            .then(function (result) {
            if(result.rows.length > 0) {
                for(i = 0; i < result.rows.length; i++)
                {
                    $scope.favoriteTenders.push(result.rows.item(i));
                }
            }
            $log.debug("Tenders from Local Database By Category ", $scope.localInfo);
            $http.get('http://www.cloudbasha.com:8080/fgvedaftar/data/getMalayTender')
            .success(function(data){
                angular.forEach(data, function(server){
                    var tenderIdFromServer = parseInt(server.ows_Id);
                    $log.debug(tenderIdFromServer);
                    var checkServerArray = _.find($scope.favoriteTenders, _.matchesProperty('tenderId', tenderIdFromServer));
                    $log.debug(checkServerArray);
                    if(checkServerArray != undefined)
                    {
                        var tenderObject = {
                            attachmentFileName : server.attachmentFileName,
                            attachmentFileUrl : server.attachmentFileUrl,
                            ows_Attachments : server.ows_Attachments,
                            ows_DeskripsiTender : server.ows_DeskripsiTender,
                            ows_EmelPegawaiUntukDihubungi : server.ows_EmelPegawaiUntukDihubungi,
                            ows_Gred_x003a_Gred : server.ows_Gred_x003a_Gred,
                            ows_HargaJualanNaskahTender : server.ows_HargaJualanNaskahTender,
                            ows_Id : server.ows_Id,
                            ows_KategoriTender : server.ows_KategoriTender,
                            ows_LawatanTapakTaklimat : server.ows_LawatanTapakTaklimat,
                            ows_LokasiLawatanTapakTaklimat : server.ows_LokasiLawatanTapakTaklimat,
                            ows_Lokasi_x002f_Ladang : server.ows_Lokasi_x002f_Ladang,
                            ows_NoTelefon : server.ows_NoTelefon,
                            ows_PegawaiUntukDihubungi : server.ows_PegawaiUntukDihubungi,
                            ows_TahapPendaftaranKategori : server.ows_TahapPendaftaranKategori,
                            ows_TarikhLawatanTapak : server.ows_TarikhLawatanTapak,
                            ows_TarikhTenderDibuka : server.ows_TarikhTenderDibuka,
                            ows_TarikhTenderDitutup : server.ows_TarikhTenderDitutup,
                            ows_TarikhTerbitdiPortal : server.ows_TarikhTerbitdiPortal,
                            ows_TarikhdanMasaPenjualanDokumenTen : server.ows_TarikhdanMasaPenjualanDokumenTen,
                            ows_TenderDipanggilolehSyarikat : server.ows_TenderDipanggilolehSyarikat,
                            ows_TenderOpeningDateDisplay : server.ows_TenderOpeningDateDisplay,
                            ows_Title : server.ows_Title,
                            tenderIdInCms : server.tenderIdInCms,
                            favorite : checkServerArray.favorite,
                            status : checkServerArray.status,

                        }
                        if(checkServerArray.status == 'read')
                        {
                            $scope.favoritesReadTenderDetails.push(tenderObject);

                        }
                        else
                        {
                            $scope.favoritesUnreadTenderDetails.push(tenderObject);
                        }
                    }
                });

                if($scope.favoritesReadTenderDetails.length > 0 || $scope.favoritesUnreadTenderDetails.length > 0)
                {
                    $scope.noFavorites = false;    
                    $ionicLoading.hide();
                }
                else
                {
                    $scope.noFavorites = true;    
                    $ionicLoading.hide();
                }

                $log.debug("Read Favorites ", $scope.favoritesReadTenderDetails);
                $log.debug("Unread Favorites ", $scope.favoritesUnreadTenderDetails);
                getBmUnreadTenderCount();
                getBmUnreadInfoCount();
                $ionicLoading.hide();
            }, function(error){
                $log.debug("Error ", error);    
            });
            }, function (error) {
              console.warn('I found an error');
              console.warn(error);
            });
            break;
        case "en-US":
            $scope.title = 'Favorite Tenders';
            $scope.calendarEventMessage = "Event Added Succesfully";
            var query = "SELECT * from englishTenders WHERE favorite = 'true'";
            $cordovaSQLite.execute(db, query)
            .then(function (result) {
            if(result.rows.length > 0) {
                for(i = 0; i < result.rows.length; i++)
                {
                    $scope.favoriteTenders.push(result.rows.item(i));
                }
            }
            $log.debug("Tenders from Local Database By Category ", $scope.localInfo);
            $http.get('http://www.cloudbasha.com:8080/fgvedaftar/data/getEnglishTender')
            .success(function(data){
                angular.forEach(data, function(server){
                    var tenderIdFromServer = parseInt(server.ows_Id);
                    $log.debug(tenderIdFromServer);
                    var checkServerArray = _.find($scope.favoriteTenders, _.matchesProperty('tenderId', tenderIdFromServer));
                    $log.debug(checkServerArray);
                    if(checkServerArray != undefined)
                    {
                        var tenderObject = {
                            attachmentFileName : server.attachmentFileName,
                            attachmentFileUrl : server.attachmentFileUrl,
                            ows_Attachments : server.ows_Attachments,
                            ows_DeskripsiTender : server.ows_DeskripsiTender,
                            ows_EmelPegawaiUntukDihubungi : server.ows_EmelPegawaiUntukDihubungi,
                            ows_Gred_x003a_Gred : server.ows_Gred_x003a_Gred,
                            ows_HargaJualanNaskahTender : server.ows_HargaJualanNaskahTender,
                            ows_Id : server.ows_Id,
                            ows_KategoriTender : server.ows_KategoriTender,
                            ows_LawatanTapakTaklimat : server.ows_LawatanTapakTaklimat,
                            ows_LokasiLawatanTapakTaklimat : server.ows_LokasiLawatanTapakTaklimat,
                            ows_Lokasi_x002f_Ladang : server.ows_Lokasi_x002f_Ladang,
                            ows_NoTelefon : server.ows_NoTelefon,
                            ows_PegawaiUntukDihubungi : server.ows_PegawaiUntukDihubungi,
                            ows_TahapPendaftaranKategori : server.ows_TahapPendaftaranKategori,
                            ows_TarikhLawatanTapak : server.ows_TarikhLawatanTapak,
                            ows_TarikhTenderDibuka : server.ows_TarikhTenderDibuka,
                            ows_TarikhTenderDitutup : server.ows_TarikhTenderDitutup,
                            ows_TarikhTerbitdiPortal : server.ows_TarikhTerbitdiPortal,
                            ows_TarikhdanMasaPenjualanDokumenTen : server.ows_TarikhdanMasaPenjualanDokumenTen,
                            ows_TenderDipanggilolehSyarikat : server.ows_TenderDipanggilolehSyarikat,
                            ows_TenderOpeningDateDisplay : server.ows_TenderOpeningDateDisplay,
                            ows_Title : server.ows_Title,
                            tenderIdInCms : server.tenderIdInCms,
                            favorite : checkServerArray.favorite,
                            status : checkServerArray.status,

                        }
                        if(checkServerArray.status == 'read')
                        {
                            $scope.favoritesReadTenderDetails.push(tenderObject);

                        }
                        else
                        {
                            $scope.favoritesUnreadTenderDetails.push(tenderObject);
                        }
                    }
                });

                if($scope.favoritesReadTenderDetails.length > 0 || $scope.favoritesUnreadTenderDetails.length > 0)
                {
                    $scope.noFavorites = false;    
                }
                else
                {
                    $scope.noFavorites = true;    
                }

                $log.debug("Read Favorites ", $scope.favoritesReadTenderDetails);
                $log.debug("Unread Favorites ", $scope.favoritesUnreadTenderDetails);
                getEnUnreadTenderCount();
                getEnUnreadInfoCount();
                $ionicLoading.hide();
            }, function(error){
                $log.debug("Error ", error);    
            });
            }, function (error) {
              console.warn('I found an error');
              console.warn(error);
            });
            break;
    }
    
    $scope.setUnreadFavorite = function(index){
        switch($rootScope.language) {
            case "ms-MS":
                if($scope.favoritesUnreadTenderDetails[index].favorite == 'false')
                {
                    var query = "update malayTenders set favorite = 'true' where tenderId="+$scope.favoritesUnreadTenderDetails[index].ows_Id;
                    $cordovaSQLite.execute(db, query)
                    .then(function (result) {
                        $log.debug("Tender Favorite Changed to True in Local Database");
                        $scope.favoritesUnreadTenderDetails[index].favorite = 'true'
                    }, function (error) {
                      console.warn('I found an error');
                      console.warn(error);
                    });
                }
                else
                {
                    var query = "update malayTenders set favorite = 'false' where tenderId="+$scope.favoritesUnreadTenderDetails[index].ows_Id;
                    $cordovaSQLite.execute(db, query)
                    .then(function (result) {
                        $log.debug("Tender Favorite Changed to False in Local Database");
                        $scope.favoritesUnreadTenderDetails[index].favorite = 'false'
                    }, function (error) {
                      console.warn('I found an error');
                      console.warn(error);
                    });
                }
                break;
            case "en-US":
                if($scope.favoritesUnreadTenderDetails[index].favorite == 'false')
                {
                    var query = "update englishTenders set favorite = 'true' where tenderId="+$scope.favoritesUnreadTenderDetails[index].ows_Id;
                    $cordovaSQLite.execute(db, query)
                    .then(function (result) {
                        $log.debug("Tender Favorite Changed to True in Local Database");
                        $scope.favoritesUnreadTenderDetails[index].favorite = 'true'
                    }, function (error) {
                      console.warn('I found an error');
                      console.warn(error);
                    });
                }
                else
                {
                    var query = "update englishTenders set favorite = 'false' where tenderId="+$scope.favoritesUnreadTenderDetails[index].ows_Id;
                    $cordovaSQLite.execute(db, query)
                    .then(function (result) {
                        $log.debug("Tender Favorite Changed to False in Local Database");
                        $scope.favoritesUnreadTenderDetails[index].favorite = 'false'
                    }, function (error) {
                      console.warn('I found an error');
                      console.warn(error);
                    });
                }
                break;
        }
    }
    
    $scope.setReadFavorite = function(index){
        switch($rootScope.language) {
            case "ms-MS":
                if($scope.favoritesReadTenderDetails[index].favorite == 'false')
                {
                    var query = "update malayTenders set favorite = 'true' where tenderId="+$scope.favoritesReadTenderDetails[index].ows_Id;
                    $cordovaSQLite.execute(db, query)
                    .then(function (result) {
                        $log.debug("Tender Favorite Changed to True in Local Database");
                        $scope.favoritesReadTenderDetails[index].favorite = 'true'
                    }, function (error) {
                      console.warn('I found an error');
                      console.warn(error);
                    });
                }
                else
                {
                    var query = "update malayTenders set favorite = 'false' where tenderId="+$scope.favoritesReadTenderDetails[index].ows_Id;
                    $cordovaSQLite.execute(db, query)
                    .then(function (result) {
                        $log.debug("Tender Favorite Changed to False in Local Database");
                        $scope.favoritesReadTenderDetails[index].favorite = 'false'
                    }, function (error) {
                      console.warn('I found an error');
                      console.warn(error);
                    });
                }
                break;
            case "en-US":
                if($scope.favoritesReadTenderDetails[index].favorite == 'false')
                {
                    var query = "update englishTenders set favorite = 'true' where tenderId="+$scope.favoritesReadTenderDetails[index].ows_Id;
                    $cordovaSQLite.execute(db, query)
                    .then(function (result) {
                        $log.debug("Tender Favorite Changed to True in Local Database");
                        $scope.favoritesReadTenderDetails[index].favorite = 'true'
                    }, function (error) {
                      console.warn('I found an error');
                      console.warn(error);
                    });
                }
                else
                {
                    var query = "update englishTenders set favorite = 'false' where tenderId="+$scope.favoritesReadTenderDetails[index].ows_Id;
                    $cordovaSQLite.execute(db, query)
                    .then(function (result) {
                        $log.debug("Tender Favorite Changed to False in Local Database");
                        $scope.favoritesReadTenderDetails[index].favorite = 'false'
                    }, function (error) {
                      console.warn('I found an error');
                      console.warn(error);
                    });
                }
                break;
        }
        
    }
    
    $scope.goToUnreadTenderDetails = function(index){
        $state.go('app.enTenderDetails', {obj: $scope.favoritesUnreadTenderDetails[index]});
    }
    
    $scope.goToReadTenderDetails = function(index){
        $state.go('app.enTenderDetails', {obj: $scope.favoritesReadTenderDetails[index]});
    }
    
    $scope.shareUnreadTenderViaEmail = function(index){
        var formatedEmailAddresses = [];
        var serverEmail = $scope.favoritesUnreadTenderDetails[index].ows_EmelPegawaiUntukDihubungi;
        var splitEmailFromServer = serverEmail.split(" ");
        for(i=0;i<splitEmailFromServer.length;i++)
        {
            validateEmail(splitEmailFromServer[i]);
            if(validateEmail(splitEmailFromServer[i]) == true)
            {
                formatedEmailAddresses.push(splitEmailFromServer[i]);
            }
        }
        $log.debug("Email From Server ", splitEmailFromServer);
        $log.debug("Formatted Email ", formatedEmailAddresses);
        $cordovaEmailComposer.isAvailable().then(function() {
            $log.debug("Found Email ");     
            var email = {
                to: formatedEmailAddresses,
                subject: $scope.favoritesUnreadTenderDetails[index].ows_Title,
                isHtml: true
            };

            $cordovaEmailComposer.open(email).then(function () {
                $log.debug("Opening Email");
            }, function(err){
                $log.debug("Cancel Email Client");
            }); 
         }, function (err) {
            $ionicPopup.alert({
                title: 'Email Composer Error',
                template: 'A031 - There are no registered Email Accounts on this device. Please add an Email account to this device before using this feature.'
            });
            $log.debug("No Email ");
         });
    }
    
    $scope.shareReadTenderViaEmail = function(index){
        var formatedEmailAddresses = [];
        var serverEmail = $scope.favoritesReadTenderDetails[index].ows_EmelPegawaiUntukDihubungi;
        var splitEmailFromServer = serverEmail.split(" ");
        for(i=0;i<splitEmailFromServer.length;i++)
        {
            validateEmail(splitEmailFromServer[i]);
            if(validateEmail(splitEmailFromServer[i]) == true)
            {
                formatedEmailAddresses.push(splitEmailFromServer[i]);
            }
        }
        $log.debug("Email From Server ", splitEmailFromServer);
        $log.debug("Formatted Email ", formatedEmailAddresses);
        $cordovaEmailComposer.isAvailable().then(function() {
            $log.debug("Found Email ");     
            var email = {
                to: formatedEmailAddresses,
                subject: $scope.favoritesReadTenderDetails[index].ows_Title,
                isHtml: true
            };

            $cordovaEmailComposer.open(email).then(function () {
                $log.debug("Opening Email");
            }, function(err){
                $log.debug("Cancel Email Client");
            }); 
         }, function (err) {
            $ionicPopup.alert({
                title: 'Email Composer Error',
                template: 'A031 - There are no registered Email Accounts on this device. Please add an Email account to this device before using this feature.'
            });
            $log.debug("No Email ");
         });
    }
    
    $scope.addUnreadTenderEvent = function(index){
        var startFullDate = $scope.favoritesUnreadTenderDetails[index].ows_TarikhTenderDibuka.split(" ");
        $log.debug(startFullDate);
        var startFullDate2 = startFullDate[0].split("-");
        $log.debug(startFullDate2);
        var startTime = startFullDate[1].split(":");
        $log.debug(startTime);
        
        var closeFullDate = $scope.favoritesUnreadTenderDetails[index].ows_TarikhTenderDitutup.split(" ");
        $log.debug(closeFullDate);
        var closeFullDate2 = closeFullDate[0].split("-");
        $log.debug(closeFullDate2);
        var closeTime = closeFullDate[1].split(":");
        $log.debug(closeTime);
        
        switch($rootScope.platform) {
            case "Android":
                $cordovaCalendar.createEventInteractively({
                    title: $scope.favoritesUnreadTenderDetails[index].ows_Title,
                    location: $scope.favoritesUnreadTenderDetails[index].ows_Lokasi_x002f_Ladang,
                    startDate: new Date(startFullDate2[0], startFullDate2[1]-1, startFullDate2[2], startTime[0], startTime[1], 0, 0, 0),
                    endDate: new Date(startFullDate2[0], startFullDate2[1]-1, parseInt(startFullDate2[2]), startTime[0], startTime[1], 0, 0, 0)
                }).then(function (result) {
                    $log.debug("Event Created", result);
                }, function (err) {
                // error
                });    

                $cordovaCalendar.createEventInteractively({
                    title: $scope.favoritesUnreadTenderDetails[index].ows_Title,
                    location: $scope.favoritesUnreadTenderDetails[index].ows_Lokasi_x002f_Ladang,
                    startDate: new Date(closeFullDate2[0], closeFullDate2[1]-1, closeFullDate2[2], closeTime[0], closeTime[1], 0, 0, 0),
                    endDate: new Date(closeFullDate2[0], closeFullDate2[1]-1, parseInt(closeFullDate2[2]), closeTime[0], closeTime[1], 0, 0, 0)
                }).then(function (result) {
                    $log.debug("Event Created", result);
                }, function (err) {
                // error
                });
                break;
            case "iOS":
                $cordovaCalendar.createEvent({
                    title: $scope.favoritesUnreadTenderDetails[index].ows_Title,
                    location: $scope.favoritesUnreadTenderDetails[index].ows_Lokasi_x002f_Ladang,
                    startDate: new Date(startFullDate2[0], startFullDate2[1]-1, startFullDate2[2], startTime[0], startTime[1], 0, 0, 0),
                    endDate: new Date(startFullDate2[0], startFullDate2[1]-1, parseInt(startFullDate2[2]), startTime[0], startTime[1], 0, 0, 0)
                }).then(function (result) {
                    $log.debug("Event Created", result);
                    $cordovaCalendar.createEvent({
                        title: $scope.favoritesUnreadTenderDetails[index].ows_Title,
                        location: $scope.favoritesUnreadTenderDetails[index].ows_Lokasi_x002f_Ladang,
                        startDate: new Date(closeFullDate2[0], closeFullDate2[1]-1, closeFullDate2[2], closeTime[0], closeTime[1], 0, 0, 0),
                        endDate: new Date(closeFullDate2[0], closeFullDate2[1]-1, parseInt(closeFullDate2[2]), closeTime[0], closeTime[1], 0, 0, 0)
                    }).then(function (result) {
                        $log.debug("Event Created", result);
                        $ionicPopup.alert({
                            title: 'Calendar Event',
                            template: $scope.calendarEventMessage
                        });
                    }, function (err) {
                    // error
                    });
                }, function (err) {
                // error
                });    

            break;
        }  
    }
    
    $scope.addReadTenderEvent = function(index){
        var startFullDate = $scope.favoritesReadTenderDetails[index].ows_TarikhTenderDibuka.split(" ");
        $log.debug(startFullDate);
        var startFullDate2 = startFullDate[0].split("-");
        $log.debug(startFullDate2);
        var startTime = startFullDate[1].split(":");
        $log.debug(startTime);
        
        var closeFullDate = $scope.favoritesReadTenderDetails[index].ows_TarikhTenderDitutup.split(" ");
        $log.debug(closeFullDate);
        var closeFullDate2 = closeFullDate[0].split("-");
        $log.debug(closeFullDate2);
        var closeTime = closeFullDate[1].split(":");
        $log.debug(closeTime);
        
        switch($rootScope.platform) {
            case "Android":
                $cordovaCalendar.createEventInteractively({
                    title: $scope.favoritesReadTenderDetails[index].ows_Title,
                    location: $scope.favoritesReadTenderDetails[index].ows_Lokasi_x002f_Ladang,
                    startDate: new Date(startFullDate2[0], startFullDate2[1]-1, startFullDate2[2], startTime[0], startTime[1], 0, 0, 0),
                    endDate: new Date(startFullDate2[0], startFullDate2[1]-1, parseInt(startFullDate2[2]), startTime[0], startTime[1], 0, 0, 0)
                }).then(function (result) {
                    $log.debug("Event Created", result);
                }, function (err) {
                // error
                });    

                $cordovaCalendar.createEventInteractively({
                    title: $scope.favoritesReadTenderDetails[index].ows_Title,
                    location: $scope.favoritesReadTenderDetails[index].ows_Lokasi_x002f_Ladang,
                    startDate: new Date(closeFullDate2[0], closeFullDate2[1]-1, closeFullDate2[2], closeTime[0], closeTime[1], 0, 0, 0),
                    endDate: new Date(closeFullDate2[0], closeFullDate2[1]-1, parseInt(closeFullDate2[2]), closeTime[0], closeTime[1], 0, 0, 0)
                }).then(function (result) {
                    $log.debug("Event Created", result);
                }, function (err) {
                // error
                });
                break;
            case "iOS":
                $cordovaCalendar.createEvent({
                    title: $scope.favoritesReadTenderDetails[index].ows_Title,
                    location: $scope.favoritesReadTenderDetails[index].ows_Lokasi_x002f_Ladang,
                    startDate: new Date(startFullDate2[0], startFullDate2[1]-1, startFullDate2[2], startTime[0], startTime[1], 0, 0, 0),
                    endDate: new Date(startFullDate2[0], startFullDate2[1]-1, parseInt(startFullDate2[2]), startTime[0], startTime[1], 0, 0, 0)
                }).then(function (result) {
                    $log.debug("Event Created", result);
                    $cordovaCalendar.createEvent({
                        title: $scope.favoritesReadTenderDetails[index].ows_Title,
                        location: $scope.favoritesReadTenderDetails[index].ows_Lokasi_x002f_Ladang,
                        startDate: new Date(closeFullDate2[0], closeFullDate2[1]-1, closeFullDate2[2], closeTime[0], closeTime[1], 0, 0, 0),
                        endDate: new Date(closeFullDate2[0], closeFullDate2[1]-1, parseInt(closeFullDate2[2]), closeTime[0], closeTime[1], 0, 0, 0)
                    }).then(function (result) {
                        $log.debug("Event Created", result);
                        $ionicPopup.alert({
                            title: 'Calendar Event',
                            template: $scope.calendarEventMessage
                        });
                    }, function (err) {
                    // error
                    });
                }, function (err) {
                // error
                });    

            break;
        }  
    }
    
    $scope.shareUnreadTender = function(index){      
        var message = "Tender Title - " + $scope.favoritesUnreadTenderDetails[index].ows_Title + "\n\nTender Opening Date - " + $scope.favoritesUnreadTenderDetails[index].ows_TarikhTenderDibuka + "\n\nTender Closing Date - " + $scope.favoritesUnreadTenderDetails[index].ows_TarikhTenderDitutup + "\n\n" + $scope.favoritesUnreadTenderDetails[index].attachmentFileUrl;
        var subject = $scope.favoritesUnreadTenderDetails[index].ows_Title;
        $cordovaSocialSharing.share(message, subject)
        .then(function (result) {
        $log.debug("Share Successful", result);
      }, function (err) {
        // error
      });    
    }
    
    $scope.shareReadTender = function(index){      
        var message = "Tender Title - " + $scope.favoritesReadTenderDetails[index].ows_Title + "\n\nTender Opening Date - " + $scope.favoritesReadTenderDetails[index].ows_TarikhTenderDibuka + "\n\nTender Closing Date - " + $scope.favoritesReadTenderDetails[index].ows_TarikhTenderDitutup + "\n\n" + $scope.favoritesReadTenderDetails[index].attachmentFileUrl;
        var subject = $scope.favoritesReadTenderDetails[index].ows_Title;
        $cordovaSocialSharing.share(message, subject)
        .then(function (result) {
        $log.debug("Share Successful", result);
      }, function (err) {
        // error
      });    
    }
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    
    function getBmUnreadTenderCount(){
        var dateNow = new Date().getTime()/1000;
        $log.debug("TimeStamp ", dateNow);
        var query = "SELECT * from malayTenders WHERE status = 'unread'";
        $cordovaSQLite.execute(db, query)
        .then(function (result) 
        {
            var i, len, allItems = [];
            for(i = 0, len = result.rows.length; i < len; i++)
            {
                if((Date.parse(result.rows.item(i).closingDate).getTime()/1000) > dateNow)
                {
                    allItems.push(result.rows.item(i));
                }
            }
            $scope.tenderBadgeActive = false; 
            $scope.unreadTenderCountEn = allItems.length;
            if( $scope.unreadTenderCountEn != 0)
            {
                $scope.tenderBadgeActive = true;    
            }
            else
            {
                $scope.tenderBadgeActive = false;    
            }
            $log.debug('Unread Tender Count ', $scope.unreadTenderCountEn);
            $timeout(function(){
                setOutterBadgeCount();    
            }, 1000);
            $ionicLoading.hide();
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
        });
    }

    function getBmUnreadInfoCount(){
        var query = "SELECT * from malayInfo WHERE status = 'unread'";
        $cordovaSQLite.execute(db2, query)
        .then(function (result) 
        {
            var i, len, allInfo = [];
            for(i = 0, len = result.rows.length; i < len; i++)
            {
                allInfo.push(result.rows.item(i));
            }
            $scope.InfoBadgeActive = false; 
            $scope.unreadInfoCountEn = allInfo.length;
            if( $scope.unreadInfoCountEn != 0)
            {
                $scope.InfoBadgeActive = true;    
            }
            else
            {
                $scope.InfoBadgeActive = false;    
            }
            $log.debug('Unread Info Count ', $scope.unreadInfoCountEn);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
        });
    }


    function getEnUnreadTenderCount(){
        var dateNow = new Date().getTime()/1000;
        $log.debug("TimeStamp ", dateNow);
        var query = "SELECT * from englishTenders WHERE status = 'unread'";
        $cordovaSQLite.execute(db, query)
        .then(function (result) 
        {
            var i, len, allItems = [];
            for(i = 0, len = result.rows.length; i < len; i++)
            {
                if((Date.parse(result.rows.item(i).closingDate).getTime()/1000) > dateNow)
                {
                    allItems.push(result.rows.item(i));
                }
            }
            $scope.tenderBadgeActive = false; 
            $scope.unreadTenderCountEn = allItems.length;
            if( $scope.unreadTenderCountEn != 0)
            {
                $scope.tenderBadgeActive = true;    
            }
            else
            {
                $scope.tenderBadgeActive = false;    
            }
            $log.debug('Unread Tender Count ', $scope.unreadTenderCountEn);
            $timeout(function(){
                setOutterBadgeCount();    
            }, 1000);
            $ionicLoading.hide();
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
        });
    }

    function getEnUnreadInfoCount(){
        var query = "SELECT * from englishInfo WHERE status = 'unread'";
        $cordovaSQLite.execute(db2, query)
        .then(function (result) 
        {
            var i, len, allInfo = [];
            for(i = 0, len = result.rows.length; i < len; i++)
            {
                allInfo.push(result.rows.item(i));
            }
            $scope.InfoBadgeActive = false; 
            $scope.unreadInfoCountEn = allInfo.length;
            if( $scope.unreadInfoCountEn != 0)
            {
                $scope.InfoBadgeActive = true;    
            }
            else
            {
                $scope.InfoBadgeActive = false;    
            }
            $log.debug('Unread Info Count ', $scope.unreadInfoCountEn);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
        });
    }

    function setOutterBadgeCount(){
        var outterBadgeCount = $scope.unreadInfoCountEn + $scope.unreadTenderCountEn;
        $cordovaBadge.hasPermission().then(function(yes) {
            $cordovaBadge.set(outterBadgeCount)
            .then(function() {
            $log.debug("Outter badge set", outterBadgeCount);
            }, function(err) {
            $log.debug(err);
            });    
        }, function(no) {

        });
    }
});
