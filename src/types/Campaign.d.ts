import { DateValue } from '@nextui-org/react';

interface ICampaign {
	_id?: string;
	name?: string;
	slug?: string;
	description?: string;
	category?: string;
	image?: string | FileList;
	targetAmount?: number | string;
	collectedAmount?: number;
	progressValue?: number;
	deadline?: string | DateValue;
}

interface ICampaignForm extends ICampaign {
	status?: string;
}

export type { ICampaign, ICampaignForm };
