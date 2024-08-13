let titles=["LEARN 10X SPEED","Learn Concepts By Quiz App","Learn & Practice","Used To Practice Test","Make Test And Analyse The Result"];
let btn=["Explore Now","Get Started","Practice Now","Try Now","Make Test"]
let i=0;
let isopenl=false;
let isopenr=false;
setInterval(()=>{
   document.getElementById("change").innerHTML=titles[i%titles.length];
   document.getElementById("normal").innerHTML=btn[i%btn.length];
    i++;
},5000);
document.getElementById("log").onclick=function(){
    document.getElementById("lw").style.display='block';
    isopenl=true;
}
document.getElementById("normal").onclick=function(){
    document.getElementById("lw").style.display='block';
    isopenl=true;
}
document.getElementById("sign").onclick=function(){
    document.getElementById("rw").style.display='block';
    isopenr=true;
}
document.getElementById("another").onclick=function(){
    document.getElementById("rw").style.display='block';
    isopenr=true;
}
document.getElementById("closel").onclick=()=>{
    if(isopenl){
        document.getElementById("lw").style.display='none';
        isopenl=false;
    }
}
document.getElementById("closes").onclick=()=>{
    if(isopenr){
        document.getElementById("rw").style.display='none';
        isopenr=false;
    }
}
let logmail=document.getElementById("email");
let logpass=document.getElementById("password");
document.getElementById("entry").onclick=function(e){
  let fname=document.getElementById("fname").value.trim();
  let lname=document.getElementById("lname").value.trim();
  let mail=document.getElementById("mail").value.trim();
  let pass=document.getElementById("pass").value.trim();
  if (!fname || !mail || !pass) {
    alert("All fields are required.");
    return;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(mail)) {
          alert("Please enter a valid email address.");
          return;
        }
  const passwordPattern = /^(?=.[a-zA-Z])(?=.\d)[a-zA-Z\d]{8,}$/;
        if (passwordPattern.test(pass)) {
          alert(
            "Password must be at least 8 characters long and contain at least one letter and one number."
          );
          return;
        }

  const datafield={
    FirstName:fname,
    LastName:lname,
    Email:mail,
    Password:pass
  }
  console.log(datafield);
  fetch("http://localhost:5000/create-user",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(datafield)
  }).then(res=>res.json()).then(d=>console.log(d));
}
function signin() {
    let email = logmail.value.trim();
    let password = logpass.value.trim();

    if (!email||!password) {
      alert("Email and password are required.");
      return;
    }

    fetch("http://localhost:5000/signin", {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },console.log("Success"))
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "http://localhost:5000/quiz.html"; // Redirect to home page
        } else {
          alert("Invalid email or password.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
 });
}
function open(){
   window.location.href="http://localhost:5000/quiz.html";
}
