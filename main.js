

let saturate    = document.getElementById("saturate");
let contrast    = document.getElementById("contrast");
let brightness  = document.getElementById("brightness");
let sepia       = document.getElementById("sepia");
let grayscale   = document.getElementById("grayscale");
let blur        = document.getElementById("blur");
let hueRotate   = document.getElementById("hue-rotate");

let img         = document.getElementById("img");
let upload      = document.getElementById("upload");
let imgBox      = document.querySelector(".img-box");

let c = document.getElementById("c");
let ctx = c.getContext("2d");
window.addEventListener("load", () => {
    imgBox.style.display    = "none";
    download.style.display  = "none";
    reset.style.display     = "none";
})

// Upload Img
upload.addEventListener("change", () => {
    restVal();
    imgBox.style.display    = "block";
    download.style.display  = "block";
    reset.style.display     = "block";

    let file = new FileReader();

    file.readAsDataURL(upload.files[0]);
    
    file.addEventListener("load", () => {
    
        img.src = file.result;
    })
    img.onload = function () {
        c.height = img.height;
        c.width = img.width;
        ctx.drawImage(img, 0, 0, c.clientWidth, c.height);
        img.style.display = "none";
    }
})

// Change Img Color

let allFilter = document.querySelectorAll("ul li input");

allFilter.forEach( f => {
    f.addEventListener("input", () => {
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img, 0, 0, c.clientWidth, c.height);

    })
})

function restVal() {

    img.style.filter = "none";

    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";

    sepia.value = "0";
    grayscale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";

}

document.getElementById("reset").onclick = restVal;

let download    = document.getElementById("download");

download.onclick = () => {
    download.href = c.toDataURL();
}

