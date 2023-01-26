import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import {
  Button,
  Flex,
  Text,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { fireErrorToast } from "../common/utils";

interface Props {
  error?: string | string[];
}

const SignIn: NextPage<Props> = ({ error }) => {
  const toast = useToast();

  useEffect(() => {
    if (error) {
      const toastOptions: UseToastOptions = {};

      if (error === "AccessDenied") {
        toastOptions.description = (
          <Text>
            O email não é do domínio da
            <Text as="strong"> CT Junior</Text>
          </Text>
        );
      } else {
        toastOptions.title = error;
        toastOptions.description =
          "Um erro inesperado ocorreu. Tente novamente.";
      }

      fireErrorToast(toast, toastOptions);
    }
  }, [error, toast]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          pr={8}
          pl={8}
          h="60px"
          leftIcon={<FcGoogle size={24} />}
          bg="white"
          color="blackAlpha.700"
          shadow="md"
          _hover={{
            bgColor: "gray.50",
          }}
        >
          Continuar com o google
        </Button>
      </Flex>
    </>
  );
};

SignIn.getInitialProps = async ({ query }) => {
  const { error } = query;

  return { error };
};

export default SignIn;
