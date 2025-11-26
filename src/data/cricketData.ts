import type { Player } from "../types/cricket";

export const initialPlayers: Player[] = [
	// Bowler
	{ id: "bowler", name: "Bowler", position: [0, 0, 25], type: "bowler" },

	// Wicket Keeper
	{ id: "wk", name: "Wicket Keeper", position: [0, 0, -20], type: "wicketkeeper" },

	// Fielders
	{ id: "slip1", name: "First Slip", position: [-10, 0, -23], type: "fielder" },
	{ id: "slip2", name: "Second Slip", position: [-4, 0, -22], type: "fielder" },
	{ id: "gully", name: "Gully", position: [-2, 0, -23], type: "fielder" },
	{ id: "point", name: "Point", position: [-26, 0, 0], type: "fielder" },
	{ id: "cover", name: "Cover", position: [-10, 0, 10], type: "fielder" },
	{ id: "mid-off", name: "Mid Off", position: [-9, 0, 26], type: "fielder" },
	{ id: "mid-on", name: "Mid On", position: [9, 0, 26], type: "fielder" },
	{ id: "square-leg", name: "Square Leg", position: [26, 0, 0], type: "fielder" },
	{ id: "fine-leg", name: "Fine Leg", position: [8, 0, -15], type: "fielder" }
];

export const fieldMarkings = {
	center: [0, 0, 0] as [number, number, number],
	pitchLength: 20.12, // 22 yards in meters
	pitchWidth: 3.05, // 10 feet in meters
	boundaryRadius: 65, // typical boundary distance
	thirtyYardRadius: 27.43 // 30 yards in meters
};
