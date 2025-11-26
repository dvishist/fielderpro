import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { Player } from "../types/cricket";
import * as THREE from "three";

interface DraggablePlayerProps {
	player: Player;
	onDrag: (id: string, position: [number, number, number]) => void;
	onNameChange: (id: string, newName: string) => void;
	onDragStart?: () => void;
	onDragEnd?: () => void;
	boundaryRadius: number;
}

const getPlayerColor = (type: Player["type"]) => {
	switch (type) {
		case "batsman":
			return "#ffd700"; // Gold
		case "bowler":
			return "#ff4500"; // Orange Red
		case "wicketkeeper":
			return "#00ced1"; // Dark Turquoise
		case "fielder":
			return "#32cd32"; // Lime Green
		default:
			return "#808080"; // Gray
	}
};

export const DraggablePlayer: React.FC<DraggablePlayerProps> = ({
	player,
	onDrag,
	onNameChange,
	onDragStart,
	onDragEnd,
	boundaryRadius
}) => {
	const groupRef = useRef<THREE.Group>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isEditingName, setIsEditingName] = useState(false);
	const [editedName, setEditedName] = useState(player.name);
	const planeRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
	const intersectionPoint = useRef<THREE.Vector3>(new THREE.Vector3());

	const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();

		(e.target as HTMLElement).setPointerCapture(e.pointerId);
		setIsDragging(true);
		document.body.style.cursor = "grabbing";
		onDragStart?.();
	};

	const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
		(e.target as HTMLElement).releasePointerCapture(e.pointerId);
		setIsDragging(false);
		document.body.style.cursor = "grab";
		onDragEnd?.();
	};

	const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
		if (isDragging) {
			e.stopPropagation();
			e.ray.intersectPlane(planeRef.current, intersectionPoint.current);

			let x = intersectionPoint.current.x;
			let z = intersectionPoint.current.z;

			// Constrain within boundary
			const distFromCenter = Math.sqrt(x * x + z * z);
			if (distFromCenter > boundaryRadius) {
				const scale = boundaryRadius / distFromCenter;
				x *= scale;
				z *= scale;
			}

			const newPosition: [number, number, number] = [x, player.position[1], z];
			onDrag(player.id, newPosition);
		}
	};

	useFrame(() => {
		if (groupRef.current) {
			groupRef.current.position.set(...player.position);
		}
	});

	return (
		<group ref={groupRef}>
			{/* Invisible larger hitbox for easier dragging on mobile */}
			<mesh
				position={[0, 2.5, 0]}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				onPointerMove={handlePointerMove}
				onPointerOver={() => (document.body.style.cursor = "grab")}
				onPointerOut={() => (document.body.style.cursor = "default")}
			>
				<boxGeometry args={[3, 6, 3]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>

			{/* Body */}
			<mesh position={[0, 2, 0]}>
				<boxGeometry args={[1.2, 2.5, 0.8]} />
				<meshLambertMaterial color={getPlayerColor(player.type)} />
			</mesh>
			{/* Head */}
			<mesh position={[0, 4.75, 0]}>
				<sphereGeometry args={[0.5, 16, 16]} />
				<meshLambertMaterial color="#ffd7a8" />
			</mesh>
			{/* Left Leg */}
			<mesh position={[-0.3, 0.6, 0]}>
				<boxGeometry args={[0.35, 1.2, 0.35]} />
				<meshLambertMaterial color={getPlayerColor(player.type)} />
			</mesh>
			{/* Right Leg */}
			<mesh position={[0.3, 0.6, 0]}>
				<boxGeometry args={[0.35, 1.2, 0.35]} />
				<meshLambertMaterial color={getPlayerColor(player.type)} />
			</mesh>

			{/* Player name label */}
			<Html position={[0, 5.8, 0]} center distanceFactor={15}>
				{isEditingName ? (
					<input
						type="text"
						value={editedName}
						onChange={e => setEditedName(e.target.value)}
						onBlur={() => {
							onNameChange(player.id, editedName);
							setIsEditingName(false);
						}}
						onKeyDown={e => {
							if (e.key === "Enter") {
								onNameChange(player.id, editedName);
								setIsEditingName(false);
							} else if (e.key === "Escape") {
								setEditedName(player.name);
								setIsEditingName(false);
							}
						}}
						autoFocus
						style={{
							background: "transparent",
							color: "white",
							padding: "24px 48px",
							border: "2px solid white",
							borderRadius: "4px",
							fontSize: "100px",
							fontWeight: "bold",
							textAlign: "center",
							minWidth: "700px"
						}}
					/>
				) : (
					<div
						onClick={() => {
							setIsEditingName(true);
							setEditedName(player.name);
						}}
						style={{
							background: "transparent",
							color: "white",
							padding: "24px 48px",
							borderRadius: "4px",
							fontSize: "180px",
							fontWeight: "bold",
							whiteSpace: "nowrap",
							pointerEvents: "auto",
							userSelect: "none",
							textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
							cursor: "pointer"
						}}
					>
						{player.name}
					</div>
				)}
			</Html>
		</group>
	);
};
