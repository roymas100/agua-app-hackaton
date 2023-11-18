import { Avatar, Flex, Text, Switch } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { ReactSVG } from 'react-svg'
// import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { theme } from '@/styles/theme';

interface MenuItemProps {
    text: string,
    svg: string,
    path: string,
    active?: boolean,
    enabled?: boolean
}

const menuItems: MenuItemProps[] = [{
    text: 'Dashboard',
    path: '/',
    svg: '/Category.svg'
},
{
    text: 'Análise de Dados',
    path: '/graficos',
    svg: '/Chart.svg',
    enabled: false
},
{
    text: 'Notificações',
    path: '/notificacoes',
    svg: '/Bell.svg',
    enabled: false

},
{
    text: 'Preferências',
    path: '/preferencias',
    svg: '/Gear.svg',
    enabled: false

}]

const Menu: React.FC = () => {
    const { pathname } = useRouter()

    return (
        <Flex w="285px" alignSelf="stretch" bgColor={theme.menu.background} flexDir='column' pt='42px' pb='42px' position="fixed" left="0" top="0" bottom="0">
            <Flex gap="14px" alignItems='center' pl='32px'>
                <Avatar src='/avatar.svg' height="60px" w="60px" borderWidth="2px" borderStyle="solid" borderColor={theme.menu.select} />

                <Flex flexDir='column'>
                    <Text fontWeight={500} fontSize={18} lineHeight="27px" color={theme.text.primary}>Michael</Text>
                    <Text fontWeight={400} fontSize={14} lineHeight="21px" color={theme.text.primary} opacity={0.5}>Fazenda 1</Text>
                </Flex>
            </Flex>

            <Flex flexDir='column' w="100%" pt="32px" pb="16px" gap="16px">
                {menuItems.map(item => <MenuItem key={item.text} svg={item.svg} text={item.text} active={item.path === pathname} path={item.path} enabled={item.enabled} />)}
            </Flex>

            {/* <Switch mt="24px" onChange={() => setColorMode(state => state === 'DARK' ? 'LIGHT' : 'DARK')} paddingLeft="32px" alignItems="center" display="flex" color={theme.filter.text} >{isDarkMode ?  (
        <Flex  alignItems="center" gap="8px">
            <MoonIcon />
            <Text>Modo escuro</Text>
        </Flex>
    )  : ( <Flex alignItems="center" gap="8px">
        <SunIcon />
        <Text>Modo claro</Text>
    </Flex>)  }</Switch> */}
        </Flex>)
}

const MenuItem: React.FC<MenuItemProps> = ({ svg, text, active, path, enabled = true }) => {
    const { push } = useRouter()
    return (
        <Flex position="relative" gap="8px" w="100%" height="36px" pl="32px" alignItems="center" display="flex" justifyContent="flex-start"
            __css={{
                "svg>*": {
                    stroke: theme.text.primary
                }
            }}
            opacity={active ? 1 : 0.5} _hover={{
                opacity: 1,
            }} cursor={enabled ? "pointer" : "not-allowed"} transition='0.2s backgroundColor, 0.2s opacity' onClick={() => enabled && push(path)}>
            <ReactSVG src={svg} />
            <Text color={theme.text.primary} fontWeight={500} fontSize={14} lineHeight="21px" >{text}</Text>
            {active && <Flex position="absolute" left="-10px" height="36px" width="19px" borderRadius="16px" background={theme.menu.select}></Flex>}
        </Flex>)
}

export default Menu;