import { VStack, Box, Text, theme } from "@chakra-ui/react"
import dynamic from "next/dynamic";
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

interface SyncChartProps {
    xAxis?: string[],
    yAxis1: number[],
    yAxis2: number[],
}

const SyncChart = ({ xAxis, yAxis1, yAxis2 }: SyncChartProps) => {
    const chart1series = [
        {
            name: 'C',
            data: yAxis1,
        }
    ];

    const chart2series = [
        {
            name: 'U',
            data: yAxis2,
        }
    ];

    const chart1options: ApexOptions = {
        chart: {
            id: 'fb',
            group: 'social',
            toolbar: {
                show: true
            },
            foreColor: theme.colors.gray[500]
        },
        grid: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            enabled: true
        },
        xaxis: {
            type: 'datetime' as const,
            axisBorder: {
                color: theme.colors.gray[600]
            },
            axisTicks: {
                color: theme.colors.gray[600]
            },
            categories: xAxis,
        },
        fill: {
            opacity: 0.3,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                opacityFrom: 0.7,
                opacityTo: 0.3
            }
        }
    };

    const chart2options: ApexOptions = {
        chart: {
            id: 'ib',
            group: 'social',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            foreColor: theme.colors.gray[500]
        },
        grid: {
            show: false
        },
        dataLabels: {
            enabled: true
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            type: 'datetime' as const,
            axisBorder: {
                color: theme.colors.gray[600]
            },
            axisTicks: {
                color: theme.colors.gray[600]
            },
            categories: xAxis,
        },
        fill: {
            opacity: 0.3,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                opacityFrom: 0.7,
                opacityTo: 0.3
            }
        }
    };

    return (
        <>
            <Box
                p="6"
                bg="gray.800"
                borderRadius={8}
            >
                <Text fontSize="lg" mb="4">
                    Temperatura
                </Text>
                <Chart options={chart1options} series={chart1series} width="100%" type="area" height="240" />
            </Box>
            <Box
                p="6"
                bg="gray.800"
                borderRadius={8}
            >
                <Text fontSize="lg" mb="4">
                    Umidade
                </Text>
                <Chart options={chart2options} series={chart2series} width="100%" type="area" height={240} />
            </Box>
        </>
    );

}


export default SyncChart;