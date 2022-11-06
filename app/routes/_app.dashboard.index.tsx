import {
    BeakerIcon,
    BellIcon,
    CalendarIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    HomeIcon,
    MapIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline'
import { Form, Link } from '@remix-run/react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const navigation = [
    { name: 'Features', href: '#', icon: HomeIcon },
    { name: 'Analysis', href: '#', icon: CalendarIcon },
    { name: 'Management', href: '#', icon: UserGroupIcon },
    { name: 'Settings', href: '#', icon: MapIcon },
]

const workspaces = [
    { name: 'workspace1', href: '#', icon: HomeIcon },
    { name: 'workspace2', href: '#', icon: CalendarIcon },
    { name: 'workspace3', href: '#', icon: UserGroupIcon },
    { name: 'workspace4', href: '#', icon: MapIcon },
    { name: 'workspace5', href: '#', icon: HomeIcon },
    { name: 'workspace6', href: '#', icon: CalendarIcon },
    { name: 'workspace7', href: '#', icon: UserGroupIcon },
    { name: 'workspace8', href: '#', icon: MapIcon },
    { name: 'workspace9', href: '#', icon: HomeIcon },
    { name: 'workspace10', href: '#', icon: CalendarIcon },
    { name: 'workspace11', href: '#', icon: UserGroupIcon },
    { name: 'workspace12', href: '#', icon: MapIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function DashboardPage() {
    return (
        <div className="flex h-screen">
            <SideBar />
            <MainContent />
        </div>
    )
}

export function MainContent() {
    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <HeaderBar />
            <main className="flex-1 bg-gray-200 relative z-0 overflow-y-auto focus:outline-none">
                <div className="py-6">
                    hello
                </div>
            </main>
        </div>
    )
}

export function HeaderBar() {
    return (
        <div className="flex flex-row-reverse mx-2">
            <div className="absolute inset-y-0 right-0 flex items-center p-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* Profile dropdown */}
                <ProfileDropdownMenu />
            </div>
        </div>
    )
}

function ProfileDropdownMenu() {
    return <Menu as="div" className="relative ml-3">
        <div>
            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="" />
            </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                    {({ active }) => (
                        <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                            Your Profile
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                            Settings
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                            Sign out
                        </a>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Transition>
    </Menu>
}

export function SideBar() {
    return (
        <div className="flex h-screen bg-indigo-800 flex-col w-60 overflow-y-auto">
            <div className="divide-y divide-orange-600 mx-4">
                <div className="space-x-10 flex p-2 bg-indigo-800">
                    <Link to="/">
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                            alt="Workflow"
                        />
                    </Link>
                    <span className="text-white text-lg font-medium">Vutalyze</span>
                </div>
                <div className="flex flex-col justify-between">
                    <div className="h-4" />
                    <SideBarItemGroup
                        overideClassNames='max-w-sm bg-orange-700'
                        header={true}
                        key={"workspaces"}
                        item={workspaces[0]}
                        subItems={workspaces}
                    />
                    <div className="h-4" />
                    <div className="flex flex-col mt-1">
                        {navigation.map((item) => (
                            <SideBarItemGroup
                                header={true}
                                key={item.name}
                                item={item}
                                subItems={navigation}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

type SidebarItem = {
    name: string
    href: string
    icon: any
}

export function SideBarItemGroup({ overideClassNames, header, item, subItems }: { overideClassNames?: string, header: boolean, item: SidebarItem, subItems: SidebarItem[] }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Link
                key={item.name}
                to={item.href}
                className={classNames(
                    open ? 'hover:bg-indigo-800' : 'hover:bg-purple-600',
                    'bg-indigo-800 rounded-lg',
                    'p-2 text-center text-white items-center',
                    overideClassNames
                )}
                onClick={() => setOpen(!open)}
            >
                <div className="px-2 flex items-center justify-between">
                    <item.icon className="w-6 h-6" aria-hidden="true" />
                    <span className="">{item.name}</span>
                    {header ?
                        <div className={classNames(header ? "" : "hidden")}>
                            {open ?
                                <ChevronDownIcon className="w-6 h-6" aria-hidden="true" />
                                : <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />
                            }
                        </div>
                        : null}
                </div>
                <div className={classNames(
                    open ? "block" : "hidden",
                    "flex flex-col mt-2",
                    'overflow-y-auto max-h-48'
                )}>
                    {subItems.map((item) => (
                        <SideBarItem key={item.name} item={item} />
                    ))}
                </div>
            </Link>

        </>
    )
}

export function SideBarItem({ item }: { item: SidebarItem }) {
    return (
        <Link
            key={item.name}
            to={item.href}
            className={classNames(
                'bg-indigo-700 hover:bg-purple-600',
                'p-2 text-center text-white items-center'
            )}
        >
            <div className="px-2 flex items-center justify-between">
                <item.icon className="w-6 h-6" aria-hidden="true" />
                <span className="">{item.name}</span>
            </div>
        </Link>
    )
}
