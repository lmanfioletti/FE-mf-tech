import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    fonts: {
        heading: 'Inter',
        body: 'Inter',
    },
    styles: {
        global: {
            body: {
                bg: 'purple.50',
                color: 'purple.800'
            }
        }
    }
})