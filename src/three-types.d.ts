import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Extend the fiber catalog with all Three.js objects
extend(THREE);

declare global {
	namespace JSX {
		interface IntrinsicElements {
			group: any;
			mesh: any;
			boxGeometry: any;
			cylinderGeometry: any;
			planeGeometry: any;
			sphereGeometry: any;
			ringGeometry: any;
			meshBasicMaterial: any;
			meshLambertMaterial: any;
			meshStandardMaterial: any;
			ambientLight: any;
			directionalLight: any;
			pointLight: any;
		}
	}
}
