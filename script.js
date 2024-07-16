function login(){
    var id = document.getElementById("id");
    var pw = document.getElementById("pw");

    if(id.value == "" || pw.value == ""){
        alert("로그인을 할 수 없습니다.");
    }
    
    else {
        location.href = "welcome.html"
    }
}

function signup(){
        
      var name = document.getElementById("name");
      var id = document.getElementById("id");
      var pw = document.getElementById("pw");
      var r_pw = document.getElementById("r_pw");

      if (id.value == ""){
        alert("아이디를 입력하세요.");
        id.focus();
        return false;
      } else if (pw.value == "") {
        alert("비밀번호를 입력하세요.");
        pw.focus();
        return false;
      } else if (name.value == ""){
        alert("이름을 입력하세요.");
        name.focus();
        return false;
      } else if (r_pw.value == ""){
        alert("비밀번호가 일치하지 않습니다.");
        r_pw.focus();
        return false;
      } else {
        alert("회원가입을 축하드려용");
        location.href = "login.html"
        submit();
      }

    };
