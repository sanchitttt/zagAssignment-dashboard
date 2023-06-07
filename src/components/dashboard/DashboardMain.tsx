import SearchIcon from "../../assets/icons/SearchIcon";
import DashIcon from "../../assets/icons/DashIcon";
import ChevronUpIcon from "../../assets/icons/ChevronUpIcon";
import ChevronDownIcon from "../../assets/icons/ChevronDownIcon";
import dashboardSlice, { DashboardOrderItemProps } from "../../redux/features/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useState, useEffect } from "react";
import DownSmallChevron from "../../assets/icons/DownSmallChevron";
import UpSmallChevron from "../../assets/icons/UpSmallChevron";
import OptionsIcon from "../../assets/icons/OptionsIcon";
import EditIcon from "../../assets/icons/EditIcon";
import GreenTickIcon from "../../assets/icons/GreenTickIcon";
import CancelIcon from "../../assets/icons/CancelIcon";
import PlusIcon from "../../assets/icons/PlusIcon";

interface DashboardOrders {
    totalConfirmed: number
}

interface DashboardOrderFilterButtonProps {
    type: 'ActiveOrders' | 'Amount' | 'PlacedOn' | 'Options';
}

function AddOrderButton() {
    return <button aria-describedby="button"
        className='bg-[#1B59F8] text-[#fff] font-main px-[12px] py-[8px] flex items-center rounded-[10px]'
    ><div className="mr-[10px]">+</div> Add Order</button>
}

function DashboardHeadline() {
    return <div className='Headline font-bold font-main text-[24px]'>Orders</div>
}

function DashboardOrdersTop() {
    const { activeOrders, orders } = useAppSelector((state) => state.dashboard)
    return <div className="flex justify-between items-center">
        <div className='flex gap-[15px] items-center'>
            <div className='font-main text-[17px] font-bold'>{activeOrders}</div>
            <div className='text-[#2f2f2f66] font-main'>{orders.length}</div>
        </div>
        <button aria-describedby="button" className='w-[36px] h-[36px] flex items-center justify-center bg-[#EFF0F6] rounded-full'>
            <div>
                <DashIcon />
            </div>
        </button>
    </div>
}

function SearchBar() {
    const { searchText } = useAppSelector((state) => state.dashboard);
    const { handleText } = dashboardSlice.actions;
    const dispatch = useAppDispatch();

    return <div className='flex items-center'>
        <div className='mr-[10px]'>
            <SearchIcon />
        </div>
        <input
            className='text-[14px] font-medium font-main search'
            placeholder="Search"
            type={'text'}
            value={searchText}
            onChange={(e) => dispatch(handleText(e.target.value))}
        />
    </div>
}

