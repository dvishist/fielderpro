import React from "react";

interface CricketGroundProps {
	boundaryRadius: number;
	thirtyYardRadius: number;
	pitchLength: number;
	pitchWidth: number;
}

export const CricketGround: React.FC<CricketGroundProps> = ({
	boundaryRadius,
	thirtyYardRadius,
	pitchLength,
	pitchWidth
}) => {
	return (
		<group>
			{/* Ground Base */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
				<circleGeometry args={[boundaryRadius, 64]} />
				<meshLambertMaterial color="#4ade80" />
			</mesh>

			{/* Pitch */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
				<planeGeometry args={[pitchWidth, pitchLength]} />
				<meshLambertMaterial color="#c19a6b" />
			</mesh>

			{/* Bowling Creases - 1.22m in front of stumps */}
			<mesh position={[0, 0.03, pitchLength / 2 - 1.22]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[2.7, 0.08]} />
				<meshBasicMaterial color="#ffffff" />
			</mesh>
			<mesh position={[0, 0.03, -(pitchLength / 2) + 1.22]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[2.64, 0.08]} />
				<meshBasicMaterial color="#ffffff" />
			</mesh>

			{/* Return Creases - perpendicular lines at each end, extending 1.22m behind stumps */}
			{/* Top end - right side */}
			<mesh position={[1.32, 0.03, pitchLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[0.08, 2.44]} />
				<meshBasicMaterial color="#ffffff" />
			</mesh>
			{/* Top end - left side */}
			<mesh position={[-1.32, 0.03, pitchLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[0.08, 2.44]} />
				<meshBasicMaterial color="#ffffff" />
			</mesh>
			{/* Top end - wide batting crease extension */}
			<mesh position={[0, 0.03, pitchLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[3.66, 0.1]} />
				<meshBasicMaterial color="#ffffff" />
			</mesh>
			{/* Bottom end - right side */}
			<mesh position={[1.32, 0.03, -pitchLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[0.08, 2.44]} />
				<meshBasicMaterial color="#ffffff" />
			</mesh>
			{/* Bottom end - left side */}
			<mesh position={[-1.32, 0.03, -pitchLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[0.08, 2.44]} />
				<meshBasicMaterial color="#ffffff" />
			</mesh>
			{/* Bottom end - wide batting crease extension */}
			<mesh position={[0, 0.03, -pitchLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[3.66, 0.1]} />
				<meshBasicMaterial color="#ffffff" />
			</mesh>

			{/* Stumps */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
				<ringGeometry args={[thirtyYardRadius - 0.2, thirtyYardRadius, 64]} />
				<meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
			</mesh>

			{/* Boundary rope */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
				<ringGeometry args={[boundaryRadius - 0.5, boundaryRadius, 64]} />
				<meshBasicMaterial color="#ff0000" />
			</mesh>

			{/* Stumps */}
			<group position={[0, 0, pitchLength / 2]}>
				<mesh position={[-0.1, 0.4, 0]}>
					<cylinderGeometry args={[0.02, 0.02, 0.8]} />
					<meshLambertMaterial color="#8b4513" />
				</mesh>
				<mesh position={[0, 0.4, 0]}>
					<cylinderGeometry args={[0.02, 0.02, 0.8]} />
					<meshLambertMaterial color="#8b4513" />
				</mesh>
				<mesh position={[0.1, 0.4, 0]}>
					<cylinderGeometry args={[0.02, 0.02, 0.8]} />
					<meshLambertMaterial color="#8b4513" />
				</mesh>
			</group>

			<group position={[0, 0, -pitchLength / 2]}>
				<mesh position={[-0.1, 0.4, 0]}>
					<cylinderGeometry args={[0.02, 0.02, 0.8]} />
					<meshLambertMaterial color="#8b4513" />
				</mesh>
				<mesh position={[0, 0.4, 0]}>
					<cylinderGeometry args={[0.02, 0.02, 0.8]} />
					<meshLambertMaterial color="#8b4513" />
				</mesh>
				<mesh position={[0.1, 0.4, 0]}>
					<cylinderGeometry args={[0.02, 0.02, 0.8]} />
					<meshLambertMaterial color="#8b4513" />
				</mesh>
			</group>

			{/* Sightscreens - positioned outside the boundary */}
			<mesh position={[0, 3, -boundaryRadius - 5]}>
				<boxGeometry args={[20, 6, 1]} />
				<meshLambertMaterial color="#ffffff" />
			</mesh>
			<mesh position={[0, 3, boundaryRadius + 5]}>
				<boxGeometry args={[20, 6, 1]} />
				<meshLambertMaterial color="#ffffff" />
			</mesh>

			{/* Pavilion structure */}
			<mesh position={[0, 3, -boundaryRadius - 15]}>
				<boxGeometry args={[25, 6, 5]} />
				<meshLambertMaterial color="#8b4513" />
			</mesh>
			<mesh position={[0, 1.5, -boundaryRadius - 17.5]}>
				<boxGeometry args={[30, 3, 2]} />
				<meshLambertMaterial color="#654321" />
			</mesh>
		</group>
	);
};
