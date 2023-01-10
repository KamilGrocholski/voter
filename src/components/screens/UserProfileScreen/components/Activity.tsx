import React from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    Point,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CountUserVotesPublic } from '../../../../types/trpcOutputTypes';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);


export const Activity: React.FC<{
    counts: CountUserVotesPublic
}> = ({
    counts
}) => {
        const labels = counts.map(d => d.createdAt)
        const data: ChartData<"line", (number | Point | null)[], unknown> = {
            labels,
            datasets: [
                {
                    label: 'Votes',
                    data: counts.map(d => d._count.createdAt),
                    backgroundColor: 'purple'
                }
            ]
        }

        return (
            <div className='h-[500px]'>
                <Line
                    data={data}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top' as const,
                            },
                            title: {
                                display: true,
                                text: 'Chart.js Line Chart',
                            },
                        },
                        scales: {
                            y: {
                                ticks: {
                                    stepSize: 2,
                                },
                            },
                        },
                    }}
                />
            </div>
        )
    }