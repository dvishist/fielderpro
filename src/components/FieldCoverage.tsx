import React, { useMemo } from "react";
import * as THREE from "three";
import type { Player } from "../types/cricket";

interface FieldCoverageProps {
	players: Player[];
	boundaryRadius: number;
	showCoverage: boolean;
}

export const FieldCoverage: React.FC<FieldCoverageProps> = ({
	players,
	boundaryRadius,
	showCoverage
}) => {
	// Batting crease position (striker's end - where batsman stands facing bowler)
	const battingCreaseZ = -9;

	// Calculate coverage radius for each fielder based on distance from crease
	const calculateCoverageRadius = (position: [number, number, number]) => {
		const distanceFromCrease = Math.sqrt(
			position[0] * position[0] + (position[2] - battingCreaseZ) * (position[2] - battingCreaseZ)
		);

		// Fielders closer to crease have minimal coverage (3-4m), farther have moderate (12-15m)
		const minRadius = 0.5;
		const maxRadius = 12;
		const normalizedDistance = Math.min(distanceFromCrease / boundaryRadius, 1);

		return minRadius + normalizedDistance * (maxRadius - minRadius);
	};

	// Generate coverage circles for fielders
	const coverageCircles = useMemo(() => {
		if (!showCoverage) return [];

		return players
			.filter(p => p.type === "fielder" || p.type === "wicketkeeper")
			.map(player => {
				const coverageRadius = calculateCoverageRadius(player.position);
				return {
					id: player.id,
					position: player.position,
					radius: coverageRadius
				};
			});
	}, [players, showCoverage]);

	// Detect gaps in the field by analyzing angular coverage
	const gaps = useMemo(() => {
		if (!showCoverage) return [];

		const numSectors = 360; // 3-degree sectors for better accuracy
		const sectorAngles: boolean[] = new Array(numSectors).fill(false);

		// For each sector, test at multiple distances to ensure we catch all coverage
		for (let i = 0; i < numSectors; i++) {
			const sectorAngle = (i * 360) / numSectors;
			const sectorAngleRad = (sectorAngle * Math.PI) / 180;

			// Test at many distances from crease with fine granularity (every 5m)
			let covered = false;
			for (let testRadius = 5; testRadius <= boundaryRadius; testRadius += 5) {
				// Test point in this direction at testRadius from crease
				const testX = testRadius * Math.sin(sectorAngleRad);
				const testZ = testRadius * Math.cos(sectorAngleRad) + battingCreaseZ;

				// Check if any fielder covers this point
				for (const circle of coverageCircles) {
					const distToFielder = Math.sqrt(
						Math.pow(testX - circle.position[0], 2) + Math.pow(testZ - circle.position[2], 2)
					);

					if (distToFielder <= circle.radius) {
						covered = true;
						break;
					}
				}

				// If this distance in this sector is covered, mark the sector as covered
				if (covered) {
					sectorAngles[i] = true;
					break; // No need to test other distances for this sector
				}
			}
		}

		// Find gaps (consecutive uncovered sectors)
		const gapSectors: Array<{ startAngle: number; endAngle: number }> = [];
		let gapStart = -1;

		for (let i = 0; i < numSectors; i++) {
			if (!sectorAngles[i] && gapStart === -1) {
				gapStart = i;
			} else if (sectorAngles[i] && gapStart !== -1) {
				gapSectors.push({
					startAngle: (gapStart * 360) / numSectors,
					endAngle: (i * 360) / numSectors
				});
				gapStart = -1;
			}
		}

		// Handle wrap-around gap
		if (gapStart !== -1) {
			gapSectors.push({
				startAngle: (gapStart * 360) / numSectors,
				endAngle: 360
			});
		}

		return gapSectors;
	}, [coverageCircles, showCoverage]);

	if (!showCoverage) return null;

	return (
		<group>
			{/* Coverage circles for each fielder - clipped filled circles */}
			{coverageCircles.map(circle => {
				const segments = 64;
				const vertices: number[] = [];
				const indices: number[] = [];

				// Center point
				vertices.push(0, 0.1, 0);

				// Create circle vertices, clipped at boundary
				for (let i = 0; i <= segments; i++) {
					const angle = (i / segments) * Math.PI * 2;
					const x = circle.radius * Math.cos(angle);
					const z = circle.radius * Math.sin(angle);

					// Check if this point is within the boundary
					const worldX = x + circle.position[0];
					const worldZ = z + circle.position[2];
					const distFromCenter = Math.sqrt(worldX * worldX + worldZ * worldZ);

					if (distFromCenter <= boundaryRadius) {
						vertices.push(x, 0.1, z);
					} else {
						// Project point onto boundary circle
						const scale = boundaryRadius / distFromCenter;
						vertices.push(
							worldX * scale - circle.position[0],
							0.1,
							worldZ * scale - circle.position[2]
						);
					}
				}

				// Create triangles from center to edge
				for (let i = 1; i <= segments; i++) {
					indices.push(0, i, i + 1);
				}

				const geometry = new THREE.BufferGeometry();
				geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
				geometry.setIndex(indices);
				geometry.computeVertexNormals();

				return (
					<mesh key={circle.id} position={circle.position}>
						<primitive object={geometry} attach="geometry" />
						<meshBasicMaterial
							color="#4ade80"
							transparent
							opacity={0.2}
							side={THREE.DoubleSide}
							depthWrite={false}
						/>
					</mesh>
				);
			})}
			{/* Gap visualization as filled sectors */}
			{gaps.map((gap, index) => {
				const startAngleRad = (gap.startAngle * Math.PI) / 180;
				const endAngleRad = (gap.endAngle * Math.PI) / 180;
				const innerRadius = 2;
				const outerRadius = boundaryRadius + 52; // Keep within boundary
				const segments = 20;

				// Create vertices for the sector
				const vertices: number[] = [];
				const indices: number[] = [];

				// Add vertices for inner arc
				for (let i = 0; i <= segments; i++) {
					const t = i / segments;
					const angle = startAngleRad + (endAngleRad - startAngleRad) * t;
					const x = innerRadius * Math.sin(angle);
					const z = innerRadius * Math.cos(angle) + battingCreaseZ;
					vertices.push(x, 0, z);
				}

				// Add vertices for outer arc
				for (let i = 0; i <= segments; i++) {
					const t = i / segments;
					const angle = startAngleRad + (endAngleRad - startAngleRad) * t;
					const x = outerRadius * Math.sin(angle);
					const z = outerRadius * Math.cos(angle) + battingCreaseZ;

					// Check if point is within boundary
					const distFromCenter = Math.sqrt(x * x + z * z);
					if (distFromCenter <= boundaryRadius) {
						vertices.push(x, 0, z);
					} else {
						// Clamp to boundary
						const scale = boundaryRadius / distFromCenter;
						vertices.push(x * scale, 0, z * scale);
					}
				} // Create triangles
				for (let i = 0; i < segments; i++) {
					const innerStart = i;
					const innerEnd = i + 1;
					const outerStart = segments + 1 + i;
					const outerEnd = segments + 1 + i + 1;

					// First triangle
					indices.push(innerStart, outerStart, innerEnd);
					// Second triangle
					indices.push(innerEnd, outerStart, outerEnd);
				}

				const geometry = new THREE.BufferGeometry();
				geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
				geometry.setIndex(indices);
				geometry.computeVertexNormals();

				return (
					<mesh key={`gap-${index}`} position={[0, 0.1, 0]}>
						<primitive object={geometry} attach="geometry" />
						<meshBasicMaterial color="#ef4420" transparent opacity={0.22} side={THREE.DoubleSide} />
					</mesh>
				);
			})}{" "}
			{/* Batting crease line for reference */}
			<mesh position={[0, 0.05, battingCreaseZ]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[6, 0.3]} />
				<meshBasicMaterial color="" opacity={0} transparent />
			</mesh>
		</group>
	);
};
