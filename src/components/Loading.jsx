import { Box, Skeleton, Stack } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box mt={10}>
      <Stack gap={5}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </Box>
  );
};
export default Loading;
