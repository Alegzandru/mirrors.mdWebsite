import React from "react"

export const WidthContext = React.createContext({
    width: 0,
    setWidth: () => {}
})

export const DeviceTypeContext = React.createContext({
    deviceType : "",
    setDeviceType : () => {}
})

export const CartContext = React.createContext({
    cart : [],
    setCart : () => {}
})

export const PopupContext = React.createContext({
    popupOpen : "",
    setPopupOpen : () => {}
})

export const SeenRecentlyContext = React.createContext({
    seenRecently : [],
    setSeenRecently : () => {}
})