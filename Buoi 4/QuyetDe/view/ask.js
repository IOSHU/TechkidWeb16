const totalChar=200;
document.getElementById("textInput").addEventListener("input",function(){
    console.log("Input Event");
    let remainChar = totalChar -document.getElementById("textInput").value.length;
    document.getElementById("remain").innerText="con" + remainChar+"/200 ky tu";
})