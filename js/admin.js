// const
const API_URI = "http://103.82.21.145:8003";
// f
var listBook = [];
var listAuthor = [];
var listPublisher = [];
var listCategory = [];

// on ready
$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $("#navigation").toggleClass("hidden-xs");
  });
});

$(document).ready(function () {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

$(document).ready(function () {
  getBooksFromAPI();
  getAuthorFromAPI();
  getCategoryFromAPI();
  getPublisherFromAPI();
});

// function API
function getBooksFromAPI() {
  let url = API_URI + "/book";
  $.ajax({
    url: url,
    type: "GET",
    success: function (data, textStatus, xhr) {
      listBook = data;
      showListBook();
    },
    error(jqXHR, textStatus, errorThrown) {
      alert("Error when loading data");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}

function getAuthorFromAPI() {
  let url = API_URI + "/author";
  $.ajax({
    url: url,
    type: "GET",
    success: function (data, textStatus, xhr) {
      listAuthor = data;
      //   showListBook();
      addSelectAuthor();
    },
    error(jqXHR, textStatus, errorThrown) {
      alert("Error when loading data");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}

function getPublisherFromAPI() {
  let url = API_URI + "/publisher";
  $.ajax({
    url: url,
    type: "GET",
    success: function (data, textStatus, xhr) {
      listPublisher = data;
      //   showListBook();
      addSelectPublisher();
    },
    error(jqXHR, textStatus, errorThrown) {
      alert("Error when loading data");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}

function getCategoryFromAPI() {
  let url = API_URI + "/category";
  $.ajax({
    url: url,
    type: "GET",
    success: function (data, textStatus, xhr) {
      listCategory = data;
      addSelectCategory();
    },
    error(jqXHR, textStatus, errorThrown) {
      alert("Error when loading data");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}

function sendCreateBook() {}

function sendDeleteBook(id) {}

/// display data
function showListBook() {
  $("#myTable").empty();

  listBook.forEach((book) => $("#myTable").append(book2row(book)));
}

// book - modal
function addSelectAuthor() {
  $("#book-select-author").empty();

  listAuthor.forEach((author) =>
    $("#book-select-author").append(author2option(author))
  );
}

function addSelectCategory() {
  $("#book-select-category").empty();
  listCategory.forEach((category) =>
    $("#book-select-category").append(category2option(category))
  );
}

function addSelectPublisher() {
  $("#book-select-publisher").empty();
  listPublisher.forEach((publisher) =>
    $("#book-select-publisher").append(publisher2option(publisher))
  );
}

// gen html code
function book2row(book) {
  return `<tr>
  <td>${book.id}</td>
  <td>${book.category}</td>
  <td><img src="${book.img}" width="30px" height="30px" ></img></td>
  <td>${book.name}</td>
  <td>${book.author}</td>
  <td>${book.publisher}</td>
  <td>${book.oldPrice}</td>
  <td>${book.newPrice}</td>
  <td>${book.year}</td>
  <td><button class="btn btn-danger" onclick="deleteById(${book.id})">Xóa</button></td>
  <td><button class="btn btn-success" onclick="updateById(${book.id})">Sửa</button></td>
</tr>`;
}

function author2option(author) {
  return `<option value="${author.id}">${author.name}</option>`;
}

function category2option(category) {
  return `<option value="${category.id}">${category.name}</option>`;
}

function publisher2option(publisher) {
  return `<option value="${publisher.id}">${publisher.name}</option>`;
}

// crud
function deleteById(id) {
  if (confirm("Xóa sách id: " + id)) {
    sendDeleteBook(id);
  }
}

function updateById(id) {
  console.log("Update id:" + id);
}
