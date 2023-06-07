import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type ValidOrderTypes = 'Confirmed' | 'Delivered' | 'Refund Completed (30d)' | 'Pending' | 'All';
export type ValidAmountButtonTypes = 'High to low' | 'Low to high' | 'None';
export interface DashboardOrderItemProps {
    companyLogo: string,
    companyName: string,
    product: string,
    orders: number,
    amount: number,
    placedOn: string,
    index: number,
    orderType: ValidOrderTypes
    idx?: number
}

const mockOrderData: DashboardOrderItemProps[] = [
    {
        companyLogo: 'https://images2.imgbox.com/e5/c8/38YQRtlv_o.jpg',
        companyName: 'McDonalds',
        product: 'Big Mac Jumbo',
        orders: 10,
        amount: 9,
        placedOn: '6/3/22',
        index: 0,
        orderType: 'Delivered',
    },
    {
        companyLogo: 'https://images2.imgbox.com/66/29/q2f5zEuR_o.jpg',
        companyName: 'Tesla',
        product: 'Model X',
        orders: 10,
        amount: 3000,
        placedOn: '6/3/22',
        index: 1,
        orderType: 'Confirmed'
    },
    {
        companyLogo: 'https://images2.imgbox.com/75/cf/U9lqS2W2_o.jpg',
        companyName: 'GM',
        product: 'Alternator Car Parts',
        orders: 32,
        amount: 49,
        placedOn: '4/9/23',
        index: 2,
        orderType: 'Confirmed'

    },
    {
        companyLogo: 'https://images2.imgbox.com/77/52/1Ec7bumh_o.jpg',
        companyName: 'AARP',
        product: 'Health Care Package Adult A1',
        orders: 276,
        amount: 23,
        placedOn: '9/4/23',
        index: 3,
        orderType: 'Delivered'
    },
    {
        companyLogo: 'https://images2.imgbox.com/48/88/SP2uOFxR_o.jpg',
        companyName: 'Disney',
        product: 'Renewal Subscription',
        orders: 276,
        amount: 23,
        placedOn: '9/4/23',
        index: 4,
        orderType: 'Refund Completed (30d)'
    },
    {
        companyLogo: 'https://images2.imgbox.com/32/af/J52hm2N1_o.jpg',
        companyName: 'Prime Theraputics',
        product: 'Natural oil',
        orders: 1098,
        amount: 135,
        placedOn: '6/3/22',
        index: 5,
        orderType: 'Refund Completed (30d)'
    },
    {
        companyLogo: 'https://images2.imgbox.com/13/1e/f43xdQmq_o.jpg',
        companyName: 'Match.com',
        product: 'Renewable Subscription',
        orders: 4298,
        amount: 48,
        index: 6,
        placedOn: '12/2/22',
        orderType: 'Pending'
    },
    {
        companyLogo: 'https://images2.imgbox.com/d6/db/eR9iM5Vz_o.jpg',
        companyName: 'Chevy',
        product: 'FX234A',
        orders: 1928,
        amount: 90,
        placedOn: '4/19/23',
        index: 7,
        orderType: 'Confirmed'
    },
    {
        companyLogo: 'https://images2.imgbox.com/af/38/WmG0Ttzr_o.jpg',
        companyName: 'GM',
        product: 'Car Parts AJ89B',
        orders: 640,
        amount: 167,
        placedOn: '1/2/23',
        index: 8,
        orderType: 'Pending'
    }
]

interface InitialState {
    activeOrders: ValidOrderTypes,
    amount: null,
    placedOn: null,
    options: null,
    searchText: string,
    initialOrders: DashboardOrderItemProps[],
    orders: DashboardOrderItemProps[],
    checkedOrder: string,
    activeAmountButtonVal: ValidAmountButtonTypes
}

const initialState: InitialState = {
    activeOrders: 'All',
    amount: null,
    placedOn: null,
    options: null,
    searchText: '',
    initialOrders: mockOrderData,
    orders: mockOrderData,
    checkedOrder: '',
    activeAmountButtonVal: 'None'
}

type EditingChangePayload = {
    companyName: string,
    product: string,
    orders: number,
    amount: number,
    placedOn: string,
    index: number,
    idx?: number
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        handleActiveOrders: (state, action: PayloadAction<ValidOrderTypes>) => {
            if (action.payload === 'All') {
                state.activeOrders = action.payload;
                state.orders = state.initialOrders
            }
            else state.activeOrders = action.payload;
        },
        handleActiveAmountFilter: (state, action: PayloadAction<ValidAmountButtonTypes>) => {
            state.activeAmountButtonVal = action.payload;
        },
        handleText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
            if (!action.payload.length) state.orders = mockOrderData;
            else {
                state.orders = state.initialOrders.filter((item) => {
                    const query = action.payload.toLowerCase();
                    const cName = item.companyName.toLowerCase();
                    const cProduct = item.product.toLowerCase();
                    if (cName.includes(query) || cProduct.includes(query)) return item;
                })
            }

        },
        handleCheckOrder: (state, action: PayloadAction<string>) => {
            state.checkedOrder = action.payload
        },
        handleEditingChanges: (state, action: PayloadAction<EditingChangePayload>) => {
            const { index, companyName, product, orders, amount, placedOn, idx } = action.payload;
            for (let i = 0; i < state.initialOrders.length; i++) {
                if (index === state.initialOrders[i].index) {
                    console.log('yes', i, index)
                    state.initialOrders[i] = {
                        ...state.initialOrders[i],
                        companyName,
                        product,
                        orders,
                        amount,
                        placedOn,
                        index,
                    }
                    if (idx) {
                        state.orders[idx] = {
                            ...state.initialOrders[i],
                            companyName,
                            product,
                            orders,
                            amount,
                            placedOn,
                            index,
                        }
                    }

                }
            }

        },
        handleUpdationOnActiveOrderTypeChange: (state, action: PayloadAction<ValidOrderTypes>) => {
            state.orders = state.initialOrders.filter((item) => {
                if (action.payload === 'All') return item;
                if (item.orderType === action.payload) {
                    return item;
                }
            })
        },
        handleUpdationOnAmountChange: (state, action: PayloadAction<ValidAmountButtonTypes>) => {
            if (action.payload === 'High to low') {
                state.orders = state.orders.sort((a, b) => b.amount - a.amount)
            }
            else if (action.payload === 'Low to high') {
                state.orders = state.orders.sort((a, b) => a.amount - b.amount)
            }
        }
    }
})

export default dashboardSlice;