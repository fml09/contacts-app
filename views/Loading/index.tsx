import { Spinner, YStack } from "tamagui";

export function LoadingView() {
  return (
    <YStack f={1} jc="center" ai="center">
      <Spinner size="large" />
    </YStack>
  );
}