function DashboardOrderFilterButton({ type }: DashboardOrderFilterButtonProps) {
    const [showModal, setShowModal] = useState(false);
    const [showAmountModal, setShowAmountModal] = useState(false)
    const { activeOrders, activeAmountButtonVal } = useAppSelector((state) => state.dashboard);
    const { handleUpdationOnActiveOrderTypeChange, handleUpdationOnAmountChange, handleActiveAmountFilter } = dashboardSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(handleUpdationOnActiveOrderTypeChange(activeOrders))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeOrders])

    const { handleActiveOrders } = dashboardSlice.actions;
    if (type === 'ActiveOrders') {
        return <div className='relative'>
            <button aria-describedby="button" className="flex bg-[#EFF0F6] w-[125px] items-center justify-between rounded-[7px] h-[27px] relative"
                onClick={() => {
                    setShowModal(!showModal)
                }}
            >
                <div className='font-main ml-[10px]  font-semibold text-[10px] text-[#4F5E74] tracking-[0.02em] mr-[10px]'>ACTIVE ORDERS</div>
                <div className="mr-[10px]"
                    onClick={() => setShowModal(false)}
                >
                    {showModal ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </div>
            </button >
            {
                showModal &&
                < div className='absolute top-[35px] flex flex-col gap-[10px] w-[225px] rounded-[10px] z-[1000] bg-white'
                    style={{ boxShadow: '0px 2px 24px rgba(0, 0, 0, 0.1)' }}
                >
                    <div className="flex items-center gap-[10px] ml-[15px] mt-[10px]"
                    >
                        <input
                            type='radio'
                            name='activeOrderRadio'
                            value='Active Orders'
                            style={{ accentColor: '#4F5E74' }}
                            checked={activeOrders === 'Confirmed'}
                            onChange={() => {
                                dispatch(handleActiveOrders('Confirmed'))
                                setShowModal(false)
                            }}
                        />
                        <div className='font-main text-[14px] font-normal'>Confirmed</div>
                    </div>

                    <div className="flex gap-[10px]  ml-[15px]"
                    >
                        <input
                            type='radio'
                            name='activeOrderRadio'
                            value='Delivered'
                            style={{ accentColor: '#4F5E74' }}
                            checked={activeOrders === 'Delivered'}
                            onChange={() => {
                                dispatch(handleActiveOrders('Delivered'))
                                setShowModal(false)
                            }}
                        />
                        <div className='font-main text-[14px] font-normal'>Delivered</div>
                    </div>
                    <div className="flex gap-[10px]  ml-[15px]"
                    >
                        <input
                            type='radio'
                            name='activeOrderRadio'
                            value='All'
                            style={{ accentColor: '#4F5E74' }}
                            checked={activeOrders === 'All'}
                            onChange={() => {
                                dispatch(handleActiveOrders('All'))
                                setShowModal(false)
                            }}
                        />
                        <div className='font-main text-[14px] font-normal'>All</div>
                    </div>
                    <div className="flex gap-[10px]  ml-[15px]"

                    >
                        <input
                            type='radio'
                            name='activeOrderRadio'
                            value='Refund Completed (30d)'
                            style={{ accentColor: '#4F5E74' }}
                            checked={activeOrders === 'Refund Completed (30d)'}
                            onChange={() => {
                                dispatch(handleActiveOrders('Refund Completed (30d)'))
                                setShowModal(false)
                            }}
                        />
                        <div className='font-main text-[14px] font-normal'>Refund Completed (30d)</div>
                    </div>
                    <div className="flex gap-[10px]  ml-[15px] mb-[10px]"
                    >
                        <input
                            type='radio'
                            name='activeOrderRadio'
                            value='Pending'
                            style={{ accentColor: '#4F5E74', background: '#4F5E74' }}
                            checked={activeOrders === 'Pending'}
                            onChange={() => {
                                dispatch(handleActiveOrders('Pending'))
                                setShowModal(false)
                            }}
                        />
                        <div className='font-main text-[14px] font-normal'>Pending</div>
                    </div>
                </div>

            }
        </div>
    }
    else if (type === 'Amount') {
        return <button aria-describedby="button" className="flex bg-[#EFF0F6] w-[125px] relative  items-center justify-between rounded-[7px] h-[27px]"
            onClick={() => setShowAmountModal(!showAmountModal)}
        >
            <div className='font-main ml-[10px]  font-semibold text-[10px] text-[#4F5E74] tracking-[0.02em] mr-[10px]'>Amount</div>
            <div className="mr-[10px]">
                {showAmountModal ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
            {
                showAmountModal &&
                < div className='absolute top-[35px] flex flex-col gap-[10px] w-[225px] rounded-[10px] z-[1000] bg-white py-[10px]'
                    style={{ boxShadow: '0px 2px 24px rgba(0, 0, 0, 0.1)' }}
                >
                    <div className="flex items-center gap-[10px] ml-[15px] mt-[10px]"
                    >
                        <input
                            type='radio'
                            name='activeAmountFilter'
                            value='High to low'
                            style={{ accentColor: '#4F5E74' }}
                            checked={activeAmountButtonVal === 'High to low'}
                            onChange={() => {
                                dispatch(handleActiveAmountFilter('High to low'))
                                setShowModal(false)
                                dispatch(handleUpdationOnAmountChange('High to low'))
                            }}
                        />
                        <div className='font-main text-[14px] font-normal'>High to low</div>
                    </div>

                    <div className="flex gap-[10px]  ml-[15px]"
                    >
                        <input
                            type='radio'
                            name='activeAmountFilter'
                            value='Low to high'
                            style={{ accentColor: '#4F5E74' }}
                            checked={activeAmountButtonVal === 'Low to high'}
                            onChange={() => {
                                dispatch(handleActiveAmountFilter('Low to high'))
                                setShowModal(false)
                                dispatch(handleUpdationOnAmountChange('Low to high'))
                            }}
                        />
                        <div className='font-main text-[14px] font-normal'>Low to high</div>
                    </div>
                </div>

            }
        </button>
    }
    else if (type === 'PlacedOn') {
        return <button aria-describedby="button" className="flex bg-[#EFF0F6] w-[125px] items-center justify-between rounded-[7px] h-[27px]"
            onClick={() => setShowModal(!showModal)}
        >
            <div className='font-main ml-[10px] font-semibold text-[10px] text-[#4F5E74] tracking-[0.02em] mr-[10px]'>Placed On</div>
            <div className="mr-[10px]">
                {showModal ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
        </button>
    }
    else if (type === 'Options') {
        return <button aria-describedby="button" className="flex items-center justify-start rounded-[7px]"
            onClick={() => setShowModal(!showModal)}
        >
            Active Orders
            {showModal ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
    }
    else {
        return <></>
    }
}

function DashboardOrdersTopBar() {
    return <div className='flex  items-center justify-between'>
        <div className='w-[300px]'>
            <SearchBar />
        </div>
        <div className='flex gap-[5px] items-center'>
            <DashboardOrderFilterButton type='ActiveOrders' />
            <div className='flex flex-col gap-[4px]'>
                <UpSmallChevron />
                <DownSmallChevron />
            </div>
        </div>
        <div className='flex gap-[5px] items-center'>
            <DashboardOrderFilterButton type='Amount' />
            <div className='flex flex-col gap-[4px]'>
                <UpSmallChevron />
                <DownSmallChevron />
            </div>
        </div>
        <div className='flex gap-[5px] items-center'>
            <DashboardOrderFilterButton type='PlacedOn' />
            <div className='flex flex-col gap-[4px]'>
                <UpSmallChevron />
                <DownSmallChevron />
            </div>
        </div>
        <div className='flex items-center gap-[7.5px]'>
            <div className='font-main text-[14px] font-medium text-[#808080]'>
                Options
            </div>
            <DownSmallChevron />
        </div>
    </div>
}

function DashboardOrderItem({ companyLogo, companyName, product, orders, amount, placedOn, index, idx }: DashboardOrderItemProps) {
    const { checkedOrder } = useAppSelector((state) => state.dashboard);
    const { handleCheckOrder, handleEditingChanges } = dashboardSlice.actions;
    const dispatch = useAppDispatch();
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [tempCompanyName, setTempCompanyName] = useState(companyName);
    const [tempProduct, setTempProduct] = useState(product);
    const [tempOrders, setTempOrders] = useState(orders);
    const [tempAmount, setTempAmount] = useState(amount);
    const [tempPlacedOn, setTempPlacedOn] = useState(placedOn);


    return <div className='flex items-center justify-between mb-[15px]'>
        <div className='flex gap-[7.5px] w-[275px]'>
            <input
                className='w-[15px]'
                type='radio'
                name='orderItem'
                checked={checkedOrder === companyName}
                onChange={() => dispatch(handleCheckOrder(companyName))}
            />
            <div>
                <img src={companyLogo}
                    alt='companyLogo'
                    className='rounded-[10px]'
                />
            </div>

            {!isEditing
                ? <div className='flex flex-col'>
                    <div className='font-main text-[14px] font-medium'>{companyName}</div>
                    <div className='font-main text-[12px] font-normal text-[#00000080]'>{product}</div>
                </div>
                : <div className='flex flex-col'>
                    <input type='text' className='border-[1px]' value={tempCompanyName} onChange={(e) => setTempCompanyName(e.target.value)} />
                    <input type='text' value={tempProduct} onChange={(e) => setTempProduct(e.target.value)} />

                </div>
            }


        </div>
        {!isEditing
            ? <>


                <div className='font-main text-[14px] text-[#70768C]'>{orders}</div>
                <div className='font-main text-[14px] text-[#70768C]'>{amount}</div>
                <div className='font-main text-[14px] text-[#70768C]'>{placedOn}</div>
            </>
            : <>

                <input type='number' className='font-main text-[14px]' value={tempOrders} onChange={(e) => setTempOrders(parseInt(e.target.value))} />
                <input type='number' className='font-main text-[14px]' value={tempAmount} onChange={(e) => setTempAmount(parseInt(e.target.value))} />
                <input type='text' className='font-main text-[14px]' value={tempPlacedOn} onChange={(e) => setTempPlacedOn(e.target.value)} />
            </>
        }

        <div onClick={() => setShowOptions(!showOptions)} className='relative'>
            {isEditing ?
                <div className="flex flex-col gap-[5px] items-center justify-end w-[20px] ">
                    <div className='flex w-[100%]  items-center'>
                        <button className='w-[100%] w-[20px] flex items-center justify-center'
                            onClick={(e) => {
                                console.log('im clicked');
                                e.stopPropagation()
                                setIsEditing(false);
                                dispatch(handleEditingChanges({
                                    companyName: tempCompanyName,
                                    product: tempProduct,
                                    amount: tempAmount,
                                    placedOn: tempPlacedOn,
                                    orders: tempOrders,
                                    index: index,
                                    idx: idx

                                }))
                                setShowOptions(false)
                            }}
                        >
                            <GreenTickIcon />
                        </button>
                    </div>
                    <button className='w-[100%] w-[20px] flex items-center justify-center'
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsEditing(false);
                            setTempAmount(amount);
                            setTempCompanyName(companyName);
                            setTempPlacedOn(placedOn);
                            setTempProduct(product)
                            setTempOrders(orders);
                            setShowOptions(false)
                        }}
                    >
                        <CancelIcon />
                    </button>
                </div>
                : <OptionsIcon />}
            {showOptions && !isEditing &&
                < div className='absolute left-[-100px] rounded-[10px] w-[100px] bg-[#fff]' style={{ boxShadow: '0px 2px 24px rgba(0, 0, 0, 0.1)' }}>
                    <button className='w-[100%] flex gap-[10px] hoverGrey py-[10px] px-[5px] rounded-[10px]'>
                        <EditIcon />
                        <div className='font-main text-[11px]'
                            onClick={() => setIsEditing(true)}
                        >Edit</div>
                    </button>
                </div>}
        </div>
    </div >
}

function DashboardOrders() {
    const { orders } = useAppSelector((state) => state.dashboard);
    return <div className='w-[100%] py-[20px] rounded-[20px] bg-[#fff] flex items-center justify-center'>
        <div className='w-[90%] h-[95%]'>
            <DashboardOrdersTop />
            <div className='mb-[15px] mt-[10px]'>
                <hr />
            </div>
            <DashboardOrdersTopBar />
            <div className='mt-[20px]'>
                {orders.map((item, idx) => {
                    const { companyLogo, companyName, product, orders, amount, placedOn, orderType, index } = item;
                    return <DashboardOrderItem
                        index={index}
                        idx={idx}
                        key={index}
                        companyLogo={companyLogo}
                        companyName={companyName}
                        product={product}
                        orders={orders}
                        amount={amount}
                        placedOn={placedOn}
                        orderType={orderType}
                    />
                })}
            </div>
        </div>
    </div>
}

function DashBoardIssues() {
    return <div className='w-[100%] py-[20px] rounded-[20px] bg-[#fff] flex items-center justify-center mt-[15px]'>
        <div className='w-[90%] h-[95%]'>
            <div className='flex gap-[15px] items-center'>
                <div className='font-main text-[17px] font-bold'>Issues</div>
                <div className='text-[#2f2f2f66] font-main'>21</div>

            </div>

        </div>
        <button aria-describedby="button" className='w-[36px] h-[36px] flex items-center justify-center bg-[#EFF0F6] rounded-full'>
            <div>
                <PlusIcon />
            </div>
        </button>
    </div>
}

function DashboardMain() {
    return (
        <div className='w-[85vw] flex items-center justify-center'>
            <div className='w-[90%] h-[100%] mt-[35px] flex flex-col'>
                <div className='flex justify-between items-center '>
                    <DashboardHeadline />
                    <AddOrderButton />
                </div>
                <div className='mt-[30px]'>
                    <hr />
                </div>
                <div className="mt-[30px] h-[80%]">
                    <DashboardOrders />
                    <DashBoardIssues />
                </div>
            </div>
        </div>
    )
}

export default DashboardMain