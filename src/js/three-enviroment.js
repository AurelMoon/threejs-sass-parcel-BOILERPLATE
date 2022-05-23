import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	SpotLight,
	AmbientLight,
	Fog
  } from 'three';

import OBJShoe from '../models/Blue_Vans_Shoe_SF.obj';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

	const container = document.querySelector('#three-container');

	const scene = new Scene();
		
	const camera = new PerspectiveCamera( 45, container.offsetWidth / container.offsetHeight, 0.1, 1000 );
		camera.position.z = 18;
		camera.position.y = 1;
		
	const renderer = new WebGLRenderer({antialias : true, alpha: true});
		renderer.setSize( container.offsetWidth, container.offsetHeight );
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);
		
	scene.fog = new Fog( 0xffffff, 15, 30 );

	//SpotLight -------------------------------------------------------------------------------------
	var colorLight = 0xffffff,
		intensityLight = 0.2,
		distanceLight = 0,
		angleLight = Math.PI / 2,
		penumbraLight = 1;

	const spotLight = new SpotLight(colorLight, intensityLight, distanceLight, angleLight, penumbraLight);
		spotLight.position.set(50, 50, 100);
		scene.add(spotLight);	

	const spotLightBlue = new SpotLight(0x004eff, 1, distanceLight, angleLight, penumbraLight);
		spotLightBlue.position.set(-100, 100, 0);
		scene.add(spotLightBlue);	

	const spotLightYellow = new SpotLight(0xfbff00, 0.3, distanceLight, angleLight, penumbraLight);
		spotLightYellow.position.set(100, 100, 0);
		scene.add(spotLightYellow);	

	const ambientLight = new AmbientLight( 0x404040, 1.4 ); // soft white light
		scene.add( ambientLight );

	//Shoes ----------------------------------------------------------------------------------------
	const loader = new OBJLoader();
  	let shoeModels = [];
	// load a resource
	loader.load(
		OBJShoe,
		function ( object ) {
			let amount = 6;
			for (let i = 0; i < amount; i++) {
				const shoeClone = object.clone();
				shoeClone.rotation.x = 0.45;
				shoeClone.rotation.y = 0.45;
				scene.add(shoeClone);
				shoeModels.push(shoeClone);
			}
			//remove setInterval
			/*
			let counter = 0;
			let addShoues = setInterval(function(){
				shoeModel[counter].rotation.x = 0.45;
				shoeModel[counter].rotation.y = 0.45;
				counter++
				if (counter==amount) {
					clearInterval(addShoues);
				}
			},100)*/
		},
		// called when loading is in progresses
		function ( xhr ) {console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );},
		// called when loading has errors
		function ( error ) {console.log( 'An error happened' );}
	);

	//Resize ----------------------------------------------------------------------------------------
	window.addEventListener( 'resize', function(){
		camera.aspect = container.offsetWidth/container.offsetHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.offsetWidth,container.offsetHeight);
		renderer.render(scene, camera);
	}, false );
	
	let mousePositionX = 0;
	document.addEventListener("mousemove", function(event){
		//recalculate position from center of viewport
		mousePositionX = event.clientX/500;
	});

	function lerp(start, end, amt){
		return (1-amt)*start+amt*end;
	};

	function animate(){
		if (shoeModels.length > 0) {
			for (let index = 0; index < shoeModels.length; index++) {
				const model = shoeModels[index];
				// use Lerp function for smooth animation 
				model.position.x = 10*Math.cos(mousePositionX+index);
				model.position.z = 10*Math.sin(mousePositionX+index);
			}
		}
		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	};
	animate();