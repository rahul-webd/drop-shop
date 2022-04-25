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
    item: MenuItem | EmptyObject,
    limits: LimitItem | EmptyObject
}