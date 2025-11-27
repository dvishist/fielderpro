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
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
				<ringGeometry args={[boundaryRadius - 2, boundaryRadius - 1.5, 64]} />
				<meshBasicMaterial color="#ffFFFF" />
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
			<mesh position={[0, 3, -boundaryRadius + 1]}>
				<boxGeometry args={[18, 6, 1]} />
				<meshLambertMaterial color="#ffffff" />
			</mesh>
			<mesh position={[0, 3, boundaryRadius + 1]}>
				<boxGeometry args={[20, 6, 1]} />
				<meshLambertMaterial color="#ffffff" />
			</mesh>

			{/* MCG-Style Circular Stadium */}
			{/* Lower tier - continuous circular seating */}
			{Array.from({ length: 32 }).map((_, segment) => {
				const angle = (segment / 32) * Math.PI * 2;
				const radius = boundaryRadius + 12;
				const x = Math.cos(angle) * radius;
				const z = Math.sin(angle) * radius;
				const standWidth = (2 * Math.PI * radius) / 32;

				return (
					<group key={`lower-${segment}`} position={[x, 0, z]} rotation={[0, -angle, 0]}>
						{/* Lower stand structure */}
						<mesh position={[0, 2.5, 0]}>
							<boxGeometry args={[standWidth * 1, 4, 12]} />
							<meshLambertMaterial color="#34495e" />
						</mesh>
						{/* Seating rows */}
						{Array.from({ length: 10 }).map((_, row) => (
							<mesh key={row} position={[0, 0.3 + row * 0.45, 1.5 - row * 0.5]}>
								{/* <boxGeometry args={[standWidth * 1.3, 0.25, 0.35]} />
								<meshLambertMaterial color={row % 2 === 0 ? "#e0e0e0" : "#bdbdbd"} /> */}
							</mesh>
						))}
					</group>
				);
			})}

			{/* Upper tier - continuous circular seating */}
			{Array.from({ length: 32 }).map((_, segment) => {
				const angle = (segment / 32) * Math.PI * 2;
				const radius = boundaryRadius + 15;
				const x = Math.cos(angle) * radius;
				const z = Math.sin(angle) * radius;
				const standWidth = (2 * Math.PI * radius) / 32;

				return (
					<group key={`upper-${segment}`} position={[x, 0, z]} rotation={[0, -angle, 0]}>
						{/* Upper stand structure */}
						<mesh position={[0, 7, 0]}>
							<boxGeometry args={[standWidth * 1.3, 5, 14]} />
							<meshLambertMaterial color="#34495e" />
						</mesh>
						{/* Seating rows */}
						{Array.from({ length: 8 }).map((_, row) => (
							<mesh key={row} position={[0, 4.8 + row * 0.5, 1 - row * 0.45]}>
								<boxGeometry args={[standWidth * 1.3, 0.25, 0.35]} />
								{/* <meshLambertMaterial color={row % 2 === 0 ? "#ffffff" : "#d0d0d0"} /> */}
							</mesh>
						))}
					</group>
				);
			})}

			{/* Roof structure - continuous ring */}
			{Array.from({ length: 32 }).map((_, segment) => {
				const angle = (segment / 32) * Math.PI * 2;
				const radius = boundaryRadius + 17;
				const x = Math.cos(angle) * radius;
				const z = Math.sin(angle) * radius;
				const standWidth = (2 * Math.PI * radius) / 32;

				return (
					<group key={`roof-${segment}`} position={[x, 0, z]} rotation={[0, -angle, 0]}>
						{/* Roof panels */}
						<mesh position={[0, 12, 0]}>
							<boxGeometry args={[standWidth * 1, 0.3, 15]} />
							<meshLambertMaterial color="#7f8c8d" />
						</mesh>
						{/* Support beams */}
						<mesh position={[0, 8, 0]}>
							<boxGeometry args={[2, 5, 2]} />
							<meshLambertMaterial color="#95a5a6" />
						</mesh>
					</group>
				);
			})}

			{/* Great Southern Stand - Main Pavilion (slightly larger section) */}
			<group position={[0, 0, -boundaryRadius - 12]}>
				<mesh position={[0, 8, 0]}>
					<boxGeometry args={[35, 8, 6]} />
					<meshLambertMaterial color="#1a1a1a" />
				</mesh>
				{/* VIP boxes */}
				{Array.from({ length: 6 }).map((_, i) => (
					<mesh key={i} position={[-15 + i * 6, 8, 3.5]}>
						<boxGeometry args={[5, 2, 1]} />
						<meshLambertMaterial color="#f39c12" />
					</mesh>
				))}
			</group>

			{/* Floodlight Towers */}
			{[
				[boundaryRadius + 15, 0, boundaryRadius + 15],
				[-boundaryRadius - 15, 0, boundaryRadius + 15],
				[boundaryRadius + 15, 0, -boundaryRadius - 15],
				[-boundaryRadius - 15, 0, -boundaryRadius - 15]
			].map((pos, i) => (
				<group key={i} position={pos as [number, number, number]}>
					{/* Tower */}
					<mesh position={[0, 12, 0]}>
						<cylinderGeometry args={[0.3, 0.5, 24, 8]} />
						<meshLambertMaterial color="#95a5a6" />
					</mesh>
					{/* Light platform */}
					<mesh position={[0, 24, 0]}>
						<boxGeometry args={[3, 1, 3]} />
						<meshLambertMaterial color="#34495e" />
					</mesh>
					{/* Lights */}
					<mesh position={[0, 24.5, 0]}>
						<boxGeometry args={[2.5, 0.5, 2.5]} />
						<meshBasicMaterial color="#fff7e6" />
					</mesh>
					<pointLight position={[0, 24, 0]} intensity={150} distance={100} color="#ffffff" />
				</group>
			))}

			{/* Scoreboard - Above main pavilion */}
			<group position={[0, 12, -boundaryRadius - 18]}>
				<mesh>
					<boxGeometry args={[20, 5, 2]} />
					<meshLambertMaterial color="#1a1a1a" />
				</mesh>
				<mesh position={[0, 0, 1.1]}>
					<boxGeometry args={[18, 4, 0.2]} />
					<meshBasicMaterial color="#0a3d0a" />
				</mesh>
			</group>
		</group>
	);
};
