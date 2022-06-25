export {}

export interface mainState {
    hrefLink: string,
    token: string,
    artistCount: any,
    showCard: boolean,
    userID: string,
    showLoader: boolean,
    showError: boolean,
    tracksShortTerm: Array <any>,
    tracksLongTerm: Array <any>,
    tracksMediumTerm: Array <any>,
    artistsShortTerm: Array <any>,
    artistsMediumTerm: Array <any>,
    artistsLongTerm: Array <any>,
    artistCard: boolean
}

export interface mainProps{
    
}

export interface artistCardProp{
    artist: any
}

export interface artistCardState{
    storeArtist: any
}

export interface tabsNavigationProps{
    tracksMediumTerm: any,
    tracksLongTerm: any,
    tracksShortTerm: any,

}

export interface tabsNavigationState{

}

export interface navBarProps{
    logout: any,
    home: any,
    topTracks: any
}

export interface navBarState{

}