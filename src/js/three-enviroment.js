import {
	Scene,
	PerspectiveCamera,
	MeshPhongMaterial,
	WebGLRenderer,
	SpotLight,
	SpotLightHelper,
	SphereGeometry,
	Mesh
  } from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

	console.log('rum');

	const scene = new Scene();
		
	const camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
		camera.position.z = 30;
		
	const renderer = new WebGLRenderer({antialias : true, alpha: true});
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor(0x000000, 0);
		
	const controls = new OrbitControls(camera, renderer.domElement);

	const container = document.querySelector('#three-container');
		container.appendChild(renderer.domElement);


	//SpotLight -------------------------------------------------------------------------------------
	var colorLight = 0xAED5FF,
		intensityLight = 1,
		distanceLight = 0,
		angleLight = Math.PI / 2,
		penumbraLight = 1;

	const spotLight = new SpotLight(colorLight, intensityLight, distanceLight, angleLight, penumbraLight);
		spotLight.position.set(5, 5, 10);
		
		scene.add(spotLight);	

	const spotLightHelper = new SpotLightHelper(spotLight);
		scene.add(spotLightHelper);

	//Sphere ----------------------------------------------------------------------------------------
	const sphereGeometry = new SphereGeometry( 5, 32, 32 );
	const sphereMaterial = new MeshPhongMaterial( {color: 0xffff00,wireframe: true} );
	const sphere = new Mesh( sphereGeometry, sphereMaterial );
	scene.add( sphere );


	//Resize ----------------------------------------------------------------------------------------
	window.addEventListener( 'resize', function(){
		camera.aspect = window.innerWidth/window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth,window.innerHeight);
		renderer.render(scene, camera);
	}, false );



	// Animations ----------------------------------------------------------------------------------

	document.querySelector('#b1').addEventListener("click", function(){
		sphereTo.speed = 0.05
		sphereTo.position.x = 0;
	});
	document.querySelector('#b2').addEventListener("click", function(){
		sphereTo.speed = 0.01
		sphereTo.position.x = 10;
	});

	/*speed = update position by xx% of the distance between position and target position*/
  
	var sphereTo = {
		position:{x:0,y:0,z:0},
		speed: 0.05,
	};


	function animate(){
		//lerp
		sphere.position.x += (sphereTo.position.x - sphere.position.x)*sphereTo.speed;
		sphere.position.y += (sphereTo.position.y - sphere.position.y)*sphereTo.speed;
		sphere.position.z += (sphereTo.position.z - sphere.position.z)*sphereTo.speed;

		sphere.rotation.y += 0.005;

		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	};
	animate();