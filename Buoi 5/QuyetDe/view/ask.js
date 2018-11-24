 const totalChar=200;
// document.getElementById("textInput").addEventListener("input",function(){
//     console.log("Input Event");
//     let remainChar = totalChar -document.getElementById("textInput").value.length;
//     document.getElementById("remain").innerText="con" + remainChar+"/200 ky tu";
// })



console.log($); // in ra ƒ (e,t){return new w.fn.init(e,t)} thi la da chay
$("#textInput").on("input",function(){
    let remainChar = totalChar -$("#textInput").val().length;
    $("#remain").text("con "+remainChar+"/200 ky tu");
});