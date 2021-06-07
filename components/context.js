import React from "react"

export const WidthContext = React.createContext({
    width: 0,
    setWidth: () => {}
})

export const DeviceTypeContext = React.createContext({
    deviceType : "",
    setDeviceType : () => {}
})