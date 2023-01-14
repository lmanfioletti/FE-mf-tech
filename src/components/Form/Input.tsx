import { FormLabel, FormControl, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'

interface InputProps extends ChakraInputProps{
    name: string;
    label?: string;
}

const Input = ({ name, label, ...rest }: InputProps) => {
    return (
        <FormControl>
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraInput
          name={name}
          id={name}
          focusBorderColor='purple.500'
          bgColor='gray.900'
          variant="filled"
          _hover={{
            bgColor: 'gray.900'
          }}
          size="lg"
          {...rest}
        />
      </FormControl> 
    )
};

export default Input;