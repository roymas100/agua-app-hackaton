import { theme } from '@/styles/theme';
import { Seed, SeedStatus } from '@/types';
import { Flex } from '@chakra-ui/react';
import React, { useMemo } from 'react';

const SeedCard: React.FC<Seed> = ({ name, status }) => {
    const statusColor = useMemo(() => {
        switch (status) {
            case SeedStatus.ALERT:
                return 'orange'
            case SeedStatus.DANGER:
                return 'red'
            default:
                return 'green'
        }
    }, [])


    return <Flex borderRadius="16px" w="100%" bg="white" p="16px" alignItems="center" justifyContent="space-between">
        <Flex fontWeight={500} fontSize="18px">
            {name}
        </Flex>
        <Flex gap="16px" alignItems="center" >
            <Flex gap="8px">
                <span>A</span>
                <span>33%</span>
            </Flex>

            <Flex gap="8px">
                <span>A</span>
                <span>33%</span>
            </Flex>

            <Flex bg={theme.background} borderRadius="24px" p="8px 24px">
                <Flex borderRadius="50%" w="20px" h="20px" bg={statusColor} />
            </Flex>
        </Flex>
    </Flex>;
}

export default SeedCard;

// const Wrapper = styled.div`

//     .title {

//     }

//     .content {

//     }

//     .status-index {
//         border-radius: 9999px;
//     }

// `