angular.module('libraryApp')
       .controller('BooksShowController', BooksShowController);

var apiEndPoint = 'https://super-crud.herokuapp.com/books';

BooksShowController.$inject=['$http', '$routeParams', '$location'];
function BooksShowController($http, $routeParams, $location) {
  var vm = this;
  var bookId = $routeParams.id;
  $http({
    method: 'GET',
    url: apiEndPoint+bookId
  }).then(onBookShowSuccess, onError);


  function onBookShowSuccess(response){
    vm.book = response.data;
  }
  function onError(error){
    console.log('It broken now. Here is error: ', error);
  }

  vm.updateBook = function(bookToUpdate) {
    $http({
      method: 'PUT',
      url: apiEndPoint + bookToUpdate._id,
      data: {
        title : bookToUpdate.title,
        author : bookToUpdate.author,
        image : bookToUpdate.image,
        releaseDate : bookToUpdate.releaseDate
      }
    }).then(onBookUpdateSuccess, onError);

    function onBookUpdateSuccess(response){
      vm.book = response.data;
      $location.path('/');
    }
  };

  vm.deleteBook = function(book) {
    $http({
      method: 'DELETE',
      url: apiEndPoint + book._id,
    }).then(onBookDeleteSuccess, onError);

    function onBookDeleteSuccess(response){
      $location.path('/');
    }
  };
}
