// for modal
var modal = document.getElementById("id01");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// alert("hi");
var user;

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

  // validate
  if (!validateLogin()) {
    return;
  }

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
      console.log(data);
      localStorage.setItem("authorization", authorization);
      localStorage.setItem("user", JSON.stringify(data));
      user = data;
      closeLoginModal();

      if (user.admin) {
        window.location.replace("./html/admin.html");
      }
      //
    },
    error(jqXHR, textStatus, errorThrown) {
      alert("Sai tên đăng nhập hoặc mật khẩu");
    },
  });
}

function handleRegisterClick() {
  // lấy dữ liệu từ form đăng ký
  let fullname = $("#register_fullname").val();
  let email = $("#register_email").val();
  let phoneNumber = $("#register_phoneNumber").val();
  let address = $("#register_address").val();
  let username = $("#register_username").val();
  let password = $("#register_password").val();

  let registerForm = {
    fullname: fullname,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    username: username,
    password: password,
  };
  console.log(registerForm);

  // validate
  if (!validateRegister()) {
    return;
  }

  // call API
  let url = API_URI + "/register";
  let authorization = "Basic " + btoa(username + ":" + password);
  $.ajax({
    url: url,
    type: "POST",
    data: JSON.stringify(registerForm),
    contentType: "application/json",
    success: function (data, textStatus, xhr) {
      console.log(data);
      user = data;
      localStorage.setItem("authorization", authorization);
      localStorage.setItem("user", data);
      alert("Đăng ký thành công");
      document.getElementById("id02").style.display = "none";
    },
    error(jqXHR, textStatus, errorThrown) {
      alert("Thông tin đã tồn tại");
    },
  });
}

function validateLogin() {
  let username = $("#login_username").val();
  let password = $("#login_password").val();

  if (!username || !password) {
    alert("Nhập thiếu thông tin");
    return false;
  }

  return true;
}

function validateRegister() {
  let fullname = $("#register_fullname").val();
  let email = $("#register_email").val();
  let phoneNumber = $("#register_phoneNumber").val();
  let address = $("#register_address").val();
  let username = $("#register_username").val();
  let password = $("#register_password").val();

  if (
    !fullname ||
    !email ||
    !phoneNumber ||
    !address ||
    !username ||
    !password
  ) {
    alert("Không được để trống thông tin");
    return false;
  }
  return true;
}

function closeRegisterModal() {
  document.getElementById("id02").style.display = "none";
}

function closeLoginModal() {
  document.getElementById("id01").style.display = "none";
}
