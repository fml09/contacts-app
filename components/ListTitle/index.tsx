import { Heading, Separator, Spacer, XStack } from "tamagui";

type ListTitleProps = {
  title: string;
};

export function ListTitle({ title }: ListTitleProps) {
  return (
    <XStack marginVertical="$4">
      <Heading fontFamily="$heading" color="$color" jc="center" fontSize="$2">
        {title}
      </Heading>
      <Spacer size="$3" />
      <Separator alignSelf="center" borderColor="$gray10" />
    </XStack>
  );
}
