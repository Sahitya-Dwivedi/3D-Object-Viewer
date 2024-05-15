let file_label = document.querySelector(".file_label")
let file = document.querySelector("#file")
file.addEventListener("change", ()=>{
    let Image = file.files[0]
    file_label.textContent = Image.name
    console.log(Image);
})