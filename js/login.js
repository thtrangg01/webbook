// for modal
var modal = document.getElementById("id01");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

$().ready(function () {
  // đăng nhập
  $("#login-modal-btn_login").on("click", function () {
    handleLoginClick();
  });

  // đăng ký
  $("#login-modal-btn_register").on("click", function () {
    handleRegisterClick();
  });
});

function handleLoginClick() {
  // lấy dữ liệu từ form đăng nhập
  let username = $("#login_username").val();
  let password = $("#login_password").val();

  // call API
  let url = API_URI + "/login";
  let authorization = "Basic " + btoa(username + ":" + password);
  $.ajax({
    url: url,
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", authorization);
    },
    success: function (data, textStatus, xhr) {
      alert(data);
    },
    error(jqXHR, textStatus, errorThrown) {
      alert("Sai tên đăng nhập hoặc mật khẩu");
    },
  });
}

function handleRegisterClick() {
  // lấy dữ liệu từ form đăng ký
  let fullname = $("register_fullname").val();
  let email = $("register_email").val();
  let phoneNumber = $("register_phoneNumber").val();
  let address = $("register_address").val();
  let username = $("register_username").val();
  let password = $("register_password").val();

  let registerForm = {
    fullname: fullname,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    username: username,
    password: password,
  };
  console.log(registerForm);
}
