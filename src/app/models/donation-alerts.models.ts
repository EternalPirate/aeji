interface DonationAlertsAdditionalData {
	force_variation: string;
	randomness: number;
}

export interface DonationAlertsMessage {
	additional_data: DonationAlertsAdditionalData;
	alert_type: string;
	amount: number;
	amount_formatted: string;
	amount_main: number;
	billing_system: string;
	billing_system_type: null;
	currency: string;
	date_created: string;
	emotes: null;
	id: number;
	is_shown: null;
	message: string;
	username: string;
	_is_test_alert: boolean;
}
