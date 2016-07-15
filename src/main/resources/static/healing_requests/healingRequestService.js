var HealingRequestService = angular.module('HealingRequestService', [])
    .service('HealingRequestService', ['$http', '$log', '$q', function ($http, $log, $q) {


        return ({
            getAllHealingRequests: getAllHealingRequests
        });


        function getAllHealingRequests(pageNumber) {

            var healRequestsURL = '/healingRequests';

            var request = $http({
                method: 'get',
                url: healRequestsURL,
                params: {
                    pageNumber: pageNumber,
                    pageSize: 5
                }
            });

            return (request.then(handleSuccess, handleError));

        }

        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess(response) {

            return (response.data);

        }




        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError(response) {

            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (!angular.isObject(response.data) ||
                !response.data.message
            ) {

                return ($q.reject("An unknown error occurred."));

            }

            // Otherwise, use expected error message.
            return ($q.reject(response.data.message));

        }

}]);
