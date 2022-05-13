import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AssetCard from "../components/assets/AssetCard";
import Button from "../components/Button";
import { MainContext } from "../components/Layout";
import Spinner from "../components/Spinner";
import LoginText from "../components/text/LoginText";
import { Asset, AssetsQuery, AtomicRes, Data } from "../schemas/global";
import { getAssets } from "../utils/atomicAssets";
import { closeAlertParams, getErrorAlertParams, loginAlertParams, noDataFoundParams } from "../utils/helpers";

const Profile: NextPage = () => {
    const { address, setAlert } = useContext(MainContext);
    const [collectionName, setCollectionName] 
        = useState<string | undefined>();
    const [schemaName, setSchemaName] = useState<string | undefined>();
    const [templateId, setTemplateId] = useState<string | undefined>();
    const [search, setSearch] = useState<string | undefined>();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loadingNextPage, setLoadingNextPage] 
        = useState<boolean>(false);
    const limit: number = 10;

    useEffect(() => {

        handleAssets();
    }, [address, page]);

    const handleAssets = async () => {
        console.log(page);
        setAlert(closeAlertParams);

        if (address) {

            const assetsQueryParams: AssetsQuery = {
                collection_name: collectionName,
                schema_name: schemaName,
                template_id: templateId,
                owner: address,
                search: search,
                page,
                limit,
                order: "desc",
                sort: 'minted'
            }

            const data: Data = await getAssets(assetsQueryParams);

            if (!data.error && data.data) {

                const a: AtomicRes = data.data;

                if (a.success && a.data) {

                    const s: Asset[] = a.data;

                    if (s.length) {

                        setAssets(prev => {

                            return [ ...prev, ...s ]
                        });
                        
                        setLoadingNextPage(false);
                    } else {

                        setAlert(noDataFoundParams);
                    }
                } else {

                    setAlert(getErrorAlertParams(a.data));
                }
            } else {

                setAlert(getErrorAlertParams(data.error));
            }
        } else {

            setAlert(loginAlertParams);
        }
    }

    const handleLoadMore = () => {
        setLoadingNextPage(true);

        setPage(prev => {

            return prev + 1;
        });
        console.log(page);
    }


    return (
        <section className="w-full flex flex-col items-center">
            {
                address
                    ? (
                        <>
                            <div className="flex flex-wrap w-full justify-center
                                mb-4">
                                {
                                    assets && assets.length
                                        ? (
                                            assets.map((asset, i) => {

                                                return (
                                                    <AssetCard
                                                        key={i}
                                                        params={asset} />
                                                )
                                            })
                                        )
                                        : (
                                            <Spinner />
                                        )
                                }
                            </div>
                            <div className="flex w-full justify-center mb-4">
                                {
                                    loadingNextPage
                                        && (
                                            <Spinner />
                                        )
                                }
                            </div>
                            <div>
                                <Button
                                    name="load more"
                                    variant="outline"
                                    onClick={handleLoadMore}
                                    className=''
                                    disabled={false} />
                            </div>
                        </>
                    )
                    : (
                        <LoginText />
                    )
            }
        </section>
    )
}

export default Profile;