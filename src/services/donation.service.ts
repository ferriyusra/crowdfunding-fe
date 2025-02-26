import instance from '@/libs/axios/instance';
import endpoint from './endpoint.constant';
import { IDonate } from '@/types/Donation';

const donationService = {
	getDonations: (params: string) =>
		instance.get(`${endpoint.DONATION}?${params}`),
	getFundraisingDonation: (campaignId: string, params: string) =>
		instance.get(`${endpoint.DONATION}-history/${campaignId}?${params}`),
	getDonationById: (id: string) => instance.get(`${endpoint.DONATION}/${id}`),
	createDonation: (payload: IDonate, slug: string) =>
		instance.post(`${endpoint.DONATION}/${slug}`, payload),
	updateDonationStatus: (id: string, status: string) =>
		instance.put(`${endpoint.DONATION}/${id}/${status}`),
	deleteDonation: (id: string) => instance.delete(`${endpoint.DONATION}/${id}`),
};

export default donationService;
