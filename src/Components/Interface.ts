export {}

export interface mainState {
    hrefLink: string,
    token: string,
    artistCount: any,
    showCard: boolean,
    userID: string,
    showLoader: boolean,
    showError: boolean,
    shortTerm: Array <any>,
    longTerm: Array <any>,
    mediumTerm: Array <any>
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
    artist: any
}

export interface tabsNavigationState{

}

export interface navBarProps{
    logout: any,
    home: any,
}

export interface navBarState{

}