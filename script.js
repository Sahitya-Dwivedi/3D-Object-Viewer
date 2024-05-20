import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let file_label = document.querySelector(".file_label")
let file = document.querySelector("#file")
let view = document.querySelector(".view")
let dark = document.querySelector(".dark")
let a = false

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
            resolve(scene.add(glb.scene), a = true)
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
    console.log(Image);
    renderer.render(scene, camera)
    view.appendChild(renderer.domElement)
    view.style.alignItems = "flex-start"
    view.style.opacity = "0%"
    dark.style.opacity = "100%"
    dark.style.color = "white"
    dark.innerHTML = "<h1>Loading</h1>"
    await loader3dmodel(url_img)
    if (a) {
        dark.style.transition = "all 1s ease-in-out"
        dark.style.opacity = "0%"
        view.style.opacity = "100%"
    }
    animate()
})
