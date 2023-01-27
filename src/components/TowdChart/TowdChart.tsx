import React from "react";
import { Box, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import('react-plotly.js'), {
    ssr: false,
});

interface TowdChartProps {
    xAxis: number[],
    yAxis: number[],
};


const TwodChart = ({ xAxis, yAxis }: TowdChartProps) => {
    function normal() {
        var x = 0,
            y = 0,
            rds, c;
        do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            rds = x * x + y * y;
        } while (rds == 0 || rds > 1);
        c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
        return x * c; // throw away extra sample y * c
    }

    var N = 2000,
        a = -1,
        b = 1.2;

    var step = (b - a) / (N - 1);
    var t = new Array(N), x = new Array(N), y = new Array(N);

    for (var i = 0; i < N; i++) {
        t[i] = a + step * i;
        x[i] = (Math.pow(t[i], 3)) + (0.3 * normal());
        y[i] = (Math.pow(t[i], 6)) + (0.3 * normal());
    }
    const trace1 = {
        x: xAxis,
        y: yAxis,
        mode: 'markers',
        name: 'points',
        bgcolor: '#181823',
        marker: {
            color: 'rgba(0,143,251,0.7)',
            size: 2,
            opacity: 0.10
        },
        type: 'scatter',
    };
    const trace2 = {
        x: xAxis,
        y: yAxis,
        name: 'density',
        ncontours: 20,
        colorscale: 'Greys',
        reversescale: true,
        showscale: false,
        bgcolor: '#181823',
        type: 'histogram2dcontour'
    };
    const trace3 = {
        x: xAxis,
        name: 'x density',
        marker: { color: 'rgba(0,143,251,0.9)' },
        yaxis: 'y2',
        hoverlabel: {
            bgcolor: '#181823',
        },
        type: 'histogram'
    };
    const trace4 = {
        y: yAxis,
        name: 'y density',
        marker: { color: 'rgba(0,143,251,0.9)' },
        xaxis: 'x2',
        hoverlabel: {
            bgcolor: '#181823',
        },
        type: 'histogram'
    };
    var data: any = [trace1, trace2, trace3, trace4];

    var layout: any = {
        showlegend: false,
        autosize: false,
        width: '100%',
        height: '100%',
        margin: { t: 50 },
        hovermode: 'closest',
        bargap: 0,
        images: [{
            x: -1,
            y: -2,
            sizex: 1,
            sizey: 1,
            source: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Circle_%28transparent%29.png/800px-Circle_%28transparent%29.png",
            xanchor: "middle",
            xref: "x",
            yanchor: "middle",
            yref: "y",
        }],
        xaxis: {
            domain: [0, 0.85],
            showgrid: false,
            zeroline: false,
            range: [-1, 1],
        },
        yaxis: {
            domain: [0, 0.85],
            showgrid: false,
            zeroline: false,
            range: [-1, 1],
        },
        xaxis2: {
            domain: [0.85, 1],
            showgrid: false,
            zeroline: false,
        },
        yaxis2: {
            domain: [0.85, 1],
            showgrid: false,
            zeroline: false,
        }
    };

    return (
        <Box
            p="6"
            bg="gray.800"
            borderRadius={8}
            justifyContent="center"
            display="flex"
            flexDir="column"
        >
            <Text fontSize="lg" mb="4">
                Valencia x Exitação
            </Text>

            <Plot
                data={data}
                layout={layout}
            />
        </Box>
    );
};

export default TwodChart;