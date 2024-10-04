<script setup lang="ts">
    import * as THREE from "three";
import vshader from './vshader.vert?raw';
//import fshader from './fshader.frag?raw';
import fshader from './diffraction2d.frag?raw';
import {ref} from 'vue';

const m = ref(9);
const scene = new THREE.Scene();
const camera = new THREE.Camera();
const renderer = new THREE.WebGLRenderer({});
var material = new THREE.ShaderMaterial({});
function init() {
    const appElement = document.querySelector<HTMLDivElement>('#app')!;
    const size = { width: window.innerWidth, height: window.innerHeight };
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const renderer = new THREE.WebGLRenderer({});
    appElement.appendChild(renderer.domElement);
    renderer.setSize(size.width, size.height);
    const geometry = new THREE.PlaneGeometry(2,2);
    //const material = new THREE.MeshLambertMaterial({wireframe: true});
     material = new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
	vertexShader: vshader,
	fragmentShader: fshader,
	//wireframe: true,　//試しにワイアーフレームで表示、後で削除
	uniforms:{
            N:{value:m.value},
            uTime: { value: 0 },
            uResolution: {value: new THREE.Vector2(size.width, size.height) },
            //uResolution: {value: new THREE.Vector2(100,100) },
	    uMouse: {
		value: new THREE.Vector2(0.5, 0.5)
	    },
	}
    });
    const plane = new THREE.Mesh(geometry, material);

    scene.add(plane);
    renderer.render(scene, camera);

    // 毎フレーム時に実行されるループイベントです
    function tick() {
	plane.material.uniforms.uTime.value += 0.01;
        renderer.render(scene, camera); // レンダリング
        requestAnimationFrame(tick);
    }
    tick();
}
init();

    function plus() {
        console.log("plus");
        m.value++;
        this.material.uniforms.N.value = m.value;
        renderer.render(scene, camera);
    }
</script>

<template>
    <h1>{{m}}my first components.</h1>
    <div>
        <button @click="plus()"> + </button>
        <button> - </button>
    </div>
   
</template>