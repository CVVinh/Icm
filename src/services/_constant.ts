const CONST = {
    API: {
        ITEMSET: {
            LIST: '/func/get-item-set-list',
            DETAIL: (id: string) => `/func/get-item-set-info?itemIdSet=${id}`,
            CREATE: `/func/add-item-set`,
            UPDATE: `/func/update-item-set-info`,
            DELETE: `/func/delete-item-set`,

        },
        MAKER: {
            LIST: '/func/get-maker-list',

        },
        SHIPPING: {
            DETAIL: (id: string) => `/func/get-shipping-info?assetId=${id}`,
        },
        PICKUP: {
            DETAIL: (id: string) => `/func/get-pickup-info?assetId=${id}`,
            UPDATE: `/func/update-pickup`
        },
        KITTING: {
            LIST: '/master/get-kitting-list',
            DETAIL: (id: string) => `/func/get-kitting-info?assetId=${id}`,
            UPDATE: `/func/update-kitting`,
        },
        REPAIRING: {
            DETAIL: (id: string) => `/func/get-repairing-info?assetId=${id}`,
            UPDATE: `/func/update-repairing-info`,
        },
        DISPOSAL: {
            DETAIL: (id: string) => `/func/get-disposal-info?assetId=${id}`,
            UPDATE: `/func/update-disposal-info`,
        },
        ACCOUNT: {
            LIST: '/func/get-account-list',
        },
        OUTSOURCING_COMPANY: {
            LIST: '/func/get-outsourcing-company-list',
        },
        BASE: {
            GET_ALL_LIST_BASE: `/func/get-base-list`,
            GET_ACCOUNT_USER_INFO: (id: number) =>  `/func/get-base-user-info?accountId=${id}`,
        }
    }
}

export default CONST
