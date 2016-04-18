angular
  .module('libraryApp')
  .controller('BooksIndexController', BooksIndexController);

BooksIndexController.$inject=['$http'];
function BooksIndexController( $http ) {
  var vm = this;
  console.log(vm.books);
  vm.books = [];
  var apiEndPoint = 'https://super-crud.herokuapp.com/books';

  $http({
    method: 'GET',
    url: apiEndPoint
  }).then(function successCallback(response) {
    console.log(response.data.books);
    vm.books = response.data.books;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });
}
