import { VStack, Box, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const SyncChart = () => {
    const chart1series = [
        {
            name: 'C',
            data: [12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16],
        }
    ];

    const chart1options = {
        chart: {
            id: 'fb',
            group: 'social',
        },
        colors: ['#008F0B']
    };

    const chart2series = [
        {
            name: 'U',
            data: [12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16, 12, 14, 15, 15, 16],
        }
    ];

    const chart2options = {
        chart: {
            id: 'fb2',
            group: 'social',
        },
        colors: ['#008FFB']
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
                <Chart options={chart1options} series={chart1series} width="100%" type="area" height="160" />
            </Box>
            <Box
                p="6"
                bg="gray.800"
                borderRadius={8}
            >
                <Text fontSize="lg" mb="4">
                    Umidade
                </Text>
                <Chart options={chart2options} series={chart2series} width="100%" type="line" height={160} />
            </Box>
        </>
    );

}


export default SyncChart;