import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'yellow' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3

scene.add(camera)
// console.log(mesh.position.distanceTo(camera.position));
// mesh.position.normalize()
mesh.position.set(1, 0, 0)
scene.add(mesh)

//scale
mesh.scale.set(2, 0.5, 0.5)



//Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/** 
 * add group
 */

const group = new THREE.Group()
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'red' })
)
group.add(cube1)
scene.add(group)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    //@ts-ignore
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)