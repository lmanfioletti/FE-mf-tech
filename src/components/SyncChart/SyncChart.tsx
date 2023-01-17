import { VStack, Box, Text } from "@chakra-ui/react"
import ReactApexChart from 'react-apexcharts'


const SyncChart = () => {



    const chart1series: any = [
        {
            data: [12, 14,15, 15,16, 12, 14,15, 15,16,12, 14,15, 15,16,12, 14,15, 15,16,12, 14,15, 15,16,12, 14,15, 15,16,12, 14,15, 15,16,12, 14,15, 15,16],
        }
    ];

    const chart1options: any = {
        chart: {
            id: 'fb',
            group: 'social',
            type: 'line',
            height: 200
        },
        colors: ['#008FFB']
    };

    const chart2series: any = [
        {
            data: [10, 30,1,1,4,6,10, 30,1,1,4,6,10, 30,1,1,4,6,10, 30,1,1,4,6,10, 30,1,1,4,6,10, 30,1,1,4,6,10, 30,1,1,4,6,10, 30,1,1,4,6,10, 30,1,1,4,6],
        }
    ];

    const chart2options: any = {
        chart: {
            id: 'tb',
            group: 'social',
            type: 'line',
            height: 200
        },
        colors: ['#008FFB']
    };


    return (
        <VStack display="block">
            <Box
                p="6"
                bg="gray.800"
                borderRadius={8}
            >
                <Text fontSize="lg" mb="4">
                    Temperatura
                </Text>
                <ReactApexChart options={chart1options} series={chart1series} type="line" height={160} />
            </Box>
            <Box
                p="6"
                bg="gray.800"
                borderRadius={8}
            >
                <Text fontSize="lg" mb="4">
                    Umidade
                </Text>
                <ReactApexChart options={chart2options} series={chart2series} type="line" height={160} />
            </Box>
        </VStack>
    );

}


export default SyncChart;