export type Data = {
    data: any,
    error: string
}

interface EmptyObject {}

interface menuItemPrice {
    quantity: string,
    contract: string
}

export interface MenuItem {
    Memo: string,
    CollectionName: string,
    SchemaName: string,
    TemplateId: number,
    Price: menuItemPrice,
    ProfitTo: string,
    AffiliateFraction: string
}

export interface LimitItem {
    Memo: string,
    StartTimeOn: number,
    StartTime: string,
    StopTimeOn: number,
    StopTime: string,
    MaxToSellOn: number,
    MaxToSell: number,
    LeftToSell: number,
    MaxPerAccountOn: number,
    MaxPerAccount: number,
    MaxPerPurchaseOn: number,
    MaxPerPurchase: number,
    SecondsBetweenOn: number,
    SecondsBetween: number
}

export interface ShopItem {
    item: MenuItem,
    limits: LimitItem
}

export interface ShopItems {
    [memo: string]: ShopItem
}

export interface Drop {
    item: MenuItem,
    limits: LimitItem,
    templateData: any
}

export type fetchOptions = {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'OPTIONS',
    headers: {
        'Content-Type': 'application/json'
    },
    body: string
}

export type Text = { 
    text: string, 
    className: string | undefined
}

export type Tag = { 
    text: string, 
    fontSize: string,
    className: string | undefined,
    variant: 'primary' | 'warning' | 'danger'
}

export type AlertState = 'success' | 'warning' | 'danger' | 'processing' |
    'closed' | 'info'

export type Alert = {
    state: AlertState,
    message: string | undefined
}