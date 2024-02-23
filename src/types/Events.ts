export type Events = EventsChild[];
export interface EventsChildArtistOptions {
	display_listen_unit: boolean;
}
export interface EventsChildArtistLinks {
	type: string;
	url: string;
}
export interface EventsChildArtist {
	id: string;
	name: string;
	url: string;
	mbid: string;
	options: EventsChildArtistOptions;
	tracking: any[];
	image_url: string;
	thumb_url: string;
	facebook_page_url: string;
	tracker_count: number;
	upcoming_event_count: number;
	support_url: string;
	links: EventsChildArtistLinks[];
	artist_optin_show_phone_number: boolean;
	show_multi_ticket: boolean;
}
export interface EventsChildVenue {
	location: string;
	name: string;
	latitude: string;
	longitude: string;
	street_address: string;
	postal_code: string;
	city: string;
	country: string;
	region: string;
}
export interface EventsChildOffers {
	type: string;
	url: string;
	status: string;
}
export interface EventsChild {
	id: string;
	url: string;
	datetime: string;
	title: string;
	description: string;
	artist: EventsChildArtist;
	venue: EventsChildVenue;
	lineup: string[];
	offers: EventsChildOffers[];
	artist_id: string;
	on_sale_datetime: string;
	festival_start_date: string;
	festival_end_date: string;
	festival_datetime_display_rule: string;
	starts_at: string;
	ends_at: string;
	datetime_display_rule: string;
	bandsintown_plus: boolean;
}
