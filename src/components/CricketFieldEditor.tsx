import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { CricketGround } from "./CricketGround";
import { DraggablePlayer } from "./DraggablePlayer";
import { FieldCoverage } from "./FieldCoverage";
import type { Player } from "../types/cricket";
import { initialPlayers, fieldMarkings } from "../data/cricketData";

export const CricketFieldEditor: React.FC = () => {
	const [players, setPlayers] = useState<Player[]>(initialPlayers);
	const [isDraggingPlayer, setIsDraggingPlayer] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [fieldTitle, setFieldTitle] = useState("My Cricket Field");
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [editedTitle, setEditedTitle] = useState(fieldTitle);
	const [showFieldCoverage, setShowFieldCoverage] = useState(true);

	// Load players and title from URL on mount
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const fieldData = params.get("field");
		if (fieldData) {
			try {
				const decoded = atob(fieldData);
				const loadedData = JSON.parse(decoded) as { players: Player[]; title?: string };
				setPlayers(loadedData.players);
				if (loadedData.title) {
					setFieldTitle(loadedData.title);
				}
			} catch (error) {
				console.error("Failed to load field from URL:", error);
			}
		}
	}, []);

	const handlePlayerDrag = (id: string, newPosition: [number, number, number]) => {
		setPlayers(prev => {
			const updated = prev.map(player =>
				player.id === id ? { ...player, position: newPosition } : player
			);
			console.log("Player state updated:", updated);
			return updated;
		});
	};

	const handleNameChange = (id: string, newName: string) => {
		setPlayers(prev => {
			const updated = prev.map(player =>
				player.id === id ? { ...player, name: newName } : player
			);
			console.log("Player state updated:", updated);
			return updated;
		});
	};

	const generateShareableUrl = () => {
		const fieldData = JSON.stringify({ players, title: fieldTitle });
		const encoded = btoa(fieldData);
		const url = `${window.location.origin}${window.location.pathname}?field=${encoded}`;

		// Copy to clipboard
		navigator.clipboard
			.writeText(url)
			.then(() => {
				setShowNotification(true);
				setTimeout(() => setShowNotification(false), 3000);
			})
			.catch(() => {
				// Fallback: show the URL in a prompt
				prompt("Copy this URL to share:", url);
			});
	};

	return (
		<div className="w-full h-screen flex flex-col bg-gray-900 overflow-hidden">
			{/* Notification */}
			{showNotification && (
				<div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
					Shareable URL copied to clipboard!
				</div>
			)}

			{/* Control Panel */}
			<div className="bg-gray-800 text-white p-4 flex gap-2 items-center">
				<h1 className="text-2xl font-bold text-green-400">FielderPro</h1>
				<h2 className="text-sm text-gray-400">built on vibes</h2>
				<div className="flex gap-2 ml-auto">
					<button
						onClick={generateShareableUrl}
						className="rounded-full px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
					>
						Share Field
					</button>
				</div>
			</div>

			{/* Editable Title Section */}
			<div className="bg-gray-750 text-white p-3 flex justify-center items-center">
				{isEditingTitle ? (
					<input
						type="text"
						value={editedTitle}
						onChange={e => setEditedTitle(e.target.value)}
						onBlur={() => {
							setFieldTitle(editedTitle);
							setIsEditingTitle(false);
						}}
						onKeyDown={e => {
							if (e.key === "Enter") {
								setFieldTitle(editedTitle);
								setIsEditingTitle(false);
							} else if (e.key === "Escape") {
								setEditedTitle(fieldTitle);
								setIsEditingTitle(false);
							}
						}}
						autoFocus
						className="bg-gray-700 text-white text-xl font-bold px-4 py-2 border-2 border-blue-400 rounded text-center focus:outline-none focus:border-blue-500"
					/>
				) : (
					<h2
						onClick={() => {
							setIsEditingTitle(true);
							setEditedTitle(fieldTitle);
						}}
						className="text-xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
					>
						{fieldTitle}
					</h2>
				)}
			</div>

			{/* Player Legend */}
			<div className="bg-gray-700 text-white p-2 flex gap-6 text-sm items-center justify-between">
				<div className="flex gap-6">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-red-500 rounded-full"></div>
						<span>Bowler</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
						<span>Wicket Keeper</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-green-400 rounded-full"></div>
						<span>Fielders</span>
					</div>
				</div>

				{/* Field Coverage Toggle */}
				<div className="flex items-center gap-3">
					<span className="text-sm font-medium">Field Coverage Analysis</span>
					<button
						onClick={() => setShowFieldCoverage(!showFieldCoverage)}
						className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
							showFieldCoverage ? "bg-blue-600" : "bg-gray-600"
						}`}
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								showFieldCoverage ? "translate-x-6" : "translate-x-1"
							}`}
						/>
					</button>
				</div>
			</div>

			{/* 3D Scene */}
			<div className="flex-1">
				<Canvas camera={{ position: [0, 100, 70], fov: 60 }} shadows>
					{/* Lighting */}
					<ambientLight intensity={0.6} />
					<directionalLight
						position={[50, 50, 25]}
						intensity={1}
						castShadow
						shadow-mapSize-width={2048}
						shadow-mapSize-height={2048}
						shadow-camera-left={-100}
						shadow-camera-right={100}
						shadow-camera-top={100}
						shadow-camera-bottom={-100}
					/>
					{/* Environment */}
					<Environment preset="sunset" />
					{/* Cricket Ground */}
					<CricketGround
						boundaryRadius={fieldMarkings.boundaryRadius}
						thirtyYardRadius={fieldMarkings.thirtyYardRadius}
						pitchLength={fieldMarkings.pitchLength}
						pitchWidth={fieldMarkings.pitchWidth}
					/>
					{/* Field Coverage Visualization */}
					<FieldCoverage
						players={players}
						boundaryRadius={fieldMarkings.boundaryRadius}
						showCoverage={showFieldCoverage}
					/>
					{/* Players */}
					{players.map(player => (
						<DraggablePlayer
							key={player.id}
							player={player}
							onDrag={handlePlayerDrag}
							onNameChange={handleNameChange}
							onDragStart={() => setIsDraggingPlayer(true)}
							onDragEnd={() => setIsDraggingPlayer(false)}
							boundaryRadius={fieldMarkings.boundaryRadius}
						/>
					))}{" "}
					{/* Camera Controls */}
					<OrbitControls
						enabled={!isDraggingPlayer}
						enablePan={true}
						enableZoom={true}
						enableRotate={true}
						maxPolarAngle={Math.PI / 2}
						minDistance={20}
						maxDistance={200}
					/>
				</Canvas>
			</div>

			{/* Instructions */}
			<div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 z-10">
				<p className="flex-shrink">
					<strong>Instructions:</strong> Click and drag players to reposition them. Click name to
					edit. Click "Share Field" to generate a shareable URL.
				</p>

				<span className="text-green-400 font-bold text-lg whitespace-nowrap">vishist.dev</span>
			</div>
		</div>
	);
};
