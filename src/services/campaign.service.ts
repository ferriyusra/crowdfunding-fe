import instance from '@/libs/axios/instance';
import endpoint from './endpoint.constant';
import { ICampaign } from '@/types/Campaign';

const campaignService = {
	// for crm
	getCampaigns: (params?: string) =>
		instance.get(`${endpoint.CAMPAIGN}?${params}`),
	getCampaignById: (id: string) => instance.get(`${endpoint.CAMPAIGN}/${id}`),
	getCampaignBySlug: (slug: string) =>
		instance.get(`${endpoint.CAMPAIGN}/${slug}/slug`),
	addCampaign: (payload: ICampaign) =>
		instance.post(`${endpoint.CAMPAIGN}`, payload),
	deleteCampaign: (id: string) => instance.delete(`${endpoint.CAMPAIGN}/${id}`),
	updateCampaign: (id: string, payload: ICampaign) =>
		instance.put(`${endpoint.CAMPAIGN}/${id}`, payload),

	// for users show
	getCampaignsAndStatusApproved: (params?: string) =>
		instance.get(`${endpoint.CAMPAIGN}-approved?${params}`),
	getCampaignByIdAndStatusApproved: (id: string) =>
		instance.get(`${endpoint.CAMPAIGN}-approved/${id}`),
};

export default campaignService;
