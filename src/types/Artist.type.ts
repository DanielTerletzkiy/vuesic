export type Artist = {
    thumb_url: string;
    mbid: string;
    facebook_page_url: string;
    image_url: string;
    tracker_count: number;
    tracking: any[];
    upcoming_event_count: number;
    url: string;
    support_url: string;
    show_multi_ticket: boolean;
    name: string;
    options: ArtistOptions;
    links: ArtistLinks[];
    artist_optin_show_phone_number: boolean;
    id: string;
}
export type ArtistOptions = {
    display_listen_unit: boolean;
}
export type ArtistLinks = {
    type: string;
    url: string;
}
