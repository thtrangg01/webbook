// api server
const API_URI = "http://103.82.21.145:8003";
//

const NUM_ITEMS_IN_PAGE = 8;
var listBook = [];

$().ready(function () {
  getBooksFromAPI();
});

function showProduct() {
  $("#show-product-area").empty();
  let curr_num = 0;

  for (let i = 0; i < listBook.length; i++) {
    if (i >= NUM_ITEMS_IN_PAGE) {
      break;
    }
    $("#show-product-area").append(genProductItem(listBook[i]));
  }
}

function getBooksFromAPI() {
  let url = API_URI + "/book";
  $.ajax({
    url: url,
    type: "GET",
    // data: JSON.stringify(account), // body
    //  contentType: "application/json", // type of body (json, xml, text)
    // dataType: 'json', // datatype return
    success: function (data, textStatus, xhr) {
      listBook = data;
      showProduct();
    },
    error(jqXHR, textStatus, errorThrown) {
      alert("Error when loading data");
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}

function genProductItem(book) {
  return `<div class="grid_column-2">
    <a class="home-product-item" href="#">
      <div
        class="home-product-item_img"
        style="
          background-image: url(${book.img});
        "
      >
       
      </div>
      <h4 class="home-product-item_name">${book.name}</h4>
      <div class="home-product-item_price">
        <span class="home-product-item_price-giabia"
          >${book.oldPrice} đ</span
        >
        <span class="home-product-item_price-giaban"
          >${book.newPrice} đ</span
        >
      </div>
      <div class="home-product-item_action">
        <span
          class="
            home-product-item_like home-product-item_like--liked
          "
        >
          <i
            class="
              home-product-item_like-icon-fill
              fas
              fa-thumbs-up
            "
          ></i>
          <i
            class="
              home-product-item_like-icon-empty
              far
              fa-thumbs-up
            "
          ></i>
        </span>
        <div class="home-product-item_rating">
          <i
            class="home-product-item_star-gold fas fa-star"
          ></i>
          <i
            class="home-product-item_star-gold fas fa-star"
          ></i>
          <i
            class="home-product-item_star-gold fas fa-star"
          ></i>
          <i
            class="home-product-item_star-gold fas fa-star"
          ></i>
          <i
            class="home-product-item_star-gold fas fa-star"
          ></i>
        </div>
        <span class="home-product-item_sold">100 đã bán</span>
      </div>

      <div class="home-product-item_origin">
        <span class="home-product-item_author"
          >${book.author}</span
        >
      </div>

      <div class="home-product-item_sale-off">
        <span class="home-product-item_sale-off-percent"
          >-${Math.round((1 - book.newPrice / book.oldPrice) * 100)}%</span
        >
      </div>
    </a>
  </div>`;
}

// $.ajax({
//     url: url,
//     type: 'POST',
//     data: JSON.stringify(account), // body
//     contentType: "application/json", // type of body (json, xml, text)
//     // dataType: 'json', // datatype return
//     beforeSend: function (xhr) {
//         xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.getItem("USERNAME") + ":" + localStorage.getItem("PASSWORD")));
//     },
//     success: function (data, textStatus, xhr) {
//         currentPage = totalPages;
//         getListEmployees();
//     },
//     error(jqXHR, textStatus, errorThrown) {
//         alert("Error when loading data");
//         console.log(jqXHR);
//         console.log(textStatus);
//         console.log(errorThrown);
//     }
// });
