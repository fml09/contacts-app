import { Star } from "@tamagui/lucide-icons";
import { useRef, useState } from "react";
import { Linking } from "react-native";
import { ListItem, Separator } from "tamagui";
import { useFavoriteSetStore } from "../../stores";

type ContactItemProps = {
  id: string;
  name: string;
  phoneNumber: string;
  digits: string;
  showFavorite?: boolean;
};

export function ContactItem({
  id,
  name,
  phoneNumber,
  digits,
  showFavorite,
}: ContactItemProps) {
  const lastId = useRef(id);

  const [favorites, addFavorite, deleteFavorite] = useFavoriteSetStore(
    (state) => [state.favorite, state.addFavorite, state.deleteFavorite]
  );
  const [isFavorite, setIsFavorite] = useState(() => favorites.has(id));
  if (id !== lastId.current) {
    lastId.current = id;
    setIsFavorite(favorites.has(id));
  }
  return (
    <>
      <ListItem
        pressTheme
        size="$3"
        title={name}
        subTitle={phoneNumber}
        marginVertical="$2"
        onPress={() => Linking.openURL(`tel:${digits}`)}
        iconAfter={
          showFavorite ? (
            <Star
              size="$1.5"
              fill={isFavorite ? "#ffd27d" : "none"}
              onPress={() => {
                isFavorite ? deleteFavorite(id) : addFavorite(id);
                setIsFavorite(!isFavorite);
              }}
            />
          ) : undefined
        }
      />
      <Separator borderColor="$borderColor" marginHorizontal="$2" />
    </>
  );
}
