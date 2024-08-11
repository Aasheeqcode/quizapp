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
let fname=document.getElementById("fname");
let lname=document.getElementById("lname");
let mail=document.getElementById("mail");
let pass=document.getElementById("pass");
let logmail=document.getElementById("email");
let logpass=document.getElementById("password");
document.getElementById("entry").onclick=function(e){
    const datafield={
      FirstName:fname.value,
      LastName:lname.value,
      Email:mail.value,
      Password:pass.value
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

    // Basic validation
    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "http://localhost:5000/show.html"; // Redirect to home page
        } else {
          alert("Invalid email or password.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
 });
}
document.getElementById("check").onclick=signin();