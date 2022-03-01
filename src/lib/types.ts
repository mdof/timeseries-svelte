export type Data = {
	name: string;
	data: number[];
	max: number;
	min: number;
};

export type Signals = {
	units: string;
	title: string;
	data: Data[];
};
