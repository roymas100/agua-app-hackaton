import SeedCard from '@/components/SeedCard';
import { Seed, SeedStatus } from '../types';
import React, { useCallback, useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Menu from '@/components/Menu';
import { theme } from '@/styles/theme';

const seedsMockup: Seed[] = [
    {
        name: 'Seed C1',
        pressure: 1,
        status: SeedStatus.WORKING,
        airPerArea: 10,
        noise: 12,
        waterFlow: 32,
    },
    {
        name: 'Seed C2',
        pressure: 1,
        status: SeedStatus.ALERT,
        airPerArea: 10,
        noise: 12,
        waterFlow: 32,
    }
    , {
        name: 'Seed C3',
        pressure: 1,
        status: SeedStatus.DANGER,
        airPerArea: 10,
        noise: 12,
        waterFlow: 32,
    }
    , {
        name: 'Seed C4',
        pressure: 1,
        status: SeedStatus.WORKING,
        airPerArea: 10,
        noise: 12,
        waterFlow: 32,
    }
]

const Dashboard: React.FC = () => {
    const [seeds, setSeeds] = useState<Seed[]>(seedsMockup)

    useEffect(() => {
        const eventSource = new EventSource("/api/seeds");
        eventSource.onopen = () => {
            console.log('Abriu conexao')
        }

        eventSource.onmessage = (event) => {
            console.log('event', event)
            const data = JSON.parse(event.data) as {
                seeds: Seed[]
            }

            setSeeds(data.seeds)
        };


        eventSource.onerror = (error) => {
            console.error('Erro na conexão SSE:', error);

            eventSource.close()
        };

        return () => {
            eventSource.close()
        }
    }, [])

    const SeedList = useCallback(() => {
        return (
            <Flex flexDir="column" gap="8px">
                {seeds.map(({ airPerArea, name, noise, pressure, status, waterFlow }, index) => (
                    <SeedCard key={name + index} name={name} airPerArea={airPerArea} noise={noise} pressure={pressure} status={status} waterFlow={waterFlow} />
                ))}
            </Flex>
        )
    }, [seeds])

    return (
        <Flex>
            <Menu />
            <Flex w="100%" bg={theme.background} flexDir="column" minH="100vh" gap="16px" p="24px" pl="309px">
                <Text fontSize="24px" fontWeight={700}>
                    Seeds
                </Text>

                <SeedList />
            </Flex>
        </Flex>

    );
}

export default Dashboard;