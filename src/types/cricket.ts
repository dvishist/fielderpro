export interface Player {
	id: string;
	name: string;
	position: [number, number, number];
	type: "batsman" | "bowler" | "wicketkeeper" | "fielder";
}

export interface FieldMarkings {
	center: [number, number, number];
	pitchLength: number;
	pitchWidth: number;
	boundaryRadius: number;
	thirtyYardRadius: number;
}
