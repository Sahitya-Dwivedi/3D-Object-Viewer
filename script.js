import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
let file_label = document.querySelector(".file_label")
let file = document.querySelector("#file")
let view = document.querySelector(".view")
let dark = document.querySelector(".dark")
let load = false
let box = document.getElementsByClassName("box")
async function box1firstanimation() {
    return new Promise((resolve, reject) => {
        resolve(
            box[1].style.animation = "1s 1s linear forwards hope_up"
        )
    })
}
async function box2firstanimation() {
    return new Promise((resolve, reject) => {
        box[1].addEventListener("animationend", function () {
            resolve(
                box[2].style.animation = "1s linear forwards hope_up"
            )
        }, { once: true })
    })
}
async function box3firstanimation() {
    return new Promise((resolve, reject) => {
        box[2].addEventListener("animationend", function () {
            resolve(
                box[3].style.animation = "1s  linear forwards hope_up"
            )
        }, { once: true })
    })
}
async function box4firstanimation() {
    return new Promise((resolve, reject) => {
        box[3].addEventListener("animationend", function () {
            resolve(
                box[4].style.animation = "1s 0.5s linear forwards hope_up"
            )
        }, { once: true })
    })
}
async function box4lastanimation() {
    return new Promise((resolve, reject) => {
        box[4].addEventListener("animationend", function () {
            resolve(
                box[4].style.animation = "1s  linear forwards hope_up_reverse"
            )
        }, { once: true })
    })
}
async function box3lastanimation() {
    return new Promise((resolve, reject) => {
        box[4].addEventListener("animationend", function () {
            resolve(
                box[3].style.animation = "1s linear forwards hope_up_reverse"
            )
        }, { once: true })
    })
}
async function box2lastanimation() {
    return new Promise((resolve, reject) => {
        box[3].addEventListener("animationend", function () {
            resolve(
                box[2].style.animation = "1s linear forwards hope_up_reverse"
            )
        }, { once: true })
    })
}
async function box1lastanimation() {
    return new Promise((resolve, reject) => {
        box[2].addEventListener("animationend", function () {
            resolve(
                setTimeout(() => {
                    box[1].style.animation = "1s linear forwards hope_up_reverse"
                }, 500)
            )
        }, { once: true })
    })
}
async function main() {
    await box1firstanimation()
    await box2firstanimation()
    await box3firstanimation()
    await box4firstanimation()
    await box4lastanimation()
    await box3lastanimation()
    await box2lastanimation()
    await box1lastanimation()
}


let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(4, 5, 11)
camera.lookAt(0, 0, 0)
scene.add(camera)

let renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0)

let loader = new GLTFLoader()
async function loader3dmodel(modelName) {
    return new Promise((resolve, reject) => {
        loader.load(modelName, (glb) => {
            resolve(scene.add(glb.scene),load = true)
        },undefined,(error)=>{
            console.error(error);
        })
    })
}
let light = new THREE.SpotLight(0xffffff, 3000, 100, 0.2, 0.5)
light.position.set(0, 25, 0)
scene.add(light)

let ctrl = new OrbitControls(camera, renderer.domElement)

function animate() {
    requestAnimationFrame(animate)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}

file.addEventListener("change", async function () {
    let Image = file.files[0]
    let url_img = URL.createObjectURL(Image)
    file_label.textContent = Image.name
    renderer.render(scene, camera)
    view.appendChild(renderer.domElement)
    view.style.alignItems = "flex-start"
    view.style.opacity = "0%"
    dark.style.opacity = "100%"
    dark.innerHTML = '<div class="container"><div class="box"></div><div class="box"></div><div class="box"></div><div class="box"></div><div class="box"></div></div>'
    main()
    await loader3dmodel(url_img)
    if (load) {
        dark.style.transition = "all 0.75s ease-in-out"
        dark.style.opacity = "0%"
        dark.innerHTML=""
        view.style.opacity = "100%"
    }
    animate()
})
