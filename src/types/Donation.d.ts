interface IDonate {
	name?: string;
	campaigns?: string;
	amount?: number | string;
	message?: string;
	isShowName?: string;
}

interface IDonations {
	_id?: string;
	name?: string;
	amount?: number | string;
	message?: string;
	isShowName?: boolean;
}

export type { IDonate, IDonations };
