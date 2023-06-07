import WorkspaceIcon from "../../assets/icons/WorkspaceIcon";
import ReportIcon from "../../assets/icons/ReportIcon";
import Logo from "../Logo";
import SettingsIcon from "../../assets/icons/SettingsIcon";

interface NavbarItem {
    iconElement: React.ReactNode,
    text: string,
}

interface NavbarItemProps {
    items: NavbarItem[]
}

const mockItems = [
    { iconElement: <ReportIcon />, text: 'Reports' },
    { iconElement: <WorkspaceIcon />, text: 'Workspaces' },
    { iconElement: <SettingsIcon />, text: 'Settings' },
]

function NavbarItem({ iconElement, text }: NavbarItem) {
    return <div aria-describedby="button" className='flex gap-[5px] items-center justify-start w-[100%] h-[45px]'
        style={{ background: text === 'Workspaces' ? 'rgba(27, 89, 248, 0.1)' : 'white', borderRadius: text === 'Workspaces' ? '10px' : '0px' }}
    >
        <div className='ml-[15px] mr-[10px]'>
            {iconElement}
        </div>
        <div className={`text-[14px] font-main font-medium ${text === 'Settings' && 'text-[#4d4d4d]'} ${text==='Workspaces' && 'text-[#1B59F8]'}`}

        >
            {text}
        </div>
    </div>
}

function NavbarItems({ items }: NavbarItemProps) {
    return <div className='flex flex-col gap-[20px]'>
        {items.map((item) => {
            const { iconElement, text } = item;
            return <NavbarItem key={text}
                iconElement={iconElement}
                text={text}
            />
        })}
    </div>
}

function DashboardNavbar() {
    return (
        <div className='w-[12.5vw] h-[100vh] bg-[#fff] relative flex flex-col items-center rounded-tr-[20px] rounded-br-[20px]'
            style={{ border: '1px solid #EFF0F6' }}
        >
            <div className='mt-[20px] mb-[20px]' >
                <Logo />
            </div>
            <div className='w-[95%] flex items-center justify-center'>
                <div className='mt-[30px] w-[100%]'>
                    <NavbarItems items={mockItems} />
                </div>
            </div>
        </div>
    )
}

export default DashboardNavbar