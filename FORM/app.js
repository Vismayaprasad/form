let fname = document.getElementById("firstname");
let lname = document.getElementById("lastname");
let email = document.getElementById("email");
let mob = document.getElementById("mobile");
let pw = document.getElementById("password");
let cpw = document.getElementById("cpassword");
let errMsg = document.getElementById("errMessage");
let lmob = document.getElementById("lmobile");
let lpw = document.getElementById("lpassword");
let detailSection = document.getElementById("detailsBody");

let datas = [];
let data = {};
let userData = [];
let valid = {};
let res;
let loginData = {};

function submission(e) {
  e.preventDefault();
  if (
    fname.value === "" ||
    lname.value === "" ||
    email.value === "" ||
    mob.value === "" ||
    pw.value === "" ||
    cpw.value === ""
  ) {
    errMsg.innerHTML = `<p class="errMsg"> Enter all the fields </p>`;
  } else if (pw.value !== cpw.value) {
    cpw.classList.toggle("inputError");
    errMsg.innerHTML = `<p class="errMsg"> Password Mismatch! </p>`;
  } else {
    userData = JSON.parse(localStorage.getItem("datas"));

    if (userData === null) {
      data = {
        fullname: fname.value + " " + lname.value,
        email: email.value,
        mobile: mob.value,
        ConfirmPassword: cpw.value,
      };
      datas.push(data);
      localStorage.setItem("datas", JSON.stringify(datas));
    } else {
      valid = { email: email.value, mobile: mob.value };

      res = userData.some((a) => {
        return a.email === valid.email || a.mobile === valid.mobile;
      });

      if (res) {
        errMsg.innerHTML = `<p class="errMsg"> User already Exists</p>`;
      } else {
        data = {
          fullname: fname.value + " " + lname.value,
          email: email.value,
          mobile: mob.value,
          ConfirmPassword: cpw.value,
        };

        datas.push(data);
        localStorage.setItem("datas", JSON.stringify(datas));
      }
    }
  }
}

//^ ===============================================================

function login(e) {
  e.preventDefault();
  loginData = { lmob: lmob.value, lpassword: lpw.value };
  userData = JSON.parse(localStorage.getItem("datas"));

  let res = userData.some((a) => {
    return (
      a.mobile === loginData.lmob && a.ConfirmPassword === loginData.lpassword
    );
  });

  if (res) {
    window.location.href = "./userdetails.html";
  } else {
    errMsg.innerHTML = `<p class="errMsg"> Invalid User! </p>`;
  }

  console.log(res);
}

//^ ===============================================================

userData = JSON.parse(localStorage.getItem("datas"));
let table = document.createElement("table");

let thead = document.createElement("thead");
let headtr = document.createElement("tr");
let slth = document.createElement("th");
slth.innerText = "SL NO.";
let nameth = document.createElement("th");
nameth.innerText = "Name of User";
let emailth = document.createElement("th");
emailth.innerText = "Email";
let mobileth = document.createElement("th");
mobileth.innerText = "Mobile No.";

headtr.append(slth, nameth, emailth, mobileth);
let tbody = document.createElement("tbody");

detailSection.prepend(table);
table.append(thead);
thead.append(headtr);
table.append(tbody);
userData.map(({ fullname, email, mobile }, slno) => {
  let bodytr = document.createElement("tr");
  let sltd = document.createElement("td");
  let nametd = document.createElement("td");
  let emailtd = document.createElement("td");
  let mobiletd = document.createElement("td");

  sltd.innerText = slno + 1;
  nametd.innerText = fullname;
  emailtd.innerText = email;
  mobiletd.innerText = mobile;

  bodytr.append(sltd, nametd, emailtd, mobiletd);
  tbody.append(bodytr);
});

//^ ===============================================================

function clrstrg() {
  localStorage.clear();
}
