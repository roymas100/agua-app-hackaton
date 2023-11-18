// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Seed, SeedStatus } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    seeds: Seed[]
}

const seeds: Seed[] = [
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

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Content-Encoding', 'none')

    const data = {
        seeds
    }

    res.write(`data: ${JSON.stringify(data)}\n\n`)

    const intervalId = setInterval(() => {
        const newSeeds = seeds.map(seed => {
            let newStatus = SeedStatus.WORKING
            const random = getRandomInt(3)

            if (random === 2) {
                newStatus = SeedStatus.DANGER
            } else if (random === 1) {
                newStatus = SeedStatus.ALERT
            }


            return {
                ...seed,
                status: newStatus
            }
        })

        const data = {
            seeds: newSeeds
        }

        res.write(`data: ${JSON.stringify(data)}\n\n`)
    }, 2000)


    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
}
