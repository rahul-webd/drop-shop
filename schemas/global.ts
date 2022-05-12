import { Dispatch, SetStateAction } from "react"

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

export type AlertStateParams = {
    state: AlertState,
    message: string | undefined
}

export type AlertParams = {
    state: AlertState,
    message: string | undefined,
    closeAlert: () => void,
    className: string | undefined
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

export type BigSelect = { 
    data: Data | undefined,
    setSelect: any,
    setDefault: any
}

export type SearchBar = {
    placeHolder: string,
    query: string,
    setQuery: Dispatch<SetStateAction<string>>
    className: string | undefined
}

export type AssetsQuery = {
    collection_name: string | undefined,
    schema_name: string | undefined,
    template_id: string | undefined,
    owner: string,
    search: string | undefined,
    page: number,
    limit: number,
    order: 'desc' | 'asc',
    sort: 'asset_id' | 'minted' | 'template_mint'
}

export type AtomicRes = {
    success: boolean,
    data: any,
    query_time: number
}

export type Collecton = {
    collection_name: string,
    name: string,
    author: string,
    allow_notify: boolean,
    authorized_accounts: string[],
    notify_accounts: string[],
    market_fee: number,
    created_at_block: string,
    created_at_time: string
}

export type Schema = {
    schema_name: string
}

export type Template = {
    template_id: string,
    max_supply: string,
    issued_supply: string,
    is_transferable: boolean,
    is_burnable: boolean,
    immutable_data: any,
    created_at_block: string,
    created_at_time: string
}

export type BackedTokens = {
    token_contract: string,
    token_symbol: string,
    token_precision: number,
    amount: string
}

export type Asset = {
    contract: string,
    asset_id: string,
    owner: string,
    name: string,
    is_transferable: boolean,
    is_burnable: boolean,
    template_mint: string,
    collection: Collecton,
    schema: Schema,
    template: Template,
    backed_tokens: BackedTokens[],
    immutable_data: any,
    mutable_data: any,
    data: any,
    burned_by_account: string,
    burned_at_block: string,
    burned_at_time: string,
    updated_at_block: string,
    updated_at_time: string,
    transferred_at_block: string,
    transferred_at_time: string,
    minted_at_block: string,
    minted_at_time: string
}

export type AssetCardParams = {
    params: Asset
}

export type MediaType = 'img' | 'video'

export type MediaProvider = 'ipfs' | 'resized'

export type Media = {
    src: string | undefined,
    alt: string | undefined,
    h: string,
    w: string,
    type: MediaType
    provider: MediaProvider,
    className: string | undefined
}

export type CardMedia = {
    src: string | undefined,
    alt: string,
    type: MediaType
    provider: MediaProvider,
    className: string | undefined
}

export type CollectionTag = {
    name: string,
    id: string,
    className: string | undefined
}

export type MintTag = {
    text: string,
    className: string | undefined
}