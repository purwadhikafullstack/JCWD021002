import { useRouteError } from 'react-router-dom';
import { Flex, Link, Text } from '@chakra-ui/react';

export default function ErrorPage() {
  const error = useRouteError();

  console.log(error);

  return (
    <Flex h={'100vh'} justify={'center'} align={'center'} direction={'column'}>
      <Text fontSize={"52px"} fontWeight={600}>Oops!</Text>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text fontSize={"20px"}>
        <Link>{error.statusText || error.message}</Link>
      </Text>
    </Flex>
  );
}
