import { ShopItem, MenuItem } from "../schemas/global";

const ShopItem = ({ data }: { data: ShopItem }) => {
    const itemKeys = Object.keys(data.item);
    let di: any = []

    if (itemKeys) {
        di = data.item
    }

    return (
        <section>
            {
                data.item !== {}
                    && <h2>{ di }</h2>
            }
        </section>
    )
}
