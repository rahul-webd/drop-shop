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
    text: string | (() => string), 
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

export type ValidCpuTokens = 'WAX' | 'STEAK'

export type CpuConfig = {
    CPUBoostPerAsset: string,
    boostLimit: string,
    depositAsset: string,
    durationInMinutes: number,
    ownerContract: string,
    rewardPerDepositAsset: {
        contract: string,
        quantity: string
    }[]
}

type Pool = {
    contract: string,
    quantity: string
}

export type ExchRate = {
    fee: number,
    fee_contract: string,
    id: number,
    pool1: Pool,
    pool2: Pool,
    supply: string
}

export type EosjsRes = {
    rows: any[],
    more: boolean,
    next_key: any
}

export type SwapFactor = {
    factor: number,
    sym1: string,
    sym2: string
}

export type Quantity = {
    value: number,
    symbol: string
}

export type Tool = {
    name: string,
    path: string,
    image: string | undefined,
    bgColor: string,
    textColor: string
}

export type ValidCpuConfig = 0 | 1

export type Transaction = {
    transactionId: string
}